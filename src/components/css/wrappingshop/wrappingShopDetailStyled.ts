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
	column-gap: 20px;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;

	z-index: 20;
	overflow: hidden;
	border-radius: 10px;
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

const ReviewCountTitleLayout = styled.div`
	${Flex}
	flex-direction: row;
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

// Review --------------------------------
const DetailRightOutLine = styled.div`
	position: relative;
`;

const DetailRightBannerInner = styled.div`
	overflow: hidden;
	border-radius: 10px;
	position: relative;
`;

const DetailRightFormOutLine = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #ffffff;
	margin-top: 80px;
`;

const DetailRightFormLayout = styled.form`
	margin-top: 8.4%;

	padding-top: 30px;
	padding-left: 20px;
	padding-right: 20px;
	padding-bottom: 30px;
`;

const DetailRightFormUpperInner = styled.div`
	display: flex;
	justify-content: space-between;
`;

const DetailRightFromUpperButtons = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	width: 442px;
	margin-bottom: 10px;
`;

const DetailRightReviewsOutline = styled.div`
	margin-top: 20px;
	background-color: #ffffff;
`;

const DetailRightReviewOutline = styled.div`
	padding-top: 22px;
	padding-left: 20px;
	padding-right: 20px;
	padding-bottom: 30px;
	display: flex;
	flex-direction: column;
	border-bottom: 3px solid #eee;
`;

const ReviewUpperLayout = styled.div<Partial<Type.Styled>>`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const ReviewUserInner = styled.div`
	display: flex;
	/* justify-content: space-between; */
	align-items: center;
	width: 302.5px;
	gap: 20px;
`;

const ReviewMenuInner = styled.div`
	display: flex;

	p {
		font-size: 16px;
		margin-left: 10px;
		color: #828295;
	}
`;

const ReviewUserName = styled.div`
	display: flex;
	max-width: 74px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	line-height: 1.25;
	letter-spacing: -0.18px;
	text-align: left;
	flex: 1;
`;

const ReviewStarContainer = styled.div`
	display: flex;
	align-items: center;
	margin-right: 5px;
`;

const ReviewStar = styled.div`
	color: #4c4cff;
`;
const ReviewScore = styled.div`
	line-height: 20px;
	height: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

const ReviewImageInner = styled.div`
	margin-top: 22px;
	display: flex;
	flex-direction: row;
	gap: 10px;
`;

const ReviewContentsLayout = styled.div`
	padding-left: 93px;
`;

const ReviewImageWrapper = styled.div`
	border: 1px solid #c7c7cb;
	width: 101px;
	height: 101px;
	border-radius: 4px;
	overflow: hidden;
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

const ReviewContentsTextItem = styled.div`
	margin-top: 22px;
	padding-right: 219px;
`;

const ReviewFromUserName = styled.div`
	display: flex;
	color: #555555;
	flex: 1;
`;

const ReviewFormReviewInputInner = styled.div`
	padding-left: 100px;
	margin-bottom: 10px;
`;

const ReviewFormReviewInput = styled.textarea`
	border: solid 1px #c7c7cb;
	width: 812px;
	height: 100px;
	padding: 20px 70px 20px 23px;
	background-color: #f3f3f8;
	font-size: 16px;
`;

const ReviewUploadImageButton = styled.label`
	${Flex}
	padding-left: 10px
`;

const ReviewPreviewImageLayout = styled.div`
	display: flex;
	flex-direction: row;
`;

const ReviewPreviewImageInner = styled.div`
	padding-left: 100px;
	display: flex;
	flex-direction: row;
	gap: 10px;
`;
const ReviewPreviewImageItem = styled.img`
	width: 101px;
	height: 101px;
	flex-grow: 0;
	border-radius: 4px;
	border: solid 1px #c7c7cb;
	background-color: #f3f3f8;
`;

const DetailScoreDiv = styled.div<Partial<Type.Styled>>`
	${Flex}
	height: 70px;
	background-color: ${({ $bgColor, theme }) => $bgColor && theme.color[$bgColor]};
	border: 1px solid ${({ $bColor, theme }) => $bColor && theme.color[$bColor]};
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
	DetailLeftOutLine,
	DetailInfoLayout,
	DetailInfoInner,
	ReviewCountTitleLayout,
	ReviewCountTitleItem,
	ReviewScoreInner,
	ReviewScoreItem,
	ReviewStarItem,
	DetailScoreDiv,

	// Review
	DetailRightOutLine,
	DetailRightBannerInner,
	DetailRightFormOutLine,
	DetailRightFormLayout,
	DetailRightFormUpperInner,
	DetailRightFromUpperButtons,
	DetailRightReviewsOutline,
	DetailRightReviewOutline,
	RightReviewOutline,
	ReviewUpperLayout,
	ReviewUserInner,
	ReviewMenuInner,
	ReviewUserName,
	ReviewContentsLayout,
	ReviewContentsTextItem,
	ReviewStarContainer,
	ReviewStar,
	ReviewScore,
	ReviewImageInner,
	ReviewImageWrapper,
	ReviewRevisit,
	ReviewCommentImg,
	ReviewFromUserName,
	ReviewFormReviewInputInner,
	ReviewFormReviewInput,
	ReviewUploadImageButton,
	ReviewPreviewImageLayout,
	ReviewPreviewImageInner,
	ReviewPreviewImageItem,
};
