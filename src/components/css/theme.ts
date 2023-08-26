import { css } from "styled-components";

const PretendardL = css`
	font-family: "Pretendard-Light";
`;
const PretendardR = css`
	font-family: "Pretendard-Regular";
`;
const PretendardM = css`
	font-family: "Pretendard-Medium";
`;
const PretendardSB = css`
	font-family: "Pretendard-SemiBold";
`;
const PretendardB = css`
	font-family: "Pretendard-Bold";
`;

const PretendardEB = css`
	font-family: "Pretendard-ExtraBold";
`;

const color = {

	blackM: "#0E0D13",
	blue: "#4c4cff",
	lightblue: "#f2f2ff",
	lightgray1: "#f3f3f8",
	lightgray2: "#828293",
	red: "#F2757A",
	red2: "#FF162D",
	green: "#539B39",
	orange: "#FA8128",
	purple: "#362783",
	white: "white",
	darkBlue: "#151565",
	gray: "#eeee",
	darkGray: "#26252B",
};


/* About theme ---------------------------------------------- */

export const theme = {
	headerHeight: {
		desktop: "90px",
		mobile: "70px",
	},
	color,
	font: {
		PretendardL,
		PretendardR,
		PretendardM,
		PretendardSB,
		PretendardB,
		PretendardEB,
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
		`,
	},

	headerType: {
		Top: css`
			background-color: ${color.blackM};
			color: ${color.white};
			h1,
			div,
			li {
				color: ${color.white};
			}
		`,
		else: css`
			background-color: ${color.white};
			color: ${color.blackM};
			h1,
			div,
			li {
				color: ${color.blackM};
			}
		`,
	},
	btnSize: {
		primary: css`
			width: 118px;
			height: 36px;
			line-height: 36px;
			text-align: center;
		`,
		medium: css``,
		large: css``,
	},
};
