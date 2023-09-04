import { styled } from "styled-components";
import { Styled } from "../../../types";
import * as SC from "../GlobalStyled";

const SectionFlex = styled.section<Partial<Styled>>`
	${SC.Flex}
	width: 100%;
	height: 650px;
	overflow: hidden;
	position: relative;
	background-color: ${({ $bColor, theme }) => theme.color[`${$bColor}`]};
`;

const SectionContent = styled.div`
	${SC.Flex}
	transform: translateY(20%);
	flex-direction: column;
	gap: 20px;
	position: absolute;
	bottom: 8vh;
	transition: all 0.15s linear;
	z-index: 10;
`;

const CustomPSize = styled.p<Partial<Styled>>`
	color: white;
	font-size: ${({ $size }) => `${$size}rem`};
	color: ${({ $color, theme }) => theme.color[`${$color}`]};
	${({ $font, theme }) => theme.font[`${$font}`]};
	@media (min-width: 1280px) {
		font-size: ${({ $mSize }) => `${$mSize}vw`};
	}
`;

const SectionMoreBTN = styled.div`
	${SC.cursor}
	width: 150px;
	height: 35px;
	line-height: 35px;
	font-size: 0.875rem;
	text-align: center;
	border: 1px solid white;
	color: white;
	margin-top: 20px;

	@media (min-width: 1280px) {
		width: 11.718vw;
		height: 2.734vw;
		line-height: 2.734vw;
		font-size: 1.093vw;
	}
`;

const SectionOneVideo = styled.video`
	position: absolute;
	z-index: -1;
	width: 2400px;
	top: 0;
	@media (min-width: 2400px) {
		width: 100%;
	}
`;

const SectionInner = styled.article<Partial<Styled>>`
	position: relative;
	${SC.Flex}
	/* background-color: rgba(150,150,150,0.3); */
  max-width: 1440px;
	width: 100%;
	height: 100%;
	border: 1px double dotted;
`;

const Triangle = styled.div<Partial<Styled>>`
	position: absolute;
	bottom: 0;
	width: 0;
	height: 0;
	border-left: 100vw solid transparent;
	border-right: 0 solid transparent;
	border-bottom: 100px solid ${({ $bColor, theme }) => theme.color[`${$bColor}`]};
`;

const SectionFourCard = styled.div<Partial<Styled>>`
	width: 100%;
	height: ${({ $height }) => $height};
	background-color: #ffffff;
	overflow: hidden;
	border-radius: ${({ $borderR }) => $borderR};
`;

const SectionFourCardImg = styled.img<Partial<Styled>>`
	display: block;
	width: 100%;
	height: ${({ $height }) => $height};
	background-color: #d9d9d9;
`;

const SectionFourCardInner = styled.div`
	padding: 21px;
	height: 100%;
`;

export {
	// Home Section - Commen
	SectionFlex,
	SectionContent,
	CustomPSize,
	SectionMoreBTN,
	SectionOneVideo,
	SectionInner,
	Triangle,

	// Home SectionFour
	SectionFourCard,
	SectionFourCardImg,
	SectionFourCardInner,
};
