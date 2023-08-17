import React from "react";
import * as Type from "../../types";
import { useWrappingDetail } from "../../hooks";
import * as SC from "../../components/css";
import * as CP from "../../components/wrappingshop";

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
		<SC.RightOnSide>
			<SC.BannerWrapper>
				<CP.WrappingShopBanner bannerNumber={1} $bannerSize='small' />
				<CP.WrappingShopBanner bannerNumber={2} $bannerSize='small' />
				<CP.WrappingShopBanner bannerNumber={3} $bannerSize='small' />
			</SC.BannerWrapper>
			<SC.RightContentWrapper>
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
								<SC.ReviewBox key={reviewId}>
									<SC.ReviewUpperContainer $jc='space-between'>
										<SC.ReviewUserWrapper>
											<SC.ReviewUserName>{nickname}</SC.ReviewUserName>
											{Array.from({ length: 5 }).map((_, index) => (
												<SC.ReviewStar key={index}>{index < star ? "★" : "☆"}</SC.ReviewStar>
											))}
											<SC.ReviewScore>({star})</SC.ReviewScore>
											<SC.ReviewRevisit>
												{revisit && revisit ? "재방문의사" : ""}
											</SC.ReviewRevisit>
										</SC.ReviewUserWrapper>
										<SC.ReviewMenueWrapper>
											<p>신고</p>
											<CP.EditWrappingReview reviewId={reviewId} shopId={data.shopId} />
											<p onClick={onDeleteShopComment(data.shopId, reviewId)}>삭제하기</p>
											<p>{formatDate(createAt)}</p>
										</SC.ReviewMenueWrapper>
									</SC.ReviewUpperContainer>

									<SC.ReviewContents>{review}</SC.ReviewContents>

									{imageUrls &&
										imageUrls.map((url, index) => (
											<SC.ReviewSimpleImage key={index}>
												<SC.ReviewCommentimg src={url} alt={`이미지-${index}`} />
											</SC.ReviewSimpleImage>
										))}
								</SC.ReviewBox>
							);
						}
					)}
			</SC.RightContentWrapper>
		</SC.RightOnSide>
	);
};
