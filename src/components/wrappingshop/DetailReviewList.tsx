import React, { useEffect, useRef, useState } from "react";

import * as Type from "../../types";
import * as SC from "../css";
import * as CP from "..";
import * as Hooks from "../../hooks";
import * as RTK from "../../redux";
import { ReviewStarFull, ReviewStarEmpty, ReviewLike, ReviewComment } from "../../assets/wrappingshop";
import { useParams } from "react-router-dom";

export const DetailReviewList: React.FC<Type.WrappingDetailProps> = () => {
	// delete review api
	const { onDeleteShopComment } = Hooks.useWrappingDetailInput();

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");

		return `${year}-${month}-${day}`;
	};

	// nickname decode
	const { nickname: currentUser } = RTK.useAppSelector(RTK.selectDecode);
	const [patchWSReviewLikeRTK] = RTK.usePatchWrappingShopDetailLikeMutation();
	const onReviewLikeHandler = (reviewId: number) => () => {
		patchWSReviewLikeRTK({ shopId, reviewId });
	};

	const { id: shopId } = useParams<{ id: string }>();
	const [page, setPage] = useState<number>(1);
	const { isLoading, data, isError, error, isFetching } = RTK.useGetWSDetailReviewsQuery({
		shopId,
		page,
	});
	// infinite scroll
	const fetchNextRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !isFetching && !data.last) {
					// 마지막 요소가 감지되었을 때, 추가요청을 보내면, 값이 오겠죠.
					console.log("Fetching more data...");
					setPage(page + 1);
				}
			},
			{ threshold: 0.1 } // 0~1, 0.1 뷰포트 요소(100px)의 10%(10px) 감지되었을 때, 동작한다.
		);

		if (fetchNextRef.current) {
			observer.observe(fetchNextRef.current); // 관찰대상 등록
		}
		console.log("useGetWSDetailReviewsQuery", data);
	}, [isFetching, page, data]);

	if (isLoading) return <div>... 로딩중</div>;
	else if (isError) return <div>에러발생... {JSON.stringify(error)}</div>;
	else {
		return (
			<SC.ReviewsOutline>
				{data.content.length === 0
					? null
					: data.content.map(
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
							) =>
								data.content.length === index + 1 ? (
									<div
										ref={fetchNextRef}
										key={reviewId + Math.random()}
										style={{ paddingTop: index > 0 ? "28px" : "0" }}>
										<SC.ReviewLayout $fd='column' $jc='space-between' $ai='normal' $gap={20}>
											<SC.FlexBox $jc='space-between'>
												<SC.ReviewUserInner $jc='flex-start' $gap={20}>
													<SC.ReviewUserName $jc='flex-start'>
														{nickname} 마지막
													</SC.ReviewUserName>
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
															shopId={data.shopId}
														/>
													)}
													<p style={{ color: "red" }}>신고</p>
													{currentUser === nickname && (
														<p onClick={onDeleteShopComment(data.shopId, reviewId)}>삭제</p>
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
								) : (
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
															shopId={data.shopId}
														/>
													)}
													<p style={{ color: "red" }}>신고</p>
													{currentUser === nickname && (
														<p onClick={onDeleteShopComment(data.shopId, reviewId)}>삭제</p>
													)}
													<p>{formatDate(createAt)}</p>
												</SC.ReviewMenuInner>
											</SC.FlexBox>
											<SC.ReviewText>{review}</SC.ReviewText>
											<SC.FlexBox $jc='space-between' $ai='flex-end'>
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
								)
					  )}
			</SC.ReviewsOutline>
		);
	}
};
