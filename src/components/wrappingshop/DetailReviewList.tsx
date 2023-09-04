import { FC, useEffect, useState } from "react";
import * as CP from "..";
import * as SC from "../css";
import * as RTK from "../../redux";
import * as Type from "../../types";
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

	const [loadingPage, setLoadingPage] = useState(null);

	useEffect(() => {
		if (isSuccess && loadingPage === page) {
			if (page === 1) {
				dispatch(RTK.deleteData());
			}
			dispatch(RTK.setMergeDate(data.content));
			// setLoadingPage(null);
			console.log("Merged Data:", getMergeData);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isSuccess]);

	useEffect(() => {
		if (isFetching) {
			setLoadingPage(page);
		}
	}, [isFetching, page]);

	if (isLoading) return <div>... 로딩중</div>;
	else if (isError) return <div>에러발생... {JSON.stringify(error)}</div>;
	else {
		return (
			<SC.FlexBox
				$fd='column'
				$gap={30}
				style={{
					padding: "30px 20px 26px",
					backgroundColor: "#fff",
				}}>
				{getMergeData &&
					getMergeData.map((reviews: Type.TotalWrappingShopReview) => (
						<CP.ReviewInner reviews={reviews} key={reviews.reviewId} shopId={shopId} />
					))}
				{data && !data.last && <div ref={fetchNextRef} />}
			</SC.FlexBox>
		);
	}
};
