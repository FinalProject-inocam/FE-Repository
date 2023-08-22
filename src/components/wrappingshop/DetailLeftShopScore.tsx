import React from "react";
import * as Type from "../../types";
import * as SC from "../css";
import ReviewStarEmpty from "../../assets/ReviewStarEmpty.svg";
import ReviewStarFull from "../../assets/ReviewStarFull.svg";

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
						<img
							key={index}
							style={{ width: "25px", height: "25px" }}
							src={index < data.avgStar ? ReviewStarFull : ReviewStarEmpty}
							alt={`별-${index}`}
						/>
					))}
				</SC.ReviewScoreInner>
			</SC.ReviewScoreLayout>
		</SC.DetailLeftShopScoreOutline>
	);
};
