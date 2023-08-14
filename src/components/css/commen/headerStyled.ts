import { css, styled } from "styled-components";
import { Styled } from "../../../types";
import { Flex } from "../GlobalStyled";

const HeaderOutLine = styled.header<Partial<Styled>>`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.15s linear;
  width: 100%;

  ${({ $scrolly }) => $scrolly && (
    $scrolly.isTop && !$scrolly.preScrolly
      ? css`
          top: 0;
          background-color: ${({ theme }) => theme.color.blackM}
        `
      : !$scrolly.isTop && $scrolly.preScrolly && $scrolly.scrolly <= $scrolly.innerHeight
        ? css`
            top: 0;
            background-color: ${({ theme }) => theme.color.blackM}
          `
        : !$scrolly.isTop && $scrolly.preScrolly && $scrolly.scrolly > $scrolly.innerHeight
          ? css`
            top: 0;
            background-color: ${({ theme }) => theme.color.white}
            `
          : css`
            top: -90px;
          `
    )
  }
`

const HeaderLayout = styled.div<Partial<Styled>>`
  ${Flex}
  height: ${({ theme }) => theme.headerHeight};
  width: 1440px;
  margin: 0 auto;
  border: 1px solid blue;
  transition: all 0.15s linear;

  ${({ $scrolly, theme }) => $scrolly && (
    $scrolly.isTop && !$scrolly.preScrolly
      ? theme.headerType.Top
      : !$scrolly.isTop && $scrolly.preScrolly && $scrolly.scrolly <= $scrolly.innerHeight
        ? theme.headerType.Top
        : !$scrolly.isTop && $scrolly.preScrolly && theme.headerType.else
  )
  }
`
export { HeaderOutLine, HeaderLayout }