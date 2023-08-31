import { FC, useEffect } from "react";
import * as RTK from "../../redux";
import * as Type from "../../types";
import * as CP from "..";
import { useParams } from "react-router-dom";
import { useInfinityThrottle } from "../../hooks";

export const DetailReviewList: FC<any> = ({ page, setPage }) => {
	// delete review api

	const { id: shopId } = useParams<{ id: string }>();
	const { isLoading, isSuccess, data, isError, error, isFetching } = RTK.useGetWSDetailReviewsQuery({
		shopId,
		page,
	});
	const fetchNextRef = useInfinityThrottle(setPage, isFetching);

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
				{getMergeData.map((reviews: Type.TotalWrappingShopReview) => (
					<CP.ReviewInner reviews={reviews} key={reviews.reviewId} />
				))}
				{data && !data.last && <div ref={fetchNextRef} />}
			</div>
		);
	}
};
