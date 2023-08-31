import { css } from "styled-components";

const PretendardL = css`
	font-family: "Pretendard";
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
	// 일반색상
	blue: "#4C4CFF",
	red: "#F2757A",
	red2: "#FF162D",
	red3: "#FC5555",
	green: "#539B39",
	orange: "#FA8128",
	purple: "#362783",
	white: "white",
	gray: "#eeee",
	gray2:"#BBBBC9",
	blackM: "#0E0D13",

	// 밝은색상
	lightblue: "#f2f2ff",
	lightblue2: "#d8d8ef",
	lightgray0: "#C7C7CB",
	lightgray1: "#f3f3f8",
	lightgray2: "#828293",
	lightgray3: "#555555",
	lightgray4: "#d6d6d6",

	// 어두운색상
	darkGray: "#26252B",
	darkgray2: "#2F2B3A",
	adminNav:"#333333",
	darkBlue: "#151565",
	darkBlue2: "#1E0476",

	//텍스트컬러
	textColorSub: "#828295",
	textColor2: "#0e0d13",
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
