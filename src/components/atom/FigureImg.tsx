import React from "react";
import { Figure } from "../css";
import * as Type from "../../types";

// <FigureImg width={width} src={require(`../assets/frame-000.jpg`)} alt="SomeImg"/>
export const FigureImg: React.FC<Type.FigureImg> = ({ width, src, alt, types, onClick }) => {
	return (
		<Figure $width={width} $types={types} onClick={onClick}>
			<img src={src} alt={alt} />
		</Figure>
	);
};
