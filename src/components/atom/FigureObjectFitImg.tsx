import React from "react";
import { FigureObjectFit } from "../css";
import * as Type from "../../types";

// <FigureImg width={width} src={require(`../assets/frame-000.jpg`)} alt="SomeImg"/>
export const FigureObjectFitImg: React.FC<Type.FigureImg> = ({ width, height, src, alt, overflow }) => {
	return (
		<FigureObjectFit $width={width} $height={height} $overflow={overflow}>
			<img src={src} alt={alt} />
		</FigureObjectFit>
	);
};
