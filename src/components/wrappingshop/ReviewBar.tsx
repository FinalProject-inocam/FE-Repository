import { FC } from "react";
import * as CP from "..";
import * as SC from "../css";
import * as AS from "../../assets";
import * as Type from "../../types";
import * as Hooks from "../../hooks";

export const ReviewBar: FC<Type.ReviewBarProps> = ({ reviewId, star, revisit, createAt, nickname, shopId }) => {
	const { onDeleteShopComment, formatDate, currentUser } = Hooks.useReviewBar();
	return (
		<SC.FlexBox $fd='row' $jc='space-between' style={{ width: "100%" }}>
			<SC.FlexBox $gap={20}>
				<SC.DetailScoreDiv $bColor='gray' $height='20px'>
					{Array.from({ length: 5 }).map((_, index) => (
						<img
							key={index}
							style={{ width: "20px", height: "20px" }}
							src={index < star ? AS.ReviewStarFull : AS.ReviewStarEmpty}
							alt={`별-${index}`}
						/>
					))}
					<div style={{ marginLeft: "5px", lineHeight: "30px", textAlign: "center", paddingTop: "3px" }}>
						({star})
					</div>
				</SC.DetailScoreDiv>
				<SC.ReviewRevisit>{revisit && revisit ? "재방문의사" : ""}</SC.ReviewRevisit>
			</SC.FlexBox>
			<SC.FlexBox>
				<SC.ReviewMenuInner $jc='flex-end' $gap={10}>
					{currentUser === nickname && <CP.EditWrappingReview reviewId={reviewId} shopId={shopId} />}
					<p style={{ color: "red" }}>신고</p>
					{currentUser === nickname && <p onClick={onDeleteShopComment(shopId, reviewId)}>삭제</p>}
					<p>{formatDate(createAt)}</p>
				</SC.ReviewMenuInner>
			</SC.FlexBox>
		</SC.FlexBox>
	);
};
