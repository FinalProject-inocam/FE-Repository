import { MutableRefObject, ReactChild } from "react";
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
	types?: string;
	children?: ReactChild;
	onClick?: () => void;
}

export interface EditComment {
	postId: number | undefined;
	commentId: number;
	comment: string;
}

/* / WrappingShop컴포넌트 / -------------------------------------------------------- */
interface ShopBoxProps {
	item: Type.WrappingShop;
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
	size: number;
}

export interface WrappingDetailStyled {
	$bgColor?: string;
	$bColor?: string;
	$color?: string;
	$buttonSize?: "revisit" | "submit" | "upload" | "never" | "upload" | "like" | "comment" | "login" | "default";
	$outlined?: boolean;
	children?: React.ReactNode;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	type?: "button" | "reset" | "submit";
	value?: string;
	$clicked?: boolean;
}

export interface ReviewBarProps {
	reviewId: number;
	star: number;
	revisit: boolean;
	createAt: string;
	nickname: string;
	shopId: string | undefined;
}

export interface ReviewListProps {
	imageUrls: string[];
	shopId: string | undefined;
	reviewId: number;
	likeCount: number;
	isLike: boolean;
}

/* / WrappingKakaomapsProps컴포넌트 / -------------------------------------------------------- */
export interface WrappingKakaomapsProps {
	ref: MutableRefObject<HTMLDivElement | null>;
}

/* / SignUpInput컴포넌트 / -------------------------------------------------------- */
export interface SignUpECProps {
	inputRef: LegacyRef<HTMLInputElement> | undefined;
}

export interface SignUpInputBasicProps extends SignUpECProps {
	name: string;
	submitted: boolean;
}

export interface SignUpInputProps extends SignUpInputBasicProps {
	placeholder: string;
	length: number;
	type?: string;
}

/* / Innocar컴포넌트 / -------------------------------------------------------- */
export interface TechnicalListInnerProps {
	title: string;
	technicalInfoCategory: string;
	onToggle: (setState: Dispatch<React.SetStateAction<boolean>>) => MouseEventHandler<HTMLDivElement> | undefined;
	infoBoolean: boolean;
	setInfoBoolean: any;
}

/* / ChatRoomLayoutProps 컴포넌트 / -------------------------------------------------------- */
export interface ChatRoomLayoutProps {
  msg : string;
  type : string;
  peer : string ;
  room : string;
  bColor ?: string;
  color ?: string;
}