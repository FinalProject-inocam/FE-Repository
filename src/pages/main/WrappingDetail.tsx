import React from "react";
import * as Type from '../../types';
import { useWrappingDetail } from "../../hooks";
import { styled } from "styled-components";
import { EditWrappingReview } from "../../components";

export const WrappingDetail: React.FC = () => {
	const {isLoading, isError, error, data, onSubmitShopComment, shopCommentInfo, onChangeShopComment, onChageShopFile, onDeleteShopComment} = useWrappingDetail();

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
							<div onClick={onDeleteShopComment(data.shopId, reviewId)}>삭제하기</div>
							<EditWrappingReview reviewId={reviewId} shopId={data.shopId} />
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