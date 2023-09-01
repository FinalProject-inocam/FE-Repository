import { FC } from "react";
import * as CP from "..";
import * as SC from "../css";

export const ReviewInner: FC<{
	reviews: any;
	setPage?: any;
}> = ({ reviews: { reviewId, nickname, star, revisit, createAt, shopId, review, imageUrls } }) => {
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
				/>
				<div>{review}</div>
				<CP.ReviewList imageUrls={imageUrls} shopId={shopId} reviewId={reviewId} />
			</SC.FlexBox>
		</SC.ReviewListLayout>
	);
};
