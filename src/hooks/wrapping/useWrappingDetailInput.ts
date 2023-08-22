import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import imageCompression from "browser-image-compression";
import * as RTK from "../../redux";

export const useWrappingDetailInput = (): any => {
	const { id: shopId } = useParams<{ id: string }>();
	// RTK - 랩핑샵 댓글작성(POST)
	const [
		onShopCommentPostRTK,
		{ isSuccess: shopCommentSuccess, data: shopCommentData, isError: shopCommentIsError, error: shopCommentError },
	] = RTK.usePostWrappingCommentMutation();

	const [review, setReview] = useState<string>("");
	const onChangeShopComment = (e: ChangeEvent<HTMLInputElement>): void => {
		setReview(e.target.value);
	};

	// 별을 클릭했을 때 별점을 업데이트하는 함수
	const [star, setStar] = useState<number>(0);
	const handleStarClick = (starNumber: number) => {
		setStar(starNumber);
	};

	// 재방문 의사 함수
	const [revisit, setRevisit] = useState<boolean>(false);
	const handleRevisitChange = (value: boolean) => {
		console.log(value);
		setRevisit(value);
	};
	const [fileInfo, setFileInfo] = useState<File[]>([]);
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
			console.log("리사이징 완료");
			return compressFile;
		} catch (error) {
			console.log(error);
		}
	};

	const [previewImages, setPreviewImages] = useState<string[]>([]);

	const onChangeShopFiles = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
		if (e.target.files) {
			const files = e.target.files;
			const totalImages = previewImages.length + files.length;

			if (totalImages > 4) {
				alert("최대 4장의 이미지만 업로드할 수 있습니다.");
				return;
			}

			const compressFiles: File[] = [...fileInfo];
			const previewFiles: string[] = [...previewImages];

			const readImageFile = (file: File): Promise<string> => {
				return new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.onloadend = () => {
						const src = reader.result as string;
						resolve(src);
					};
					reader.onerror = reject;
					reader.readAsDataURL(file);
				});
			};

			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				const compressImg = await onActionImgResize(file);
				if (compressImg instanceof File) {
					compressFiles.push(compressImg);
					const src = await readImageFile(compressImg);
					previewFiles.push(src);
				}
			}

			setPreviewImages(previewFiles);
			setFileInfo(compressFiles);
		}
	};

	const onSubmitShopComment = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("data", new Blob([JSON.stringify({ review, star, revisit })], { type: "application/json" }));
		fileInfo.forEach((file) => {
			formData.append("images", file);
		});
		console.log(formData);
		onShopCommentPostRTK({ shopId, formData });
		setFileInfo([]);
		setPreviewImages([]);
		setReview("");
		setRevisit(false);
		setStar(0);
	};

	// RTK - 랩핑샵 댓글삭제(DELETE)
	const [
		onDeleteShopCommentRTK,
		{
			isSuccess: shopCommentDeleteSuccess,
			data: shopCommentDeleteData,
			isError: shopCommentDeleteIsError,
			error: shopCommentDeleteError,
		},
	] = RTK.useDeleteWrappingCommentMutation();
	const onDeleteShopComment = (shopId: string | undefined, reviewId: number | undefined) => () => {
		onDeleteShopCommentRTK({ shopId, reviewId });
	};

	useEffect(() => {
		if (shopCommentSuccess) console.log("usePostDecoCommentMutation 댓글 작성 성공", shopCommentData);
		if (shopCommentIsError) console.log("usePostDecoCommentMutation 댓글 작성 실패", shopCommentError);
		if (shopCommentDeleteSuccess) console.log("usePostDecoCommentMutation 댓글 작성 성공", shopCommentDeleteData);
		if (shopCommentDeleteIsError) console.log("usePostDecoCommentMutation 댓글 작성 실패", shopCommentDeleteError);
	}, [
		shopCommentSuccess,
		shopCommentData,
		shopCommentIsError,
		shopCommentError,
		shopCommentDeleteSuccess,
		shopCommentDeleteData,
		shopCommentDeleteIsError,
		shopCommentDeleteError,
	]);

	return {
		onSubmitShopComment,
		review,
		onChangeShopComment,
		onChangeShopFiles,
		onDeleteShopComment,
		handleRevisitChange,
		star,
		handleStarClick,
		setRevisit,
		previewImages,
	};
};
