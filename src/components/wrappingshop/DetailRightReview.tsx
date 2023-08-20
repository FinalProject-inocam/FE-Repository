import React from "react";
import * as Type from "../../types";
import * as SC from "../../components/css";
import * as CP from "../../components";
import * as Hooks from "../../hooks";

export const DetailRightReview: React.FC<Type.WrappingDetailProps> = ({ data }) => {
	const { onDeleteShopComment } = Hooks.useWrappingDetail();
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");

		return `${year}-${month}-${day}`;
	};
	return (
		<div>
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
							<div key={reviewId}>
								<SC.ReviewBox>
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
										<SC.ReviewMenuWrapper>
											<p>신고</p>
											<CP.EditWrappingReview reviewId={reviewId} shopId={data.shopId} />
											<p onClick={onDeleteShopComment(data.shopId, reviewId)}>삭제하기</p>
											<p>{formatDate(createAt)}</p>
										</SC.ReviewMenuWrapper>
									</SC.ReviewUpperContainer>
									<div>{review}</div>
									<SC.ReviewSImageContainer>
										{imageUrls &&
											imageUrls.map((url, index) => (
												<SC.ReviewImageWrapper key={index}>
													<SC.ReviewCommentImg src={url} alt={`이미지-${index}`} />
												</SC.ReviewImageWrapper>
											))}
									</SC.ReviewSImageContainer>
								</SC.ReviewBox>
								<hr />
							</div>
						);
					}
				)}
		</div>
	);
};
