import { css, styled } from "styled-components";
import * as SC from "../GlobalStyled";
import { Styled } from "../../../types";

const CommunityLayout = styled.section`
	width: 100%;
	background-color: ${({ theme }) => theme.color.lightgray1};
	margin-top: ${({ theme }) => theme.headerHeight.desktop};
`;

const TopImgArticle = styled.article`
	position: relative;
	height: 500px;
`;

const ArticleInner = styled.div`
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	height: 100%;
	margin: 0 auto;
	max-width: 1440px;
`;

const TopImgLogo = styled.div`
	position: absolute;
	top: 50%;
	left: 20px;
	transform: translateY(-50%);
	width: fit-content;
`;

const ArticleGrid = styled.article<Partial<Styled>>`
	${SC.Grid}
	width: 100%;
	margin: 0 auto;
	margin-top: 50px;
	max-width: 1440px;
	padding-bottom: 50px;

	@media (max-width: 1024px) {
		grid-template-columns: 1fr;
		column-gap: 0;
		row-gap: 20px;
	}
`;

const PostingList = styled.div`
	width: 100%;
	height: 300px;
	padding: 30px;
	border-radius: 10px;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	background-color: ${({ theme }) => theme.color.white};
`;

const PostingBox = styled.div`
	${SC.Flex}
	${SC.cursor}
  margin-top: 30px;
	flex-direction: column;
	gap: 10px;
`;

const RankNum = styled.div<Partial<Styled>>`
	width: 30px;
	border-radius: 5px;
	display: ${({ $state }) => ($state ? "none" : "block")};
	background-color: ${({ $bColor, theme }) => $bColor && theme.color[$bColor]};

	p {
		position: relative;
		top: calc(1.25 * 0.079rem);
		line-height: ${({ $height }) => ($height ? $height : "30px")};
		text-align: ${({ $tAlign }) => ($tAlign ? $tAlign : "center")};
		font-size: ${({ $size }) => ($size ? `${$size}rem` : "1.25rem")};
		color: ${({ $bColor, theme }) => ($bColor === "darkBlue2" || $bColor === "blue") && theme.color["white"]};
	}
`;

const PostingText = styled.div<Partial<Styled>>`
	p {
		position: relative;
		top: calc(1 * 0.079rem);
		line-height: ${({ $height }) => ($height ? $height : "30px")};
		text-align: ${({ $tAlign }) => $tAlign};
		font-size: 1rem;
		font-weight: 600;

		${({ $types }) =>
			$types === "shortening" &&
			css`
				width: 220px;
				word-wrap: break-word;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			`}
	}
`;

const BannerText = styled.div`
	position: absolute;
	bottom: 30px;
	left: 20px;
	font-size: 2rem;
	font-weight: 800;
	color: ${({ theme }) => theme.color.white};
`;

const CategoryBtn = styled.div<Partial<Styled>>`
	${SC.cursor}
	width: 108px;
	height: 44px;
	border-radius: 50px;
	background-color: ${({ $bColor, theme }) => $bColor && theme.color[$bColor]};

	${({ $types }) =>
		$types === "PostTag" &&
		css`
			width: 68px;
			height: 34px;
		`}
`;

const PostList = styled.article<Partial<Styled>>`
	${SC.Flex}
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	min-height: 210px;
	border-radius: 20px;
	padding: 30px 24px;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	background-color: ${({ theme }) => theme.color.white};
`;

const SearchBar = styled.input`
	width: 400px;
	height: 60px;
	border-radius: 10px;
	padding: 20px 25px;
	padding-right: 60px;
	outline-style: none;
	color: ${({ theme }) => theme.color.lightgray3};
	border: 2px solid ${({ theme }) => theme.color.lightgray0};
`;

const SettingsBtn = styled.div<Partial<Styled>>`
	padding: 12px 25px;
	border-radius: 5px;
	font-size: 0.75rem;
	color: ${({ theme }) => theme.color.white};
	background-color: ${({ $bColor, theme }) => $bColor && theme.color[$bColor]};

	${({ $types }) =>
		$types === "postinnerSettingBtn1"
			? css`
					width: 129px;
					padding: 0;
			  `
			: $types === "postinnerSettingBtn2" &&
			  css`
					width: 80px;
					padding: 0;
			  `}
`;

const PostInnerItem = styled.div`
	${SC.Grid}
	${SC.cursor}
grid-template-columns: 200px 1fr;
	gap: 10px;
	width: 100%;
	height: 150px;
	overflow: hidden;
	border-radius: 10px;
	border: 2px solid ${({ theme }) => theme.color.lightgray1};
`;

const PostInnerContext = styled.div`
	${SC.Grid}
	width: 100%;
	position: relative;
	grid-template-columns: 68px 1fr;
	gap: 10px;
	padding: 28px;
`;

const CustomP = styled.p<Partial<Styled>>`
	position: relative;
	top: calc(1.25 * 0.079rem);
	line-height: ${({ $height }) => ($height ? $height : "30px")};
	text-align: ${({ $tAlign }) => ($tAlign ? $tAlign : "center")};
	font-size: ${({ $size }) => ($size ? `${$size}rem` : "1.25rem")};
	color: ${({ $bColor, theme }) => ($bColor === "darkBlue2" || $bColor === "blue") && theme.color["white"]};
`;

const PopularLayoutGrid = styled.div<Partial<Styled>>`
	${SC.Grid}
	position: sticky;
	top: 20px;
`;

const ShorteningP = styled.p`
	width: 100%;
	max-width: 150px;
	word-wrap: break-word;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;

	@media (min-width: 1000px) {
		max-width: 50px;
	}

	@media (min-width: 1100px) {
		max-width: 200px;
	}

	@media (min-width: 1200px) {
		max-width: 300px;
	}
	@media (min-width: 1300px) {
		max-width: 400px;
	}
`;

const CommumityLikeRevieLayout = styled.div<Partial<Styled>>`
	${SC.Flex}
	width: fit-content;
	height: 40px;
	position: absolute;
	bottom: 10px;
	right: 15px;
`;

const SearchIcons = styled.img`
	${SC.cursor}
	display: block;
	position: absolute;
	right: 20px;
	top: 50%;
	transform: translateY(-50%);
`;

const SettingBtn = styled.div`
	${SC.cursor}
	width: 142px;
	height: 47px;
	border-radius: 10px;
	transition: all 0.35s linear;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 8px;
	background-color: ${({ theme }) => theme.color.white};
`;
const PerDiv = styled.div`
	width: 100%;
	text-align: justify;
	white-space: pre-line;
`;

const CommunityCommentText = styled.textarea`
	margin-top: 20px;
	display: block;
	width: 100%;
	height: 150px;
	border-radius: 10px;
	resize: none;
	border: 1px solid black;
	padding: 20px;
`;

const CommunityCommentTextBtn = styled.div`
	position: absolute;
	bottom: 20px;
	right: 20px;
	width: 75px;
	height: 45px;
	background-color: blue;
	border-radius: 10px;
`;

const CommunityDetilHeart = styled.div<Partial<Styled>>`
	${SC.Flex}
	${SC.cursor}
  width: 116px;
	height: 50px;
	border-radius: 10px;
	border: 1px solid ${({ theme }) => theme.color.blue};
`;

const PostWriteTag = styled.div`
	${SC.Flex}
	font-size: 1.5rem;
	font-weight: 800;
	border-radius: 10px;
	min-height: 70px;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	background-color: ${({ theme }) => theme.color.white};

	${({ as }) =>
		as === "input" &&
		css`
			padding: 10px 30px;
		`}
`;

const PostTagSelector = styled(PostWriteTag)<Partial<Styled>>`
	position: absolute;
	bottom: ${({ $gap, $size }) => $gap && $size && `calc(-${$gap + $size + 10}px)`};
	width: 100%;
	z-index: 20;
`;

const PostPreImgBox = styled.div`
	${SC.Flex}
	${SC.cursor}
  height: 11.18vw;
	max-height: 161px;
	border-radius: 10px;
	overflow: hidden;
	background-color: ${({ theme }) => theme.color.lightgray1};
	border: 1px solid ${({ theme }) => theme.color.lightgray2};
`;

const CommunityTextArea = styled.textarea`
	width: 100%;
	display: block;
	border-radius: 10px;
	height: 200px;
	resize: none;
	padding: 20px;
	border: 1px solid black;
`;

const CommuityTextaAreaCount = styled.div<Partial<Styled>>`
	position: absolute;
	bottom: 5px;
	right: 10px;
	font-size: 0.75rem;
	color: ${({ $size, theme }) =>
		($size as number) === 0
			? theme.color.black
			: ($size as number) <= 700
			? theme.color.blue
			: ($size as number) <= 900
			? theme.color.orange
			: theme.color.red2};
`;

const CommuityWriteInput = styled.input`
	width: 100%;
	height: 70px;
	background-color: blue;
	border-radius: 10px;
	color: white;
	font-size: 1.25rem;
`;

const MoreModal = styled.div<Partial<Styled>>`
	${SC.Flex}
	position: absolute;
	top: -700px;
	right: -100px;
	width: 126px;
	height: 132px;
	gap: 10px;
	margin: 720px 5px 1049px 749px;
	padding: 15px;
	border-radius: 5px;
	box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.15);
	border: solid 1px #c7c7cb;
	background-color: white;
	z-index: 10;
`;

export {
	CommunityLayout,
	TopImgArticle,
	ArticleInner,
	TopImgLogo,
	ArticleGrid,
	PostingList,
	PostingBox,
	RankNum,
	PostingText,
	BannerText,
	CategoryBtn,
	PostList,
	SearchBar,
	SettingsBtn,
	PostInnerItem,
	PostInnerContext,
	CustomP,
	PopularLayoutGrid,
	ShorteningP,
	CommumityLikeRevieLayout,
	SearchIcons,
	SettingBtn,
	PerDiv,
	CommunityCommentText,
	CommunityCommentTextBtn,
	CommunityDetilHeart,
	PostWriteTag,
	PostTagSelector,
	PostPreImgBox,
	CommunityTextArea,
	CommuityTextaAreaCount,
	CommuityWriteInput,

	// community detail

	// MoreModal
	MoreModal,
};
