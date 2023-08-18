import { css, styled } from "styled-components";
import * as Type from "../../../types";
import { Flex, Grid } from "../GlobalStyled";

// 페이지 --------------------------------
const DetailOutline = styled.div<Partial<Type.Styled>>`
	${Flex}
	margin: 0 auto;
	height: 100vh;
	background-color: #efefef;
`;

// Map ------------------------------------
const DetailKakaoMaps = styled.div`
	width: 100%;
	padding-top: ${({ theme }) => theme.headerHeight.desktop};
	min-height: 490px;

	section {
		width: 100%;
		height: 100%;
	}
`;

// DetailContent ------------------------------------
const DetailContent = styled.section<Partial<Type.Styled>>`
	${Grid}
	max-width: 1440px;
	width: 100%;
	height: 100%;
	margin: 0 auto;
	padding: 0 72px;
	border: 1px dotted red;
	// overflow: auto;
`;

// Banner --------------------------------
const BannerContainer = styled.div`
	display: flex;
`;

const BannerItem = styled.div<Partial<Type.Styled>>`
	border-radius: 10px;
	overflow: hidden;
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
		/* box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px, rgb(0 0 0 / 72%) 0px 30px 22px -10px; */
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
	width: 100%;
	transform: translateY(-50%);
	z-index: 20;
`;

const MoreButton = styled.button`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	background-size: cover;
	width: 100px;
	height: 50px;
	border: none;
	cursor: pointer;
`;

// Info --------------------------------
const LeftOnSide = styled.div`
	width: 466px;
	height: 800px;
	transform: translateY(-10%);
	margin: 0;
	padding: 0;
	z-index: 9;
`;

const WrappInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
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

const WrappingShopName = styled.div`
	font-size: 1.25rem;
	font-weight: bold;
`;

const WrappingShopAddress = styled.div`
	font-size: 1rem;
	color: #999999;
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

const RightContentWrapper = styled.div`
	height: 100%;
	overflow-y: scroll;
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
	margin-bottom: 4.4rem;
`;

const ReviewUpperContainer = styled.div<Partial<Type.Styled>>`
	display: flex;
	justify-content: space-between;
`;

const ReviewUserWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const ReviewMenueWrapper = styled.div`
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

const ReviewContents = styled.div``;

const ReviewSimpleImage = styled.div`
	border: 1px solid black;
	width: 6.3rem;
	height: 6.3rem;
`;

const ReviewRevisit = styled.div`
	color: #4c4cff;
`;

const ReviewCommentimg = styled.img`
	width: 100%;
	height: 100%;
`;

export {
	// 페이지
	DetailOutline,

	//Map
	DetailKakaoMaps,

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
	LeftOnSide,
	WrappInfo,
	LeftContentWrapper,
	WrappingShopScore,
	WrappingShopName,
	WrappingShopAddress,

	// Review
	RightOnSide,
	RightContentWrapper,
	ReviewBox,
	ReviewUpperContainer,
	ReviewUserWrapper,
	ReviewMenueWrapper,
	ReviewUserName,
	ReviewStar,
	ReviewScore,
	ReviewContents,
	ReviewSimpleImage,
	ReviewRevisit,
	ReviewCommentimg,
};
