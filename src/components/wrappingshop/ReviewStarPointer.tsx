import React from "react";
import * as Type from "../../types";
import * as SC from "../css";
import { ReviewStarFull, ReviewStarEmpty } from "../../assets/wrappingshop";

export const ReviewStarPointer: React.FC<Type.WrappingDetailStar> = ({ star, width, height, handleStarClick }) => {
	return (
		<SC.ReviewStar>
			{Array.from({ length: 5 }).map((_, index) => (
				<SC.StarImageStyle
					key={index}
					width={width}
					height={height}
					src={index < star ? ReviewStarFull : ReviewStarEmpty}
					alt={`별-${index}`}
					onClick={() => handleStarClick(index + 1)}
				/>
			))}
		</SC.ReviewStar>
	);
};
