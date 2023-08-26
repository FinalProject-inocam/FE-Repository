import React, { useEffect, useRef, useState } from "react";
import * as CP from "..";
import * as SC from "../css";
import * as RTK from "../../redux";
import * as Type from "../../types";

import { useParams } from "react-router-dom";

export const DetailReviewList: React.FC<Type.WrappingDetailProps> = () => {
	// delete review api

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
			<div
				style={{
					padding: "30px 20px 26px",
					backgroundColor: "#fff",
				}}>
				{data.content.map(
					(
						{
							nickname,
							star,
							review,
							reviewId,
							revisit,
							createAt,
							imageUrls,
						}: Type.TotalWrappingShopReview,
						index: number
					) =>
						data.content.length === index + 1 ? (
							<SC.ReviewListLayout key={reviewId} $gtc='80px 1fr' $cgap={20}>
								<SC.CustomH3 $types='nickname'>{nickname}</SC.CustomH3>
								<SC.FlexBox
									$fd='column'
									$gap={20}
									$ai='flex-start'
									$jc='flex-start'
									style={{
										position: "relative",
									}}>
									<CP.ReviewBar
										reviewId={reviewId}
										star={star}
										revisit={revisit}
										createAt={createAt}
										nickname={nickname}
										shopId={shopId}
									/>
									<div>{review}</div>
									<CP.ReviewList imageUrls={imageUrls} shopId={shopId} reviewId={reviewId} />
								</SC.FlexBox>
							</SC.ReviewListLayout>
						) : null
				)}
			</div>
		);
	}
};
