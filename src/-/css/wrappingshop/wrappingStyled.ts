import { styled } from "styled-components";
import { Flex, Grid, theme } from "..";
import * as Type from "../../../types";

// Wrapping
const Section = styled.div<Partial<Type.Styled>>`
	${Grid}
	overflow: hidden;
	width: 100%;
	height: 100vh;
`;

const KakaoMap = styled.div`
	width: 100%;
	min-height: 650px;
`;

const KakaoMapFigure = styled.figure`
	width: 100%;
	position: relative;
`;

// WrappingContent
const ContentArea = styled.section<Partial<Type.Styled>>`
	${Flex}
	padding-top: 90px;
	width: 100%;
	background-color: ${theme.color.white};
	z-index: 50;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const ContentLayout = styled.div<Partial<Type.Styled>>`
	${Flex}
	width: 345px;
	/* gap: 50px; */
`;

const WrappingTitle = styled.div`
	${({ theme }) => theme.font.PretendardM};
	${({ theme }) => theme.color.blackM};
	font-size: 40px;
	font-weight: 500;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.25;
	letter-spacing: -0.48px;
	text-align: left;
	color: #000;
	//size, weight 추후 수정
`;

const WrappingSearchBox = styled.div<Partial<Type.Styled>>`
	${Flex}
	background-color: white;
	border: 1px solid rgb(18, 0, 125);
	border-radius: 5px; // 이것도 일단 해놓음...
	height: 50px;
	width: 100%;
	padding: 0px 20px;
	box-sizing: border-box;
`;

const WrappingSearchInput = styled.input<Partial<Type.Styled>>`
	${Flex}
	${({ theme }) => theme.font.PretendardR}
	font-size: 16px;
	width: 100%;
	border: none;
	outline: none;
`;

const SearchIcon = styled.img`
	width: 30px;
	height: 30px;
`;

// 인기순, 거리순
const WrappingSort = styled.div`
	display: flex;
	width: 100%;
	height: 42px;
	padding-bottom: 20px;
`;

const WrappingSortItem = styled.div`
	${Flex}
	width: 63px;
	height: 100%;
`;

const WrappingSortList = styled.div`
	width: 350px;
	height: 571.5px;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-thumb {
		height: 30%;
		background: ${({ theme }) => theme.color.blackM};
		border-radius: 10px;
	}

	&::-webkit-scrollbar-track {
		background: rgba(33, 122, 244, 0.1);
	}

	@media (min-height: 1050px) {
		height: 714.5px;
	}
`;

const ShopName = styled.div`
	font-size: 18px;
	font-weight: 600;
	line-height: 1.5;
	letter-spacing: -0.2px;
	text-align: left;
	${({ theme }) => theme.color.textColor2}
`;

const ShopAdr = styled.div`
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.5;
	letter-spacing: -0.18px;
	text-align: left;
	color: #828295;
`;

const ShopOpeningHours = styled.span`
	line-height: 1.5;
	letter-spacing: -0.18px;
	text-align: left;
	font-weight: 600;
	${({ theme }) => theme.color.textColor2}
`;

const ShopBoxLayout = styled.div<Partial<Type.Styled>>`
	${Flex}
	width: 100%;
	padding: 15px;
	border: 1px solid ${({ theme }) => theme.color.lightblue2};
`;

export {
	// Wrapping
	Section,
	KakaoMapFigure,
	KakaoMap,

	// WrappingContent
	ContentArea,
	ContentLayout,
	WrappingTitle,
	WrappingSearchBox,
	WrappingSearchInput,
	SearchIcon,
	WrappingSort,
	WrappingSortItem,
	WrappingSortList,
	ShopName,
	ShopAdr,
	ShopOpeningHours,

	// ShopBox
	ShopBoxLayout,
};
