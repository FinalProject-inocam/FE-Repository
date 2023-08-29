import { FC, useEffect } from "react";
import * as CP from "..";
import * as SC from "../css";
import * as RTK from "../../redux";
import * as Type from "../../types";
import { useParams } from "react-router-dom";
import { useInfinityThrottle } from "../../hooks";

const ReviewInner: FC<{
	reviews: any;
	setPage?: any;
}> = ({
	reviews: { reviewId, nickname, star, revisit, createAt, shopId, review, imageUrls },
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
		}, 1000),
		[]
	);

	return (
		<SC.ReviewListLayout ref={fetchNextRef} $gtc='80px 1fr' $cgap={20}>
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
	);
};

export const DetailReviewList: React.FC<any> = ({page, setPage}) => {
	// delete review api

	const { id: shopId } = useParams<{ id: string }>();
	const { isLoading, isSuccess, data, isError, error, isFetching } = RTK.useGetWSDetailReviewsQuery({
		shopId,
		page,
	});
	const fetchNextRef = useInfinityThrottle(setPage, isFetching)

	const dispatch = RTK.useAppDispatch();
	const getMergeData = RTK.useAppSelector(RTK.selectMergeWCDreview);

	useEffect(() => {
		data && console.log(`data-리패치 :${page}`, data);
		if (isSuccess) {
			// page 1
			if (page === 1) {
				dispatch(RTK.deleteData()); // 기존에 있었던 상태 관리를 초기화 
				dispatch(RTK.setMergeDate(data.content)); // 새롭게 변경될 데이터를 받음 
			} else {
				// page 2 일 때 
				dispatch(RTK.setMergeDate(data.content));
			}
			
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	console.log("data", data);
	
	if (isLoading) return <div>... 로딩중</div>;
	else if (isError) return <div>에러발생... {JSON.stringify(error)}</div>;
	else {
		return (
			<div
				style={{
					padding: "30px 20px 26px",
					backgroundColor: "#fff",
				}}>
				{getMergeData.map((reviews: Type.TotalWrappingShopReview) =>
					(
						<ReviewInner
							reviews={reviews}
							key={reviews.reviewId}
						/>
					)
				)}
				{data && !data.last && <div ref={fetchNextRef}/>} 
			</div>
		);
	}
};
