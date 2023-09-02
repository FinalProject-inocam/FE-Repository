import { FC } from "react";
import * as RTK from "../../redux";
import * as AS from "../../assets";
import * as SC from "../css";
import * as CP from "..";
import { ReviewListProps } from "../../types";

export const ReviewList: FC<ReviewListProps> = ({ imageUrls, shopId, reviewId, isLike, likeCount }) => {
	const [patchWSReviewLikeRTK] = RTK.usePatchWrappingShopDetailLikeMutation();
	const onReviewLikeHandler = (reviewId: number) => async (event: React.MouseEvent) => {
		event.preventDefault();
		patchWSReviewLikeRTK({ shopId, reviewId });
	};
	return (
		<SC.FlexBox $jc='space-between' $ai='flex-end' style={{ width: "100%" }}>
			<SC.FlexBox $fd='row' $gap={10}>
				{imageUrls ? (
					imageUrls.map((url: string, index: number) => (
						<SC.ReviewImage key={index}>
							<img style={{ width: "100%", height: "100%" }} src={url} alt={`이미지-${index}`} />
						</SC.ReviewImage>
					))
				) : (
					<div></div>
				)}
			</SC.FlexBox>
			<SC.FlexBox $ai='flex-end' $gap={10}>
				<SC.Likebutton $isLike={isLike} onClick={onReviewLikeHandler(reviewId)}>
					<img src={isLike ? AS.ReviewUnlike : AS.ReviewLike} alt='reviewLike' />
					<span>{likeCount}</span>
				</SC.Likebutton>
				<CP.DetailButton.CommentButton $buttonSize='comment'>
					<img src={AS.ReviewComment} alt='reviewLike' />
				</CP.DetailButton.CommentButton>
			</SC.FlexBox>
		</SC.FlexBox>
	);
};

export default ReviewList;
