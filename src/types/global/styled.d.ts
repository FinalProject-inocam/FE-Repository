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
	$state: boolean;
	$font: RuleSet<object>;
  $borderR : string

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

	//Header
	$scrolly: UseHeadScroll;

	// WrappingShop Detail
	$bannerSize: "big" | "small";
}
