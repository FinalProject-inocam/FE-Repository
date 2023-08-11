import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import * as RTK from "../../redux";
// import { useRouter } from "../../hooks";
import { useParams } from "react-router-dom";
import * as Type from "../../types";
import { styled } from "styled-components";
import imageCompression from "browser-image-compression";
import { EditWrappingReview } from "../../components";

export const DecorationDetail: React.FC = () => {
	// const { getId } = useRouter();
	// console.log(getId);
	const { id: shopId } = useParams<{ id: string }>();

	// RTK - 랩핑샵 GET
	const { isLoading, data, isError, error } = RTK.useGetWrappingShopDetailQuery(shopId);

	// RTK - 랩핑샵 댓글작성(POST)
	const [shopCommentInfo, setShopCommentInfo] = useState<Type.WrappingShopReview>({ review: "", star: 0 });
	const [fileInfo, setFileInfo] = useState<File | null>(null);
	const [
		onShopCommentPostRTK,
		{ isSuccess: shopCommentSuccess, data: shopCommentData, isError: shopCommentIsError, error: shopCommentError },
	] = RTK.usePostDecoShopCommentMutation();

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
		const formData = new FormData();
		formData.append("data", new Blob([JSON.stringify(shopCommentInfo)], { type: "application/json" }));
		if (fileInfo) {
			formData.append("images", fileInfo);
		}
		onShopCommentPostRTK({ shopId, formData });
		setFileInfo(null);
		setShopCommentInfo({ review: "", star: 0 });
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
	] = RTK.useDeleteDecoShopCommentMutation();
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

	if (isLoading) {
		return <div>... 로딩중</div>;
	}
	if (isError) {
		return <div>에러발생... {JSON.stringify(error)}</div>;
	}

	return (
		<div>
			<div>
				<div>{data.shopName}</div>
				{Array.from({ length: 5 }).map((_, index) => (
					<span key={index}>{index < data.avgStar ? "★" : "☆"}</span>
				))}
				<div>{data.address}</div>
				<div>좋아요{data.likeCount}개</div>
			</div>
			<form onSubmit={onSubmitShopComment}>
				<input
					value={shopCommentInfo.review}
					name='review'
					onChange={onChangeShopComment}
					placeholder='댓글입력해주세요'
				/>
				<input
					value={shopCommentInfo.star}
					name='star'
					onChange={onChangeShopComment}
					placeholder='댓글입력해주세요'
				/>
				<input type='file' name='image' accept='.png, .jpg, .jpeg' onChange={onChageShopFile} multiple />
				<input type='submit' value='제출하기' />
			</form>
			<hr />
			{data.reviews &&
				data.reviews.map(({ reviewId, nickname, review, imageUrls, star }: Type.TotalWrappingShopReview) => {
					return (
						<div key={reviewId}>
							<div>{nickname}</div>
							<div>{review}</div>
							<div>{star}</div>
							{imageUrls &&
								imageUrls.map((url, index) => (
									<ShopCommentImg key={index} src={url} alt={`이미지-${index}`} />
								))}
							<div onClick={onDeleteShopComment(shopId, reviewId)}>삭제하기</div>
							<EditWrappingReview reviewId={reviewId} shopId={shopId} />
						</div>
					);
				})}
		</div>
	);
};

const ShopCommentImg = styled.img`
	max-width: 100px;
	max-height: 100px;
`;
