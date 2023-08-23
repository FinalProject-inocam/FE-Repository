import React from "react";
import * as Type from "../../types";
import * as SC from "../css";
import * as CP from "..";
import * as Hooks from "../../hooks";
import * as RTK from "../../redux";
import { ReviewStarFull, ReviewStarEmpty, ReviewLike, ReviewComment } from "../../assets/wrappingshop";

export const DetailReviewList: React.FC<Type.WrappingDetailProps> = () => {
	// get review api
	const { shopReviewIsLoading, shopReviewData, shopReviewIsError, shopReviewError, shopId } =
		Hooks.useWrappingDetailReviews();

	// delete review api
	const { onDeleteShopComment } = Hooks.useWrappingDetailInput();

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");

		return `${year}-${month}-${day}`;
	};

	const { nickname: currentUser } = RTK.useAppSelector(RTK.selectDecode);
	const [patchWSReviewLikeRTK] = RTK.usePatchWrappingShopDetailLikeMutation();
	const onReviewLikeHandler = (reviewId: number) => () => {
		patchWSReviewLikeRTK({ shopId, reviewId });
	};

	if (shopReviewIsLoading) return <div>... 로딩중</div>;
	else if (shopReviewIsError) return <div>에러발생... {JSON.stringify(shopReviewError)}</div>;
	else {
		return (
			<SC.ReviewsOutline>
				{shopReviewData.content &&
					shopReviewData.content.map(
						(
							{
								reviewId,
								nickname,
								review,
								imageUrls,
								star,
								revisit,
								createAt,
							}: Type.TotalWrappingShopReview,
							index: number
						) => {
							return (
								<div key={reviewId} style={{ paddingTop: index > 0 ? "28px" : "0" }}>
									<SC.ReviewLayout $fd='column' $jc='space-between' $ai='normal' $gap={20}>
										<SC.FlexBox $jc='space-between'>
											<SC.ReviewUserInner $jc='flex-start' $gap={20}>
												<SC.ReviewUserName $jc='flex-start'>{nickname}</SC.ReviewUserName>
												<SC.ReviewStar>
													{Array.from({ length: 5 }).map((_, index) => (
														<img
															key={index}
															style={{ width: "15px", height: "15px" }}
															src={index < star ? ReviewStarFull : ReviewStarEmpty}
															alt={`별-${index}`}
														/>
													))}
													<SC.ReviewScore>({star})</SC.ReviewScore>
												</SC.ReviewStar>
												<SC.ReviewRevisit>
													{revisit && revisit ? "재방문의사" : ""}
												</SC.ReviewRevisit>
											</SC.ReviewUserInner>
											<SC.ReviewMenuInner $jc='flex-end' $gap={10}>
												{currentUser === nickname && (
													<CP.EditWrappingReview
														reviewId={reviewId}
														shopId={shopReviewData.shopId}
													/>
												)}
												<p style={{ color: "red" }}>신고</p>
												{currentUser === nickname && (
													<p onClick={onDeleteShopComment(shopReviewData.shopId, reviewId)}>
														삭제
													</p>
												)}
												<p>{formatDate(createAt)}</p>
											</SC.ReviewMenuInner>
										</SC.FlexBox>
										<SC.ReviewText>{review}</SC.ReviewText>
										<SC.FlexBox $jc='space-between'>
											<SC.ReviewImageInner $fd='row' $gap={10}>
												{imageUrls ? (
													imageUrls.map((url, index) => (
														<SC.ReviewImage key={index}>
															<img
																style={{ width: "100%", height: "100%" }}
																src={url}
																alt={`이미지-${index}`}
															/>
														</SC.ReviewImage>
													))
												) : (
													<div></div>
												)}
											</SC.ReviewImageInner>
											<SC.FlexBox $ai='flex-end' $gap={10}>
												<CP.DetailButton.LikeButton
													$buttonSize='like'
													onClick={onReviewLikeHandler(reviewId)}>
													<img src={ReviewLike} alt='reviewLike' />
												</CP.DetailButton.LikeButton>
												<CP.DetailButton.CommentButton $buttonSize='comment'>
													<img src={ReviewComment} alt='reviewLike' />
												</CP.DetailButton.CommentButton>
											</SC.FlexBox>
										</SC.FlexBox>
									</SC.ReviewLayout>
								</div>
							);
						}
					)}
			</SC.ReviewsOutline>
		);
	}
};
