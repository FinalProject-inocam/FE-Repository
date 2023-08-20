import React from "react";
import * as Type from "../../types";
import * as SC from "../css";

export const DetailLeftShopScore: React.FC<Type.WrappingDetailProps> = ({ data }) => {
	return (
		<SC.DetailLeftShopScoreOutline>
			<SC.ReviewCountTitleLayout>
				<SC.ReviewCountTitleItem>리뷰</SC.ReviewCountTitleItem>
				<SC.ReviewCountTitleItem $highlight>{data.reviews.length}</SC.ReviewCountTitleItem>
			</SC.ReviewCountTitleLayout>
			<SC.ReviewScoreLayout>
				<SC.ReviewScoreInner>
					<SC.ReviewScoreItem $highlight>{data.avgStar.toFixed(1)}</SC.ReviewScoreItem>
					<SC.ReviewScoreItem>/5.0</SC.ReviewScoreItem>
				</SC.ReviewScoreInner>
				<SC.ReviewScoreInner $highlight>
					{Array.from({ length: 5 }).map((_, index) => (
						<SC.ReviewStarItem key={index} style={{ color: "#4c4cff" }}>
							{index < data.avgStar ? "★" : "☆"}
						</SC.ReviewStarItem>
					))}
				</SC.ReviewScoreInner>
			</SC.ReviewScoreLayout>
		</SC.DetailLeftShopScoreOutline>
	);
};
