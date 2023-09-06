import { ChangeEvent, DragEvent, useEffect, useState } from "react";
import imageCompression from "browser-image-compression";

export const useCommunityFormimgs = ({ imgs, setImgs, submited }: any) => {
	const [previewimg, setPreviewimg] = useState<any>([]);
	const [resizing, setResizing] = useState<boolean>(false);

	const onActionImgResize = async (files: File): Promise<File | undefined> => {
		const options = {
			maxSizeMB: 1, // 1000000b === 1000kb === 1mb //
			maxWidthOrHeight: 3000,
			useWebWorker: true,
		};
		try {
			const compressBlob = await imageCompression(files, options);
			const compressFile = new File([compressBlob], files.name, {
				type: files.type,
			});
			return compressFile;
		} catch (error) {
			console.log(error);
		}
	};

	const handleFileResize = async (files: FileList | null) => {
		if (files === null) return;
		const fiveMb = 3 * 1024 * 1024;
		// 화면 리사이징 // 파일크기제한(5MB) => 리사이징 => 화면 미리보여주기
		if (Array.from(files).reduce((pre: number, cur: File) => pre + cur.size, 0) > fiveMb)
			return alert("Exceeded 3MB.");
		setImgs([]);
		setPreviewimg([]);
		const resizePromises: Promise<File | undefined>[] = [];
		setResizing(true);

		for (let i = 0; i < files.length; i++) {
			const resizePromise = onActionImgResize(files[i]);
			resizePromises.push(resizePromise);
		}

		const resizedFiles = await Promise.all(resizePromises);
		resizedFiles && setImgs(resizedFiles);
	};

	const onDropFiles = async (e: DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		await handleFileResize(e.dataTransfer.files);
	};

	const onChangeFiles = async (e: ChangeEvent<HTMLInputElement>) => {
		await handleFileResize(e.target.files);
	};

	const onDragOver = (e: DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
	};

	const onDeleteImg = (idx: number) => () => {
		setPreviewimg([]);
		const deleteImg = [...imgs];
		deleteImg.splice(idx, 1);
		console.log("idx", idx, deleteImg);
		setImgs(deleteImg);
	};

	useEffect(() => {
		if (imgs.length > 0) {
			console.log("리사이징 완료", imgs);
			for (let i = 0; i < imgs.length; i++) {
				let file = imgs[i];
				let reader = new FileReader();
				reader.onload = () => {
					setPreviewimg((showImg: (string | ArrayBuffer | null)[]) =>
						showImg ? [...showImg, reader.result] : [reader.result]
					);
				};
				reader.readAsDataURL(file);
			}
			setResizing(false);
		}
	}, [imgs]);

	useEffect(() => {
		setPreviewimg([]);
	}, [submited]);

	return { onChangeFiles, onDropFiles, onDragOver, resizing, previewimg, onDeleteImg };
};
