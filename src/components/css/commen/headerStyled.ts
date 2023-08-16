import { css, styled } from "styled-components";
import { Styled } from "../../../types";
import * as SC from "../GlobalStyled";

/* / 01 SplashScreen 관련 스타일 / -------------------------------------------------------- */
const SplashScreen = styled.figure<Partial<Styled>>`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100vh;
	opacity: 1;
	background-color: white;
	transition: all 1s linear;
	z-index: 1000;

	img {
		width: 100%;
		display: block;
		margin: 0 auto;
	}
`;

/* / 02 HeaderOutLine 관련 스타일 / -------------------------------------------------------- */
const HeaderOutLine = styled.header<Partial<Styled>>`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.15s linear;
  width: 100vw;
  z-index: 1000;

${({ $scrolly, theme }) => $scrolly !== undefined && ($scrolly.isTop
    ? css`
          top: 0;
          background-color: ${theme.color.blackM};
        `
    : !$scrolly.isTop && !$scrolly.preScrolly && $scrolly.scrolly <= $scrolly.innerHeight
      ? css`
        top: -90px;
        background-color: ${theme.color.blackM};
      `
      : !$scrolly.isTop && !$scrolly.preScrolly && $scrolly.scrolly > $scrolly.innerHeight
        ? css`
          top: -90px;
          background-color: ${theme.color.white};`
        : !$scrolly.isTop && $scrolly.preScrolly && $scrolly.scrolly <= $scrolly.innerHeight
          ? css`
            top: 0;
            background-color: ${theme.color.blackM};
          `
          : css`
            top: 0;
            background-color: ${theme.color.white};
          `)
  }


  @media (max-width: 1024px) {
    top: 0;
    ${({ $scrolly, theme }) =>
    // 스크롤 값이 있으면서,
    // 1) isTop 이거나 $scrolly.preScrolly 값이 변경되었는데  $scrolly.innerHeight 같거나 작거나 
    $scrolly !== undefined && ($scrolly.isTop || $scrolly.scrolly <= $scrolly.innerHeight)
      ? css`    
          background-color: ${theme.color.blackM};
        `
      : css`
            background-color: ${theme.color.white};
            `
  }
  }
`

const HeaderLayout = styled.div<Partial<Styled>>`
	${SC.Flex}
	height: ${({ theme }) => theme.headerHeight.desktop};
	max-width: 1440px;
	margin: 0 auto;
	border: 1px solid blue;
	transition: all 0.15s linear;

	${({ $scrolly, theme }) =>
		$scrolly !== undefined && ($scrolly.isTop || $scrolly.scrolly <= $scrolly.innerHeight)
			? theme.headerType.Top
			: theme.headerType.else}

	@media (max-width: 1024px) {
		justify-content: space-between;
		padding: 0 30px;
		height: ${({ theme }) => theme.headerHeight.mobile};
	}
`;

const HeaderLogo = styled.h1`
	${SC.cursor}
	font-size: 35px;

	@media (min-width: 1024px) {
		font-size: 50px;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
`;

const HandagerBTN = styled.div`
	${SC.cursor}
	font-size: 35px;
	@media (min-width: 1024px) {
		display: none;
	}
`;

/* / 03 MoblieSiderbar 관련 스타일 / -------------------------------------------------------- */
const MSideBar = styled.div<Partial<Styled>>`
	position: fixed;
	top: 70px;
	right: ${({ $state }) => ($state ? "0" : "-100vw")};
	transition: all 0.25s linear;
	width: 100%;
	height: 100vh;
	background-color: rgba(29, 27, 34, 0.8);
	padding: 30px 0;
	backdrop-filter: blur(3px);
	@media (min-width: 1024px) {
		display: none;
	}
`;

const RoutesArea = styled.div`
	width: 100%;
	padding: 0 30px;
`;

const AuthArea = styled.div`
	margin-top: 47px;
	width: 100%;
`;

const AuthAreaNav = styled.div<Partial<Styled>>`
	${SC.Flex}
	${SC.cursor}
  justify-content: space-between;
	padding: 0 30px;
	width: 100%;
	height: ${({ theme }) => theme.headerHeight.mobile};
	background-color: ${({ $color }) => $color};

	p {
		color: #ffffff;
	}
`;

const MSideNav = styled.p`
	${SC.Flex}
	${SC.cursor}
  justify-content: flex-start;
	font-size: 1rem;
	color: white;
	width: 100%;
	height: ${({ theme }) => theme.headerHeight.mobile};
	border-bottom: 1px solid white;
`;

const FooterArea = styled.footer`
	padding-top: 50px;
	height: 100%;
	background-color: #1d1b22;
`;

const FooterP = styled.p`
	color: white;
	font-size: 0.75rem;
`;

const CopyRigte = styled(FooterP)`
	${SC.Flex}
	margin-top: 10px;
`;

const DeskTopNav = styled.div`
	${SC.Flex}
	justify-content: space-between;
	width: 100%;

	@media (max-width: 1024px) {
		display: none;
	}
`;

const CustomUl = styled.ul`
	${SC.Flex}
	gap : 20px;
`;

const CustomLi = styled.li`
	${SC.Flex}
	${SC.cursor}
  list-style-type: none;
	height: ${({ theme }) => theme.headerHeight.desktop};
`;

export {
	// SplashScreen 사이드바
	SplashScreen,

	// HeaderOutLine 사이드바
	HeaderOutLine,
	HeaderLayout,
	HeaderLogo,
	HandagerBTN,

	// Mobile 사이드바
	MSideBar,
	RoutesArea,
	AuthArea,
	AuthAreaNav,
	MSideNav,
	FooterArea,
	FooterP,
	CopyRigte,

	// DeskTop 네이게이션 관련
	DeskTopNav,
	CustomUl,
	CustomLi,
};
