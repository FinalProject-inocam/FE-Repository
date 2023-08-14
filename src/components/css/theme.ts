import { css } from "styled-components";

const PretendardEL = css`
  font-family: 'Pretendard-ExtraLight';
  font-weight: 100;
`
const PretendardL = css`
  font-family: 'Pretendard-Light';
  font-weight: 200;
`
const PretendardR = css`
  font-family: 'Pretendard-Regular';
  font-weight: 400;
`
const PretendardM = css`
  font-family: 'Pretendard-Medium';
  font-weight: 400;
`
const PretendardSB = css`
  font-family: 'Pretendard-SemiBold';
  font-weight: 400;
`
const PretendardB = css`
  font-family: 'Pretendard-Bold';
  font-weight: 400;
`

const color = {
  blackM: "#0E0D13",
  green: "#539B39",
  white: "#fff"
}

/* About theme ---------------------------------------------- */

export const theme = {
  headerHeight: "90px",
  color,
  font: {
    PretendardEL,
    PretendardL,
    PretendardR,
    PretendardM,
    PretendardSB,
    PretendardB
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
      div{
        color : ${color.white}
      }
    `,
    else: css`
    background-color: ${color.white};
    color : ${color.blackM};
    div{
        color : ${color.blackM}
      }
    `
  }

}