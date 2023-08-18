import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import * as RTK from "../../redux";
import * as Type from "../../types";
import { useParams } from "react-router-dom";
import imageCompression from "browser-image-compression";

export const useWrappingDetail = (): Type.UseWrappingDetail => {
	const { id: shopId } = useParams<{ id: string }>();

	// RTK - 랩핑샵 GET
	const { isLoading, data, isError, error } = RTK.useGetWrappingShopDetailQuery(shopId);

	// RTK - 랩핑샵 댓글작성(POST)
	const [shopCommentInfo, setShopCommentInfo] = useState<Type.WrappingShopReview>({ review: "", star: 0 });
	const [revisit, setRevisit] = useState<boolean>(false);

	const [fileInfo, setFileInfo] = useState<File | null>(null);
	const [
		onShopCommentPostRTK,
		{ isSuccess: shopCommentSuccess, data: shopCommentData, isError: shopCommentIsError, error: shopCommentError },
	] = RTK.usePostWrappingCommentMutation();

	const handleRevisitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRevisit(e.target.checked);
	};

	const onChangeShopComment = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setShopCommentInfo({ ...shopCommentInfo, [name]: value });
	};

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

	const onChageShopFile = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
		if (e.target.files) {
			const file = e.target.files[0];
			const compressImg = await onActionImgResize(file);
			if (compressImg instanceof File) {
				setFileInfo(compressImg);
			}
		}
	};

	const onSubmitShopComment = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		console.log("서버로 보내기 전 revisit 상태:", revisit);
		const formData = new FormData();
		formData.append(
			"data",
			new Blob([JSON.stringify({ ...shopCommentInfo, revisit })], { type: "application/json" })
		);
		if (fileInfo) {
			formData.append("images", fileInfo);
		}
		onShopCommentPostRTK({ shopId, formData });
		setFileInfo(null);
		setShopCommentInfo({ review: "", star: 0 });
		setRevisit(false);
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
		isLoading,
		isError,
		error,
		data,
		onSubmitShopComment,
		shopCommentInfo,
		onChangeShopComment,
		onChageShopFile,
		onDeleteShopComment,
		handleRevisitChange,
	};
};
