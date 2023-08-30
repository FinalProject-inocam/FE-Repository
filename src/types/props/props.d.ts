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
  size: number;
}

export interface WrappingDetailStyled {
  $bgColor?: string;
  $bColor?: string;
  $color?: string;
  $buttonSize?:
    | "revisit"
    | "submit"
    | "upload"
    | "never"
    | "upload"
    | "like"
    | "comment"
    | "login"
    | "default";
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
