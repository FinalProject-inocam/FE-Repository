import { css, styled } from "styled-components";
import * as Type from "../../../types";
import { Flex, Grid, cursor } from "../GlobalStyled";

// 페이지 --------------------------------
const DetailOutline = styled.div<Partial<Type.Styled>>`
	${Flex}
	margin: 0 auto;
	background-color: #efefef;
	/* height: 100vh; */
`;

// Map ------------------------------------
const DetailKakaoMaps = styled.div`
	position: relative;
	width: 100%;
	padding-top: ${({ theme }) => theme.headerHeight.desktop};
	min-height: 490px;

	section {
		width: 100%;
		height: 100%;
		min-height: 490px;
	}
`;

const MapFadeBottom = styled.div`
	background-image: linear-gradient(180deg, rgba(129, 134, 138, 0), rgba(129, 134, 138, 0.3), #111);
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
	padding: 0 72px;
	/* border: 1px dotted red; */
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

const BannerImage = styled.img`
	width: 100%;
	height: 100%;
	inset: 0px;
	display: block;
	object-fit: cover;
	opacity: 1;
	transition: opacity 500ms ease-in-out 0s;
	z-index: 1;

	&:hover {
		transform: scale(1.05);
		border-color: rgba(249, 249, 249, 0.8);
	}
`;

const BannerWrapper = styled.div<Partial<Type.Styled>>`
	display: flex;
	justify-content: space-between;
`;

const RightBanner = styled.div<Partial<Type.Styled>>`
	${Grid}
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	transform: translateY(-50%);
	z-index: 20;
`;

const MoreButton = styled.button`
	${cursor}
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.6);
	border: none;

	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	font-size: 2.5rem;
	font-weight: bold;
`;

// Info --------------------------------
const DetailLeftOutLine = styled.div`
	position: relative;
`;

const DetailLeftShopInfoLayout = styled.div`
	margin-top: 32%;

	background-color: #ffffff;
	padding-top: 30px;
	padding-left: 20px;
	padding-right: 20px;
	padding-bottom: 30px;
`;

const DetailLeftBanner = styled.div`
	overflow: hidden;
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
	font-size: 20px;
	font-weight: 600;
`;

const WrappingShopName = styled.div`
	font-size: 1.25rem;
	font-weight: bold;
	margin-bottom: 10px;
`;

const WrappingShopAddress = styled.div`
	font-size: 1rem;
	color: #999999;
`;

const DetailLeftShopScoreOutline = styled.div`
	margin-top: 5px;
	padding-top: 30px;
	padding-bottom: 30px;
	padding-left: 20px;
	padding-right: 20px;
	background-color: #fff;
`;

const ReviewCountTitleLayout = styled.div`
	margin-bottom: 20px;
	display: flex;
	flex-direction: row;
`;

const ReviewCountTitleItem = styled.div<Partial<Type.Styled>>`
	font-size: 20px;
	font-weight: 600;
	margin-left: ${(props) => (props.$highlight ? "10px" : "0")};
	color: ${(props) => (props.$highlight ? "#4c4cff" : "black")};
`;

const ReviewScoreLayout = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const ReviewScoreInner = styled.div<Partial<Type.Styled>>`
	display: flex;
	justify-content: center;
	align-items: center;
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

const LeftContentWrapper = styled.div`
	padding-top: 20px;
	padding-bottom: 20px;
	padding-left: 13px;
	padding-right: 13px;
	background-color: #fff;
`;

const WrappingShopScore = styled.div`
	padding-top: 20px;
	padding-bottom: 20px;
	padding-left: 13px;
	padding-right: 13px;
	background-color: #fff;
`;

// Review --------------------------------
const RightOnSide = styled.div`
	width: 710px;
	max-height: calc(100vh - 590px);
	transform: translateY(0%);
	margin: 0;
	padding: 0;
	z-index: 9;
	background-color: #fff;
`;

const RightReviewFormer = styled.div`
	margin-top: 10%;
	padding-top: 1rem;
	padding-left: 13px;
	padding-right: 13px;
	margin-bottom: 4.4rem;
	background-color: #fff;
`;

const ReviewBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	margin-bottom: 2rem;

	hr {
		border: 1px solid black;
		color: black;
`;

const ReviewUpperContainer = styled.div<Partial<Type.Styled>>`
	margin-top: 1rem;
	display: flex;
	justify-content: space-between;
`;

const ReviewUserWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const ReviewMenuWrapper = styled.div`
	display: flex;

	p {
		font-size: 12px;
		margin-left: 5px;
	}
`;

const ReviewUserName = styled.div`
	font-size: 16px;
	font-weight: bold;
	margin-right: 10px;
`;

const ReviewStar = styled.div`
	color: #4c4cff;
`;
const ReviewScore = styled.div`
	margin-right: 0.62rem;
`;

const ReviewSImageContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1.1rem;
`;

const ReviewImageWrapper = styled.div`
	border: 1px solid black;
	width: 6.3rem;
	height: 6.3rem;
`;

const ReviewRevisit = styled.div`
	color: #4c4cff;
`;

const ReviewCommentImg = styled.img`
	width: 100%;
	height: 100%;
`;

const RightReviewOutline = styled.div`
	height: calc(100vh - 490px);
	padding-left: 20px;
	padding-right: 20px;
	overflow-y: scroll;
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
	BannerImage,
	BannerWrapper,
	RightBanner,
	MoreButton,

	// Info
	/* LeftOnSide, */
	DetailLeftOutLine,
	DetailLeftShopInfoLayout,
	DetailLeftBanner,
	DetailLeftShopScoreOutline,
	ReviewCountTitleLayout,
	ReviewCountTitleItem,
	ReviewScoreLayout,
	ReviewScoreInner,
	ReviewScoreItem,
	ReviewStarItem,
	LeftContentWrapper,
	WrappingShopScore,
	WrappingShopName,
	WrappingShopAddress,

	// Review
	RightOnSide,
	RightReviewFormer,
	RightReviewOutline,
	ReviewBox,
	ReviewUpperContainer,
	ReviewUserWrapper,
	ReviewMenuWrapper,
	ReviewUserName,
	ReviewStar,
	ReviewScore,
	ReviewSImageContainer,
	ReviewImageWrapper,
	ReviewRevisit,
	ReviewCommentImg,
};
