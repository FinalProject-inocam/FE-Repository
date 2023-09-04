import { css, styled } from "styled-components";
import * as Type from "../../../types";
import { Flex, Grid, cursor } from "../GlobalStyled";

// 페이지 --------------------------------
const DetailOutline = styled.div<Partial<Type.Styled>>`
	${Flex}
	margin: 0 auto;
	background-color: #efefef;
`;

// Map ------------------------------------
const DetailKakaoMaps = styled.div`
	position: relative;
	width: 100%;

	section {
		width: 100%;
		min-height: 490px;
		transition: all 0.1s linear;
	}

	@media (max-width: 1024px) {
		min-height: 320px;
		padding-top: ${({ theme }) => theme.headerHeight.mobile};
		section {
			min-height: 250px;
		}
	}
`;

const MapFadeBottom = styled.div`
	background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.15) 100%);
	height: 4rem;
	position: absolute;
	bottom: 0;
	width: 100%;
	z-index: 1;
`;

// DetailContent ------------------------------------
const DetailContent = styled.section<Partial<Type.Styled>>`
	${Grid}
	grid-template-columns: repeat(1, 1fr);
	max-width: 1440px;
	width: 100%;
	height: 100%;
	margin: 0 auto;
	@media (min-width: 1024px) {
		grid-template-columns: 469px 1fr;
	}
`;

// Banner --------------------------------
const BannerContainer = styled.div`
	display: flex;
`;

const BannerItem = styled.div<Partial<Type.Styled>>`
	border-radius: 10px;

	${({ $bannerSize }) =>
		$bannerSize === "big"
			? css`
					width: 466px;
					height: 333px;
			  `
			: css`
					width: 222px;
					height: 159px;
			  `}
	border: 1px solid black;
`;

const BannerWrapper = styled.div<Partial<Type.Styled>>`
	display: flex;
	justify-content: space-between;
`;

const RightBanner = styled.div<Partial<Type.Styled>>`
	${Grid}
	column-gap: 20px;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;

	z-index: 20;
	overflow: hidden;
	border-radius: 10px;
`;

// Info --------------------------------
const DetailInfoLayout = styled.div`
	background-color: #ffffff;
	border-radius: 10px 10px 0 0;
	overflow: hidden;
	width: 100%;
`;

const DetailInfoInner = styled.div<Partial<Type.Styled>>`
	${Flex}
	width:100%;
	padding: 30px 20px;
	background-color: #ffffff;
`;

const ReviewCountTitleItem = styled.div<Partial<Type.Styled>>`
	font-size: 20px;
	font-weight: 600;
	margin-left: ${(props) => (props.$highlight ? "10px" : "0")};
	color: ${(props) => (props.$highlight ? "#4c4cff" : "black")};
`;

const ReviewScoreInner = styled.div<Partial<Type.Styled>>`
	${Flex}
	line-height: 70px;
	text-align: center;
	width: 213.5px;
	height: 70px;
	border: ${(props) => (props.$highlight ? "1px solid #c7c7cb" : "none")};
	background-color: ${(props) => (props.$highlight ? "none" : "#c7c7cb")};
`;

const ReviewScoreItem = styled.div<Partial<Type.Styled>>`
	margin-right: ${(props) => (props.$highlight ? "8px" : "0")};
	font-size: ${(props) => (props.$highlight ? "40px" : "20px")};
	color: ${(props) => (props.$highlight ? "#1d1d1f" : "#555555")};
`;

const DetailScoreDiv = styled.div<Partial<Type.Styled>>`
	${Flex}
	text-align: center;
	height: ${({ $height }) => $height};
	background-color: ${({ $bgColor, theme }) => $bgColor && theme.color[$bgColor]};
	/* border: 1px solid ${({ $bColor, theme }) => $bColor && theme.color[$bColor]}; */
`;

//DetailReviewArea

// DetailReviewBanner --------------------------------
const ReviewBannerGridBox = styled.div<Partial<Type.Styled>>`
	${Grid}
	grid-template-columns: repeat(1, 1fr);
	position: relative;
	&::after {
		content: "";
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
		height: 50%;
		background-color: #ffffff;
	}

	@media (min-width: 1024px) {
		grid-template-columns: repeat(2, 222.5px);
	}
	@media (min-width: 1200px) {
		grid-template-columns: repeat(3, 222.5px);
	}
	@media (min-width: 1440px) {
		grid-template-columns: repeat(4, 222.5px);
	}
`;

const ReviewBannerMoreBtn = styled.button`
	${Flex}
	${cursor}
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.6);
	border: none;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.35);

	color: #ffffff;
	font-size: 2.5rem;
	font-weight: bold;
`;

// ReviewStarPointer --------------------------------
const StarImg = styled.img<Partial<Type.Styled>>`
	width: ${({ $size }) => `${$size}px`};
	height: ${({ $size }) => `${$size}px`};
`;

// DetailReviewList --------------------------------
const ReviewsOutline = styled.div`
	margin-top: 20px;
	background-color: #ffffff;
`;

const ReviewLayout = styled.div<Partial<Type.Styled>>`
	${Flex}
	padding: 22px 20px 30px;
	border-bottom: 3px solid #eee;
`;

const ReviewUserInner = styled.div<Partial<Type.Styled>>`
	${Flex}
	/* width: 302.5px; */
	width: 100%;
`;

const ReviewUserName = styled.div<Partial<Type.Styled>>`
	${Flex}
	max-width: 74px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	line-height: 1.25;
	letter-spacing: -0.18px;
	text-align: left;
	flex: 1;
`;

const ReviewStar = styled.div`
	${Flex}
	margin-right: 5px;
`;

const ReviewScore = styled.div`
	${Flex}
	line-height: 20px;
	height: 20px;
	text-align: center;
`;

const ReviewRevisit = styled.div`
	line-height: normal;
	color: #4c4cff;
	text-align: center;
`;

const ReviewMenuInner = styled.div<Partial<Type.Styled>>`
	${Flex}
	width: 100%;

	p {
		font-size: 16px;
		margin-left: 10px;
		color: #828295;
	}
`;

const ReviewText = styled.div`
	padding-left: 93px;
	padding-right: 219px;
`;

const ReviewImage = styled.div`
	border: 1px solid #c7c7cb;
	width: 101px;
	height: 101px;
	border-radius: 4px;
	overflow: hidden;
`;

// DeteailReviewForm
const ReviewFormFlex = styled.div<Partial<Type.Styled>>`
	${Flex}
	@media (max-width: 700px) {
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;
	}
`;

const SubmitInput = styled.input<Partial<Type.Styled>>`
	${({ theme }) => theme.btnSize.primary}
	${cursor}
color : ${({ $color }) => $color};
	border-radius: ${({ $borderR }) => $borderR};
	border: 1px solid ${({ $bColor }) => $bColor};
	${({ $bColor, theme }) =>
		$bColor === "blue"
			? css`
					background-color: ${theme.color[$bColor]};
					color: ${theme.color.white};
			  `
			: null}

	${({ $types }) =>
		$types === "reviewForm"
			? css`
					position: absolute;
					top: 0;
					right: 0;
			  `
			: null}
`;

const Likebutton = styled.button<Partial<Type.Styled>>`
	${Flex}
	${cursor}
	gap: 10px;
	background-color: #fff;
	height: 36px;
	width: 99px;
	border: 1px solid ${({ theme }) => theme.color.blue};
	border-radius: 5px;
	background-color: ${({ theme, $isLike }) => ($isLike ? theme.color.lightblue : theme.color.white)};
`;

const ReviewFormLayout = styled.form<Partial<Type.Styled>>`
	${Grid}
	width: 100%;
	height: 313px;
	padding: 30px 20px 26px;
	margin-bottom: 20px;
	background-color: #fff;
`;

// RevisitRadio
const RevisitRadioLabel = styled.label<Partial<Type.Styled>>`
	${cursor}
	display: block;
	width: 105px;
	height: 36px;
	line-height: 36px;
	text-align: center;
	border: 1px solid ${({ theme }) => theme.color.lightgray2};
	border-radius: 5px;
	color: ${({ theme }) => theme.color.lightgray2};

	${({ $state, theme }) =>
		$state === 1
			? css`
					background-color: ${theme.color.lightblue};
					color: ${theme.color.blue};
					border-color: ${theme.color.blue};
			  `
			: $state === 2 &&
			  css`
					color: ${theme.color.red};
					border-color: ${theme.color.red};
			  `};
`;

const TextaAreaLayout = styled.div`
	position: relative;
	width: 100%;
`;

const TextArea = styled.textarea`
	display: block;
	width: 100%;
	height: 100px;
	resize: none;
	padding: 10px;
	border: 1px solid ${({ theme }) => theme.color.lightgray2};
	background-color: ${({ theme }) => theme.color.lightgray1};
`;

// CommentTextaArea
const TextaAreaCount = styled.div<Partial<Type.Styled>>`
	position: absolute;
	bottom: 5px;
	right: 5px;
	font-size: 0.75rem;
	color: ${({ $size, theme }) =>
		($size as number) === 0
			? theme.color.black
			: ($size as number) <= 200
			? theme.color.blue
			: ($size as number) <= 250
			? theme.color.orange
			: theme.color.red2};
`;

// DetailReviewList
const ReviewListLayout = styled.form<Partial<Type.Styled>>`
	${Grid}
	width: 100%;
	padding-bottom: 30px;
	border-bottom: 3px solid #eee;
`;

export {
	// 페이지
	DetailOutline,

	//Map
	DetailKakaoMaps,
	MapFadeBottom,

	// DetailContent
	DetailContent,

	// Banner
	BannerContainer,
	BannerItem,
	BannerWrapper,
	RightBanner,

	// Info
	DetailInfoLayout,
	DetailInfoInner,
	ReviewCountTitleItem,
	ReviewScoreInner,
	ReviewScoreItem,
	DetailScoreDiv,

	//DetailReviewArea

	// DetailReviewBanner
	ReviewBannerGridBox,
	ReviewBannerMoreBtn,

	// ReviewStarPointer
	StarImg,

	//DeteailReviewForm
	ReviewFormFlex,
	ReviewFormLayout,
	SubmitInput,

	// RevisitRadio
	RevisitRadioLabel,

	// CommentTextaArea
	TextaAreaLayout,
	TextArea,
	TextaAreaCount,
	// PrevImage

	// DetailReviewList
	ReviewListLayout,

	//
	ReviewsOutline,
	ReviewLayout,
	ReviewUserInner,
	ReviewUserName,
	ReviewStar,
	ReviewScore,
	ReviewRevisit,
	ReviewMenuInner,
	ReviewText,
	ReviewImage,

	// EditWrappingReview
	// ReviewList
	Likebutton,
};
