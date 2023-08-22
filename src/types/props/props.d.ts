import { MutableRefObject } from "react";
import { AsyncHooksDefault } from "../hooks";

export type SetState = Dispatch<SetStateAction<boolean>>;

export interface EditWrappingShopReview {
	shopId: string | undefined;
	reviewId: number;
}

export interface FigureImg {
	src: string;
	alt: string;
	width: string;
	height?: string;
	overflow?: string;
	borderR?: string;
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

export interface WrappingDetailProps extends AsyncHooksDefault {
	data?: WrappingShopDetail;
}

export interface WrappingDetailStar {
	star: number;
	width: string;
	height: string;
	handleStarClick: (starNumber: number) => void;
}

export interface WrappingDetailStyled {
	$bgColor?: string;
	$bColor?: string;
	$color?: string;
	$buttonSize?: "revisit" | "submit" | "upload" | "never" | "upload" | "like" | "comment" | "default";
	$outlined?: boolean;
	children?: React.ReactNode;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	type?: "button" | "reset" | "submit";
	value?: string;
	$clicked?: boolean;
}

/* / WrappingKakaomapsProps컴포넌트 / -------------------------------------------------------- */
export interface WrappingKakaomapsProps {
	ref: MutableRefObject<HTMLDivElement | null>;
}

/* / SignUpInput컴포넌트 / -------------------------------------------------------- */
export interface SignUpInputProps {
	placeholder: string;
	name: string;
	length: number;
	type?: string;
	inputRef: LegacyRef<HTMLInputElement> | undefined;
	submitted: boolean;
}

/* / SignUpInputRadio컴포넌트 / -------------------------------------------------------- */
export interface SignUpInputRadio {
	inputRef: LegacyRef<HTMLInputElement> | undefined;
	submitted: boolean;
}
