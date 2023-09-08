import { FC } from "react";
import * as CP from "..";
import * as SC from "../css";
import * as RTK from "../../redux";
import * as Type from "../../types";
import { useParams } from "react-router-dom";
import { useInfinityThrottle } from "../../hooks";

export const DetailReviewList: FC<any> = ({ page, setPage }) => {
	const { id: shopId } = useParams<{ id: string }>();
	const { isLoading, data, isError, error, isFetching } = RTK.useGetWSDetailReviewsQuery({
		shopId,
		page,
	});
	const fetchNextRef = useInfinityThrottle(setPage, isFetching);

	if (isLoading) return <div>... 로딩중</div>;
	else if (isError) return <div>에러발생... {JSON.stringify(error)}</div>;
	else {
		return (
			<SC.FlexBox
				$fd='column'
				$jc='space-between'
				$ai='stretch'
				$gap={30}
				style={{
					padding: "30px 20px 26px",
					backgroundColor: "#fff",
				}}>
				{data &&
					data.content.map((reviews: Type.TotalWrappingShopReview) => (
						<div key={reviews.reviewId}>
							<CP.ReviewInner reviews={reviews} key={reviews.reviewId} shopId={shopId} />
						</div>
					))}

				{data && !data.last && <div ref={fetchNextRef} />}
			</SC.FlexBox>
		);
	}
};
