import { styled } from "styled-components"
import { Styled } from "../../../types"
import { CustomH1, Flex } from "../GlobalStyled"

const ExitBtn = styled.div`
  position:absolute;
  top:20px;
  right:20px;
  width: 50px;
  height: 50px;
  background-color: rgb(213, 0, 28);
  box-shadow: rgba(0, 0, 0, 0.2) 5px 5px 5px -2.5px;
`
const ExitLine = styled.div<Partial<Styled>>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) ${({ $rotate }) => $rotate && `rotate(${$rotate}deg)`};
  width: 50%;
  background-color: white;
  border: 1px solid white;
`

const Artical = styled.article<Partial<Styled>>`
  ${Flex}
  width: 100%;
  height: ${({ $height }) => $height ? $height : "180px"};
  padding: 0 50px;
  background-color: ${({ $bColor, theme }) => $bColor ? theme.color[`${$bColor}`] : "rgb(239, 240, 241)"};
`

const InnoCarImgFlex = styled.div<Partial<Styled>>`
  ${Flex}
  width: 100%;
  position: relative;
  padding-top: 150px;
  padding-bottom: 50px;
  transition: all 0.3s linear;

  @media (max-width: 1100px) {
    padding-top: 50px;
  }
`

const InnoCarImgInnerText = styled.div<Partial<Styled>>`
  position: absolute; 
  display : ${({ $types }) => $types === "Mobile" && "none"};
  top:  ${({ $top }) => $top && `${$top}px`}; 
  left: ${({ $left }) => $left && `${$left}px`}; 
  right:${({ $right }) => $right && `${$right}px`}; 
  transition : all 0.3s linear;

  @media (max-width: 1100px) {
    text-align : ${({ $tAlign }) => $tAlign};
    display : ${({ $types }) => $types === "DesckTop" ? "none" : $types === "Mobile" && "block"};  
    top: ${({ $Mtop }) => $Mtop && `${$Mtop}px`}; 
    left: ${({ $Mleft }) => $Mleft && `${$Mleft}px`};  /* 변경된 부분 */
    right: ${({ $Mright }) => $Mright && `${$Mright}px`}; /* 변경된 부분 */
  }
`

const Section3Video = styled.video`
	position: absolute;
	z-index: -1;
	top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const Section3ScrollDiv = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;
  opacity: 0;
  transition: all 0.4s linear;
`

const Sections3ScrollInnerFlex = styled.div<Partial<Styled>>`
  ${Flex}
  display: none;
  position: absolute;
  z-index: 10;
  bottom: -70px;
  width: 90%;
  transition: all 0.3s linear;
`

const Sections3ScrollGridInner = styled.div`
  word-break: keep-all;
  border-left: 2px solid white;
  padding-left: 10px;
  padding-right: 20px;
  font-size: 1.75rem;
  color:white;

  @media (max-width: 1024px) {
    font-size: 1.25rem;
  }
`

const Section1ModalLayout = styled.div`
  position: absolute;
  display: none;
  width: 100%;
  top: 110vh;
  transition: all 0.4s linear;
  z-index: 2000;
`

const CusTomModalH1 = styled(CustomH1)`
  border-bottom: 2px solid lightgray;
  height: 3rem;
`

export {
  ExitBtn,
  ExitLine,
  Artical,
  InnoCarImgFlex,
  InnoCarImgInnerText,
  Section3Video,
  Section3ScrollDiv,
  Sections3ScrollInnerFlex,
  Sections3ScrollGridInner,
  Section1ModalLayout,
  CusTomModalH1,
}