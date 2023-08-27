import imageCompression from "browser-image-compression";
import { ChangeEvent } from "react";
import * as Type from "../../types";

export const usePrevImage = ({ setPreviewImg, setState, setCompressed }: Type.UsePrevImageProps) => {
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
	const onChangeFile = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
		if (e.target.files && e.target.files.length > 4) return alert("파일은 최대 4개까지 입니다.");
		setCompressed(false);
		setState([]);
		setPreviewImg([]);
		if (e.target.files) {
			// 화면 미리보기
			for (let i = 0; i < e.target.files.length; i++) {
				let file = e.target.files[i];
				let reader = new FileReader();
				reader.onload = () => {
					setPreviewImg((showImg: (string | ArrayBuffer | null)[]) =>
						showImg ? [...showImg, reader.result] : [reader.result]
					);
				};
				reader.readAsDataURL(file);
			}

			// 화면 리사이징
			const compressingImg: File[] = [];
			for (let i = 0; i < e.target.files.length; i++) {
				const compressed = await onActionImgResize(e.target.files[i]);
				if (compressed) {
					compressingImg.push(compressed);
				}
				e.target.files.length === i + 1 && setCompressed(true);
			}
			setState(compressingImg);
		}
	};

	return onChangeFile;
};
