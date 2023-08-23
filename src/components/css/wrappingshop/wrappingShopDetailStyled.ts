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
	// padding-top: ${({ theme }) => theme.headerHeight.desktop};
	min-height: 490px;

	section {
		width: 100%;
		height: 100%;
		min-height: 490px;
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
	max-width: 1440px;
	width: 100%;
	height: 100%;
	margin: 0 auto;
	border: 1px dotted red;
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

const ReviewStarItem = styled.div`
	font-size: 30px;
`;

const DetailScoreDiv = styled.div<Partial<Type.Styled>>`
	${Flex}
	text-align: center;
	height: 70px;
	background-color: ${({ $bgColor, theme }) => $bgColor && theme.color[$bgColor]};
	border: 1px solid ${({ $bColor, theme }) => $bColor && theme.color[$bColor]};
`;

// DetailReviewArea --------------------------------
const DetailReviewOutLine = styled.div`
	position: relative;
`;

// DetailReviewBanner --------------------------------
const ReviewBannerOutline = styled.div`
	${Flex}
	position: relative;
	&::after {
		content: "";
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
		height: 50%;
		background-color: #ffffff;
		z-index: 1;
	}
`;

const ReviewBannerLayout = styled.div`
	overflow: hidden;
	border-radius: 10px;
	position: relative;
`;

const ReviewBannerButton = styled.button`
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

	color: white;
	font-size: 2.5rem;
	font-weight: bold;
`;

// DetailReviewForm --------------------------------
const ReviewFormOutLine = styled.div<Partial<Type.Styled>>`
	${Flex}
	width: 100%;
	background-color: #ffffff;
`;

const ReviewFormLayout = styled.form<Partial<Type.Styled>>`
	${Flex}
	padding: 30px 20px;
`;

const ReviewUserButtonInner = styled.div<Partial<Type.Styled>>`
	${Flex}
	width: 442px;
`;

const ReviewFromUserName = styled.div<Partial<Type.Styled>>`
	${Flex}
	color: #555555;
	flex: 1;
`;

const ReviewFormInputInner = styled.div<Partial<Type.Styled>>`
	${Flex}
	padding-left: 100px;
`;

const ReviewFormInput = styled.textarea`
	border: solid 1px #c7c7cb;
	height: 100px;
	width: 100%;
	padding: 20px 70px 20px 23px;
	background-color: #f3f3f8;
	font-size: 16px;
`;

const ReviewPreviewImageInner = styled.div<Partial<Type.Styled>>`
	${Flex}
	padding-left: 100px;
`;
const ReviewPreviewImageItem = styled.img`
	width: 101px;
	height: 101px;
	flex-grow: 0;
	border-radius: 4px;
	border: solid 1px #c7c7cb;
	background-color: #f3f3f8;
`;

// ReviewStarPointer --------------------------------
const StarImageStyle = styled.img`
	width: ${({ width }) => width};
	height: ${({ height }) => height};
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
	color: #4c4cff;
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

const ReviewImageInner = styled.div<Partial<Type.Styled>>`
	${Flex}
	padding-left: 93px;
`;

const ReviewImage = styled.div`
	border: 1px solid #c7c7cb;
	width: 101px;
	height: 101px;
	border-radius: 4px;
	overflow: hidden;
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
	ReviewStarItem,
	DetailScoreDiv,

	// DetailReviewArea
	DetailReviewOutLine,

	// DetailReviewBanner
	ReviewBannerOutline,
	ReviewBannerLayout,
	ReviewBannerButton,

	// DetailReviewForm
	ReviewFormOutLine,
	ReviewFormLayout,
	ReviewUserButtonInner,
	ReviewFromUserName,
	ReviewFormInputInner,
	ReviewFormInput,
	ReviewPreviewImageInner,
	ReviewPreviewImageItem,

	// ReviewStarPointer
	StarImageStyle,

	// DetailReviewList
	ReviewsOutline,
	ReviewLayout,
	ReviewUserInner,
	ReviewUserName,
	ReviewStar,
	ReviewScore,
	ReviewRevisit,
	ReviewMenuInner,
	ReviewText,
	ReviewImageInner,
	ReviewImage,

	// EditWrappingReview
};
