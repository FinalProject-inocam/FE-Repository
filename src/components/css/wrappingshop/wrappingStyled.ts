import { styled } from "styled-components";
import { Flex, Grid, theme } from "../../css";
import * as Type from "../../../types";

const Section = styled.div<Partial<Type.Styled>>`
	${Grid}
	overflow: hidden;
	width: 100%;
	height: 100%;
`;

const KakaoMap = styled.div<Partial<Type.Styled>>`
	width: 100%;
	min-height: 650px;
`;

const KakaoMapFigure = styled.figure`
	width: 100%;

	position: relative;
`;

//하얀색, 전체
const ContentArea = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	background-color: ${theme.color.white};
	z-index: 50;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

//컨텐트가 들어가는 부분
const ContentLayout = styled.div`
	margin-top: 140px;
	width: 345px;
	display: flex;
	flex-direction: column;
	gap: 50px;
	background-color: skyblue;
`;

const WrappingTitle = styled.div`
	${({ theme }) => theme.font.PretendardM}
	${({ theme }) => theme.color.blackM}
	text-align: text;
	font-size: 37px;
	font-weight: 500;
	background-color: pink;
	//size, weight 추후 수정
`;

const WrappingSearchBox = styled.div`
	background-color: white;
	border: 1px solid rgb(18, 0, 125);
	border-radius: 5px; // 이것도 일단 해놓음...
	height: 50px;
	width: 100%;
	padding: 0px 20px;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const WrappingSearchInput = styled.input`
	${({ theme }) => theme.font.PretendardR}
	font-size: 16px;
	display: flex;
	align-items: center;
	width: 100%;
	border: none;
	outline: none;
`;

const SearchIcon = styled.div`
	width: 30px;
	height: 30px;
`;

//리스트
const ShopInfo = styled.div`
	display: flex;
	flex-direction: row;
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
	width: 100%;
	height: 600px;
	overflow: auto;
`;

export {
	Section,
	KakaoMap,
	KakaoMapFigure,
	ContentArea,
	ContentLayout,
	WrappingTitle,
	WrappingSearchBox,
	WrappingSearchInput,
	SearchIcon,
	ShopInfo,
	WrappingSort,
	WrappingSortItem,
	WrappingSortList,
};
