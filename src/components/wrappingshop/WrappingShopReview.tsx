import React from "react";
import * as Type from "../../types";
import { styled } from "styled-components";
import { useWrappingDetail } from "../../hooks";
import { EditWrappingReview } from "./EditWrappingReview";
import * as WS from "../../components/css/wrappingshop/wrappingwhopStyled";

export const WrappingShopReview: React.FC = () => {
	const {
		data,
		onSubmitShopComment,
		shopCommentInfo,
		onChangeShopComment,
		onChageShopFile,
		onDeleteShopComment,
		handleRevisitChange,
	} = useWrappingDetail();
	return (
		<WS.RightOnSide>
			<WS.RightContentWrapper>
				<div>
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
						<input
							type='file'
							name='image'
							accept='.png, .jpg, .jpeg'
							onChange={onChageShopFile}
							multiple
						/>
						<input type='checkbox' value='재방문의사' onChange={handleRevisitChange} />
						<input type='submit' value='제출하기' />
					</form>
					<hr />
					{data.reviews &&
						data.reviews.map(
							({
								reviewId,
								nickname,
								review,
								imageUrls,
								star,
								revisit,
							}: Type.TotalWrappingShopReview) => {
								return (
									<div key={reviewId}>
										<div>{nickname}</div>
										<div>{review}</div>
										<div>{star}</div>
										<ReviewRevisit>{revisit && revisit ? "재방문의사" : ""}</ReviewRevisit>
										{imageUrls &&
											imageUrls.map((url, index) => (
												<ShopCommentImg key={index} src={url} alt={`이미지-${index}`} />
											))}
										<div onClick={onDeleteShopComment(data.shopId, reviewId)}>삭제하기</div>
										<EditWrappingReview reviewId={reviewId} shopId={data.shopId} />
									</div>
								);
							}
						)}
				</div>
			</WS.RightContentWrapper>
		</WS.RightOnSide>
	);
};

const ShopCommentImg = styled.img`
	max-width: 100px;
	max-height: 100px;
`;

const ReviewRevisit = styled.div`
	color: blue;
`;
