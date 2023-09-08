import { UseHeadScroll } from "../hooks";

export interface Styled {
	// commen
	$color: string;
	$width: string;
	$height: string;
	$imgUrl: string;
	$position: string;
	$types: string;
	$size: number;
	$mSize: number;
	$state: boolean | number;
	$font: string;
	$fontW: number;
	$borderR: string;
	$borderTopRightR: string;
	$borderTopLeftR: string;
	$overflow: string;
	$bColor: string;
	$highlight: boolean;
	$bgColor: string;
	$tAlign: string;
	$rotate: number;
	$padding: string;
	$shadow: string;
	$spans: number[];
	$type: string;

	// Felx-Grid
	$gap: number;

	// Flex
	$fd: string;
	$jc: string;
	$ai: string;

	// Grid
	$gtc: string;
	$gtr: string;
	$gar: string;
	$cgap: number;
	$rgap: number;

	// GridMergedSpace
	$mergedgcs: number;
	$mergedgce: number;
	$mergedgrs: number;
	$mergedgre: number;

	//signup
	$signColor: boolean;
	$signupbtnColor: string;
	$display: boolean;

	//Header
	$scrolly: UseHeadScroll;

	// WrappingShop Detail
	$bannerSize: "big" | "small";
	$outlined: boolean;
	$buttonSize: string;
	$buttonSize?: "revisit" | "submit" | "upload" | "never" | "like" | "comment" | "default";
	$clicked?: boolean;
	$isLike: boolean;

	//Inncor
	$top: number;
	$left: number;
	$right: number;
	$Mtop: number;
	$Mleft: number;
	$Mright: number;

	$onClick?: () => void;

	//InnocarOrder
	$direction: string;
	$color: string;
}
