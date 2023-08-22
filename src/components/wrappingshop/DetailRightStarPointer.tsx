import React from "react";
import * as Type from "../../types";
import * as SC from "../../components/css";
import ReviewStarEmpty from "../../assets/ReviewStarEmpty.svg";
import ReviewStarFull from "../../assets/ReviewStarFull.svg";
import { styled } from "styled-components";

export const DetailRightStarPointer: React.FC<Type.WrappingDetailStar> = ({ star, width, height, handleStarClick }) => {
	return (
		<SC.ReviewStarContainer>
			{Array.from({ length: 5 }).map((_, index) => (
				<StarImageStyle
					key={index}
					width={width}
					height={height}
					src={index < star ? ReviewStarFull : ReviewStarEmpty}
					alt={`별-${index}`}
					onClick={() => handleStarClick(index + 1)}
				/>
			))}
		</SC.ReviewStarContainer>
	);
};

const StarImageStyle = styled.img`
	width: ${({ width }) => width};
	height: ${({ height }) => height};
`;
