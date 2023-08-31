import * as sc from "styled-components";
import { Styled } from "../../types";
// -D @types/styled-components

/* About createGlobalStyle ---------------------------------------------- */
export const GlobalStyled = sc.createGlobalStyle`
  // 글꼴은 여기에 입력해주세요.

  // 전역 스타일링 리셋 CSS
  html, body, div, span,
  h1, h2, h3, h4, h5, h6,
  p, a, img, ol, ul, li, fieldset,
  form, label, legend, article,figure,
  input,textarea,
  figcaption, footer, header,nav, section {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    text-decoration: none;
    font-size: 16px;
    color: rgb(29, 29, 31);
    word-break: break-word;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear {
  display: none;
}

  body {
    width: 100%;
    height: 100%;
    position:relative;

    // 전역글꼴 적용
    ${({ theme }) => theme.font.PretendardL}

  }
`;

/* About css styled ---------------------------------------------- */
const Flex = sc.css<Partial<Styled>>`
  display: flex;
  flex-direction: ${({ $fd }) => ($fd ? $fd : "row")};
  justify-content: ${({ $jc }) => ($jc ? $jc : "center")};
  align-items: ${({ $ai }) => ($ai ? $ai : "center")};
  gap: ${({ $gap }) => ($gap ? `${$gap}px` : "none")};
`;

const Grid = sc.css<Partial<Styled>>`
  display: grid;
  grid-template-columns: ${({ $gtc }) => ($gtc ? $gtc : "repeat(2, 1fr)")};
  // repeat(7, 1fr) || repeat(auto-fill, minmax(20%, auto));
  grid-template-rows: ${({ $gtr }) => ($gtr ? $gtr : "none")};
  // 구체적인 row를 알고 있을 때 // auto || repeat(3, minmax(100px, auto));
  grid-auto-rows: ${({ $gar }) => ($gar ? $gar : "none")};
  // 구체적인 row를 모를 때 // //minmax(100px, auto);
  gap: ${({ $gap }) => ($gap ? `${$gap}px` : "none")};
  column-gap: ${({ $cgap }) => ($cgap ? `${$cgap}px` : "none")};
  row-gap: ${({ $rgap }) => ($rgap ? `${$rgap}px` : "none")};
`;

const cursor = sc.css`
  cursor: pointer;
`;

/* About Div styled ---------------------------------------------- */
const FlexBox = sc.styled.div<Partial<Styled>>`
  ${Flex}
`;

const GridBox = sc.styled.div<Partial<Styled>>`
  ${Grid}
  width:100%;
  background-color:${({ $color }) => $color};
`;

const GridMergedSpace = sc.styled.div<Partial<Styled>>`
  grid-column-start: ${({ $mergedgcs }) => ($mergedgcs ? $mergedgcs : "auto")};
  grid-column-end: ${({ $mergedgce }) => ($mergedgce ? $mergedgce : "auto")}; // span 2;
  grid-row-start: ${({ $mergedgrs }) => ($mergedgrs ? $mergedgrs : "auto")};
  grid-row-end: ${({ $mergedgre }) => ($mergedgre ? $mergedgre : "auto")}; // span 3;
`;

const GridMergedSpaceFlex = sc.styled(GridMergedSpace)`
  ${Flex}
`;

const Figure = sc.styled.figure<Partial<Styled>>`
  ${Flex}
  position: ${({ $position }) => ($position ? $position : "relative")};
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};

  img {
    display: block;
    width: 100%;
  }

  ${({$types}) => $types === "innocar" && sc.css`
    transition: all 0.3m linear;

    @media (max-width: 1100px) {
      transform: rotate(90deg);
      img {
        width: 80%;
      }
    }
  `}
`;

const FigureObjectFit = sc.styled.figure<Partial<Styled>>`
  position: relative;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};

  ${({ $types }) =>
    $types === "reviewBanner" ?
    sc.css`
      z-index:2;
      height : 159px;
      overflow : hidden;
      border-radius : 10px;
    `
    : $types === "postInnerImg" && sc.css`
      overflow : hidden;
      height: 11.18vw;
      border-radius : 10px;

      @media (min-width: 1440px) {
        height: 161px;
      }
    `
  }

    ${({ $types }) =>
    $types === "prevImage" ?
    sc.css`
      overflow : hidden;
      border-radius : 4px;
    `
    : $types === "communityNewCar" && sc.css`
      overflow : hidden;
      border-radius : 10px;
    `}

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const RouterLayout = sc.styled.div<Partial<Styled>>`
  ${Flex};
`;

const CustomH1 = sc.styled.h1<Partial<Styled>>`
	font-size: ${({ $size }) => $size ? `${$size}rem` : "1.25rem"};
	font-weight: bold;
  line-height: ${({$height}) => $height};
  color : ${({ $color, theme }) => $color && theme.color[$color]};

  ${({$types}) => $types === "bottomLine" && sc.css`
      width: 100%;
      text-align: center;
      border-bottom: 1px solid ${({theme}) => theme.color.blackM};
  `}
`;

const CustomH2 = sc.styled.div`
	font-size: 1rem;
	color: #999999;
`;

const CustomH3 = sc.styled.h3<Partial<Styled>>`

	font-size: ${({ $size }) => $size ? `${$size}rem` : "1rem"};
  font-weight: 500;
  color : ${({ $color, theme }) => $color && theme.color[$color]};

  ${({ $types }) =>
    $types === "revisit" &&
    sc.css`
      width: 105px;
      height: 36px;
      line-height: 36px;
   `}

  ${({ $types }) =>
		$types === "nickname" &&
		sc.css`
    width: 105px;
    line-height: 22px;
`}
`;

const CustomBtn = sc.styled.div<Partial<Styled>>`
  ${({ theme }) => theme.btnSize.primary}
  ${cursor}
  color : ${({ $color }) => $color};
  border-radius : ${({ $borderR }) => $borderR};
  border: 1px solid ${({ $bColor }) => $bColor};
  ${({ $bColor, theme }) =>
    $bColor === "blue"
      ? sc.css`
      background-color: ${theme.color[$bColor]};
      color:${theme.color.white};
    `
      : null}

  ${({ $types }) =>
    $types === "reviewForm"
      ? sc.css`
      position:absolute;
      top: 0;
      right:0;
    `
      : null}
`;

const PositionRelavite = sc.styled.div<Partial<Styled>>`
  position: relative;

  ${({$types}) => $types === "cursor" && sc.css`${cursor}`}
`

export {
  Flex,
  Grid,
  cursor,
  FlexBox,
  GridBox,
  GridMergedSpace,
  GridMergedSpaceFlex,
  Figure,
  FigureObjectFit,
  RouterLayout,
  CustomH1,
  CustomH2,
  CustomH3,
  CustomBtn,
  PositionRelavite
};
