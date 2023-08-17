import { MutableRefObject } from "react";
export interface EditWrappingShopReview {
	shopId: string | undefined;
	reviewId: number;
}

export interface FigureImg {
	src: string;
	alt: string;
	width: string;
	height?: string;
}

export interface EditComment {
	postId: number | undefined;
	commentId: number;
	comment: string;
}

/* / WrappingShopDetail컴포넌트 / -------------------------------------------------------- */
export interface WrappingShopBannerProps {
	bannerNumber: number;
	$bannerSize: "big" | "small";
}

/* / WrappingKakaomapsProps컴포넌트 / -------------------------------------------------------- */
export interface WrappingKakaomapsProps {
	ref: MutableRefObject<HTMLDivElement | null>;
}
