import React from "react";
import * as Type from "../../types";
import { styled } from "styled-components";
import { useWrappingDetail } from "../../hooks";
import { EditWrappingReview } from "./EditWrappingReview";
import * as WS from "../../components/css/wrappingshop/wrappingwhopStyled";
import { WrappingShopBanner } from "./WrappingShopBanner";

export const WrappingShopReview: React.FC = () => {
	const {
		data,
		// onSubmitShopComment,
		// shopCommentInfo,
		// onChangeShopComment,
		// onChageShopFile,
		// handleRevisitChange,
		onDeleteShopComment,
	} = useWrappingDetail();

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");

		return `${year}-${month}-${day}`;
	};

	return (
		<WS.RightOnSide>
			<WS.BannerWrapper>
				<WrappingShopBanner bannerNumber={1} $bannerSize='small' />
				<WrappingShopBanner bannerNumber={2} $bannerSize='small' />
				<WrappingShopBanner bannerNumber={3} $bannerSize='small' />
			</WS.BannerWrapper>
			<WS.RightContentWrapper>
				{/* <form onSubmit={onSubmitShopComment}>
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
					</form> */}
				{data.reviews &&
					data.reviews.map(
						({
							reviewId,
							nickname,
							review,
							imageUrls,
							star,
							revisit,
							createAt,
						}: Type.TotalWrappingShopReview) => {
							return (
								<WS.ReviewBox key={reviewId}>
									<WS.ReviewUpperContainer $jc='space-between'>
										<WS.ReviewUserWrapper>
											<WS.ReviewUserName>{nickname}</WS.ReviewUserName>
											{Array.from({ length: 5 }).map((_, index) => (
												<WS.ReviewStar key={index}>{index < star ? "★" : "☆"}</WS.ReviewStar>
											))}
											<WS.ReviewScore>({star})</WS.ReviewScore>
											<WS.ReviewRevisit>
												{revisit && revisit ? "재방문의사" : ""}
											</WS.ReviewRevisit>
										</WS.ReviewUserWrapper>
										<WS.ReviewMenueWrapper>
											<p>신고</p>
											<EditWrappingReview reviewId={reviewId} shopId={data.shopId} />
											<p onClick={onDeleteShopComment(data.shopId, reviewId)}>삭제하기</p>
											<p>{formatDate(createAt)}</p>
										</WS.ReviewMenueWrapper>
									</WS.ReviewUpperContainer>

									<WS.ReviewContents>{review}</WS.ReviewContents>

									{imageUrls &&
										imageUrls.map((url, index) => (
											<WS.ReviewSimpleImage key={index}>
												<ShopCommentImg src={url} alt={`이미지-${index}`} />
											</WS.ReviewSimpleImage>
										))}
								</WS.ReviewBox>
							);
						}
					)}
			</WS.RightContentWrapper>
		</WS.RightOnSide>
	);
};

const ShopCommentImg = styled.img`
	width: 100%;
	height: 100%;
`;
