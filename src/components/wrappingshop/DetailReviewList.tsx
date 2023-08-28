import { FC, useRef, useState, MutableRefObject, useEffect, useCallback } from "react";
import * as CP from "..";
import * as SC from "../css";
import * as RTK from "../../redux";
import * as Type from "../../types";
import { useParams } from "react-router-dom";

const ReviewInner: FC<{
	reviews: any;
	fetchNextRef?: MutableRefObject<HTMLFormElement | null>;
	isFetching?: boolean;
	page?: any;
	last?: boolean;
	setPage?: any;
}> = ({
	reviews: { reviewId, nickname, star, revisit, createAt, shopId, review, imageUrls },
	page,
	last,
	setPage,
	fetchNextRef,
	isFetching,
}) => {
	const RefetchThrottle = (callback: () => void, delay: number) => {
		let timeId: NodeJS.Timeout | null = null;
		return () => {
			if (timeId) return;
			timeId = setTimeout(() => {
				callback();
				timeId = null;
			}, delay);
		};
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const onNextPageCallback = useCallback(
		RefetchThrottle(() => {
			console.log("쓰로틀 시작");
			setPage(page + 1);
		}, 2000),
		[]
	);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !isFetching && !last) {
					// 마지막 요소가 감지되었을 때, 추가요청을 보내면, 값이 오겠죠.
					console.log("Fetching more data...");
					onNextPageCallback();
				}
			},
			{ threshold: 0.1 } // 0~1, 0.1 뷰포트 요소(100px)의 10%(10px) 감지되었을 때, 동작한다.
		);

		if (fetchNextRef && fetchNextRef.current) {
			observer.observe(fetchNextRef.current); // 관찰대상 등록
		}
	}, [isFetching, last, setPage, page, fetchNextRef, onNextPageCallback]);

	return (
		<SC.ReviewListLayout ref={fetchNextRef} $gtc='80px 1fr' $cgap={20}>
			<SC.CustomH3 $types='nickname'>{nickname}하하하</SC.CustomH3>
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
	);
};

export const DetailReviewList: React.FC<Type.WrappingDetailProps> = () => {
	// delete review api

	const { id: shopId } = useParams<{ id: string }>();
	const [page, setPage] = useState<number>(1);
	const { isLoading, isSuccess, data, isError, error, isFetching } = RTK.useGetWSDetailReviewsQuery({
		shopId,
		page,
	});
	// infinite scroll
	const fetchNextRef = useRef<HTMLFormElement | null>(null);
	// console.log(setPage);

	const dispatch = RTK.useAppDispatch();
	const getMergeData = RTK.useAppSelector(RTK.selectMergeWCDreview);
	useEffect(() => {
		data && console.log(`data-리패치 :${page}`, data);
		isSuccess && dispatch(RTK.setMergeDate(data.content));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	console.log("getMergeData", getMergeData);
	if (isLoading) return <div>... 로딩중</div>;
	else if (isError) return <div>에러발생... {JSON.stringify(error)}</div>;
	else {
		return (
			<div
				style={{
					padding: "30px 20px 26px",
					backgroundColor: "#fff",
				}}>
				{getMergeData.map((reviews: Type.TotalWrappingShopReview, index: number) =>
					getMergeData.length === index + 1 ? (
						<ReviewInner
							fetchNextRef={fetchNextRef}
							reviews={reviews}
							key={reviews.reviewId}
							isFetching={isFetching}
							last={data.last}
							page={page}
							setPage={setPage}
						/>
					) : (
						<ReviewInner reviews={reviews} key={reviews.reviewId} />
					)
				)}
			</div>
		);
	}
};
