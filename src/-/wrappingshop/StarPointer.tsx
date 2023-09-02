import React from "react";
import * as SC from "../css";
import * as Img from "../../assets";
import * as Type from "../../types";
import { useStarPointer } from "../../hooks";

export const StarPointer: React.FC<Type.WrappingDetailStar> = ({ size }) => {
	const { getStar, onChangeStart } = useStarPointer();

	return (
		<SC.ReviewStar>
			{Array.from({ length: 5 }).map((_, index) => (
				<SC.StarImg
					key={index}
					$size={size}
					src={index < getStar ? Img.ReviewStarFull : Img.ReviewStarEmpty}
					alt={`별-${index}`}
					onClick={onChangeStart(index + 1)}
				/>
			))}
		</SC.ReviewStar>
	);
};
