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
	// const [edit, setEdit] = useState(false);

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
						<div>
							<CP.ReviewInner
								reviews={reviews}
								key={reviews.reviewId}
								shopId={shopId}
								// setEdit={setEdit}
							/>
							{/* {edit ? ({currentUser === nickname && <CP.EditWrappingReview reviewId={reviewId} shopId={shopId} />}) : null} */}
						</div>
					))}

				{data && !data.last && <div ref={fetchNextRef} />}
			</SC.FlexBox>
		);
	}
};
