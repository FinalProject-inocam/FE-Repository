import React from "react";
import * as Type from "../../types";
import * as SC from "../../components/css";
import * as CP from "../../components";
import * as Hooks from "../../hooks";
import * as RTK from "../../redux";
import { ReviewStarFull, ReviewStarEmpty, ReviewLike, ReviewComment } from "../../assets/wrappingshop";

export const DetailRightReview: React.FC<Type.WrappingDetailProps> = () => {
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
			<SC.DetailRightReviewsOutline>
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
									<SC.DetailRightReviewOutline>
										<SC.ReviewUpperLayout $jc='space-between'>
											<SC.ReviewUserInner>
												<SC.ReviewUserName>{nickname}</SC.ReviewUserName>
												<SC.ReviewStarContainer>
													{Array.from({ length: 5 }).map((_, index) => (
														<img
															key={index}
															style={{ width: "15px", height: "15px" }}
															src={index < star ? ReviewStarFull : ReviewStarEmpty}
															alt={`별-${index}`}
														/>
													))}
													<SC.ReviewScore>({star})</SC.ReviewScore>
												</SC.ReviewStarContainer>
												<SC.ReviewRevisit>
													{revisit && revisit ? "재방문의사" : ""}
												</SC.ReviewRevisit>
											</SC.ReviewUserInner>
											<SC.ReviewMenuInner>
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
										</SC.ReviewUpperLayout>
										<SC.ReviewContentsLayout>
											<SC.ReviewContentsTextItem>{review}</SC.ReviewContentsTextItem>
											<div style={{ display: "flex", justifyContent: "space-between" }}>
												<SC.ReviewImageInner>
													{imageUrls ? (
														imageUrls.map((url, index) => (
															<SC.ReviewImageWrapper key={index}>
																<SC.ReviewCommentImg
																	src={url}
																	alt={`이미지-${index}`}
																/>
															</SC.ReviewImageWrapper>
														))
													) : (
														<div></div>
													)}
												</SC.ReviewImageInner>
												<div
													style={{
														display: "flex",
														gap: "10px",
														alignItems: "flex-end",
													}}>
													<CP.DetailButton.LikeButton
														$buttonSize='like'
														onClick={onReviewLikeHandler(reviewId)}>
														<img src={ReviewLike} alt='reviewLike' />
													</CP.DetailButton.LikeButton>
													<CP.DetailButton.CommentButton $buttonSize='comment'>
														<img src={ReviewComment} alt='reviewLike' />
													</CP.DetailButton.CommentButton>
												</div>
											</div>
										</SC.ReviewContentsLayout>
									</SC.DetailRightReviewOutline>
								</div>
							);
						}
					)}
			</SC.DetailRightReviewsOutline>
		);
	}
};
