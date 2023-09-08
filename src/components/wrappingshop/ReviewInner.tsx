import { FC, useState } from "react";
import * as CP from "..";
import * as SC from "../css";
import * as RTK from "../../redux";

export const ReviewInner: FC<{
	reviews: any;
	setPage?: any;
	shopId?: string;
	setEdit?: any;
}> = ({ reviews: { reviewId, nickname, star, revisit, createAt, review, imageUrls, likeCount, isLike }, shopId }) => {
	const [edit, setEdit] = useState(false);
	const { nickname: currentUser } = RTK.useAppSelector(RTK.selectDecode);
	return (
		<SC.ReviewListLayout $gtc='80px 1fr' $cgap={20}>
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
					setEdit={setEdit}
				/>
				<div>{review}</div>
				<CP.ReviewList
					imageUrls={imageUrls}
					shopId={shopId}
					reviewId={reviewId}
					likeCount={likeCount}
					isLike={isLike}
				/>
				{edit ? (
					currentUser === nickname ? (
						<CP.EditWrappingReview setEdit={setEdit} reviewId={reviewId} shopId={shopId} />
					) : null
				) : null}
			</SC.FlexBox>
		</SC.ReviewListLayout>
	);
};
