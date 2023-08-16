import { css } from "styled-components";

const PretendardL = css`
  font-family: 'Pretendard-Light';
`
const PretendardR = css`
  font-family: 'Pretendard-Regular';
`
const PretendardM = css`
  font-family: 'Pretendard-Medium';
`
const PretendardSB = css`
  font-family: 'Pretendard-SemiBold';
`
const PretendardB = css`
  font-family: 'Pretendard-Bold';
`

const PretendardEB = css`
  font-family: 'Pretendard-ExtraBold';
`

const color = {
  blackM: "#0E0D13",
  darkBlue:"#151565",
  darkGray:"#26252B",
  green: "#539B39",
  white: "white"
}

/* About theme ---------------------------------------------- */

export const theme = {
  headerHeight: {
    desktop : "90px",
    mobile : "70px"
  },
  color,
  font: {
    PretendardL,
    PretendardR,
    PretendardM,
    PretendardSB,
    PretendardB,
    PretendardEB
  },

  fontStyleGuide: {
    caption: css`
      ${PretendardL};
      font-size: 12px;
    `,
    body: css`
      ${PretendardR};
      font-size: 18px;
    `,
    headline: css`
    ${PretendardSB};
    font-size: 20px;
    `
  },

  headerType: {
    Top: css`
      background-color: ${color.blackM};
      color : ${color.white};
      h1, div, li {
        color : ${color.white}
      }
    `,
    else: css`
    background-color:${color.white};
    color : ${color.blackM};
    h1, div, li {
        color : ${color.blackM}
      }
    `
  }

}