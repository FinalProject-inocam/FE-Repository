import { styled } from "styled-components";

const PageContainer = styled.div`
	margin: 0 auto;
`;

const WrappingShopMap = styled.div`
	height: 400px;
	background-color: orange;
	position: relative;
`;

const BannerContainer = styled.div``;

const BannerWrapper = styled.div`
	display: flex;
`;

const MainBanner = styled.img`
	width: 466px;
	height: 333px;
`;

const SubBanner = styled.img`
	width: 222px;
	height: 159px;
`;

const PageOnSideContainer = styled.div`
	display: flex;
	background-color: #efefef;
`;

const PageOnSideWrapper = styled.div`
	display: flex;
	margin: 0 auto;
	padding: 0;
	gap: 20px;
	/* min-height: 100vh; */
`;

const LeftOnSide = styled.div`
	width: 466px;
	height: 800px;
	background-color: red;
	margin: 0;
	padding: 0;
`;

const LeftContentWrapper = styled.div`
	height: 100%;
`;

const RightOnSide = styled.div`
	width: 710px;
	height: 800px;
	background-color: blue;
	margin: 0;
	padding: 0;
`;

const RightContentWrapper = styled.div`
	height: 100%;
	overflow-y: scroll;
`;

export {
	// 페이지
	PageContainer,
	WrappingShopMap,

	// Banner
	BannerContainer,
	BannerWrapper,
	MainBanner,
	SubBanner,

	// Info
	PageOnSideContainer,
	PageOnSideWrapper,
	LeftOnSide,
	LeftContentWrapper,
	RightOnSide,
	RightContentWrapper,
};
