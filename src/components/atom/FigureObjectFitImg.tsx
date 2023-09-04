import React from "react";
import { FigureObjectFit } from "../css";
import * as Type from "../../types";

// <FigureImg width={width} src={require(`../assets/frame-000.jpg`)} alt="SomeImg"/>
export const FigureObjectFitImg: React.FC<Type.FigureImg> = ({ width, height, src, alt, types, children, onClick }) => {

	return (
		<FigureObjectFit $width={width} $height={height} $types={types} onClick={onClick} >
			<img src={src} alt={alt} />
			{children}
		</FigureObjectFit>
	);
};
