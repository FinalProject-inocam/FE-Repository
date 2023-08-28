import { css, styled } from "styled-components"
import * as SC from "../GlobalStyled"
import { Styled } from "../../../types"



const CommunityLayout = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.color.lightgray1};
  margin-top: ${({ theme }) => theme.headerHeight.desktop};
`

const TopImgArticle = styled.article`
  position: relative;
  height: 500px;
`

const ArticleInner = styled.div` 
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  margin: 0 auto;
  max-width: 1440px;
`

const TopImgLogo = styled.div`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  width: fit-content;
`

const ArticleGrid = styled.article<Partial<Styled>>`
  ${SC.Grid}
  width: 100%;
  margin: 0 auto;
  margin-top: 50px;
  max-width: 1440px;
  padding-bottom: 50px;
`

const PostingList = styled.div`
  width: 100%;
  height: 300px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: ${({ theme }) => theme.color.white};
`

const PostingBox = styled.div`
  ${SC.Flex}
  ${SC.cursor}
  margin-top: 30px;
  flex-direction: column;
  gap:10px;
`

const RankNum = styled.div<Partial<Styled>>`
  width: 30px;
  border-radius: 5px;
  background-color: ${({ $bColor, theme }) => $bColor && theme.color[$bColor]};

  p {
    position: relative;
    top: calc(1.25*0.079rem);
    line-height: ${({ $height }) => $height ? $height : "30px"};
    text-align: ${({ $tAlign }) => $tAlign ? $tAlign : "center"};
    font-size: ${({ $size }) => $size ? `${$size}rem` : "1.25rem"}; 
    color: ${({ $bColor, theme }) => ($bColor === "darkBlue2" || $bColor === "blue") && theme.color["white"]};
  }
`

const PostingText = styled.div<Partial<Styled>>`
    p {
    position: relative;
    top: calc(1*0.079rem);
    line-height: ${({ $height }) => $height ? $height : "30px"};
    text-align: ${({ $tAlign }) => $tAlign};
    font-size: 1rem; 
    font-weight: 600;
  }
`

const BannerText = styled.div`
  position: absolute;
  bottom: 30px;
  left: 20px;
  font-size: 2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.color.white};
`

const CategoryBtn = styled.div<Partial<Styled>>`
  ${SC.cursor}
  width: 108px;
  height: 44px;
  border-radius: 50px;
  background-color: ${({ $bColor, theme }) => $bColor && theme.color[$bColor]};

  ${({ $types }) => $types === "PostTag" && css`
    width: 68px;
    height: 34px;
  `}
`


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
`

const SearchBar = styled.input`
  width: 400px;
  height: 60px;
  border-radius: 10px;
  padding: 20px 25px;
  padding-right: 60px;
  outline-style: none;
  color: ${({ theme }) => theme.color.lightgray3};
  border: 2px solid ${({ theme }) => theme.color.lightgray0};
`

const SettingsBtn = styled.div<Partial<Styled>>`
  padding: 12px 25px;
  border-radius: 5px;
  font-size: 0.75rem;
  color:${({ theme }) => theme.color.white};
  background-color: ${({ $bColor, theme }) => $bColor && theme.color[$bColor]};

  ${({$types}) => $types==="postinnerSettingBtn1" ? css`
    width : 129px;
    padding: 0;
  `
  : $types==="postinnerSettingBtn2" && css`
   width : 80px;
   padding: 0;
  ` }
`

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
`

const PostInnerContext = styled.div`
  ${SC.Grid}
  width: 100%;
  position: relative;
  grid-template-columns: 68px 1fr;
  gap: 10px;
  padding: 28px;
`

const CustomP = styled.p<Partial<Styled>>`
  position: relative;
  top: calc(1.25*0.079rem);
  line-height: ${({ $height }) => $height ? $height : "30px"};
  text-align: ${({ $tAlign }) => $tAlign ? $tAlign : "center"};
  font-size: ${({ $size }) => $size ? `${$size}rem` : "1.25rem"}; 
  color: ${({ $bColor, theme }) => ($bColor === "darkBlue2" || $bColor === "blue") && theme.color["white"]};
`
export {
  CommunityLayout, TopImgArticle, ArticleInner, TopImgLogo, ArticleGrid, PostingList, PostingBox, RankNum, PostingText,
  BannerText, CategoryBtn, PostList, SearchBar, SettingsBtn, PostInnerItem, PostInnerContext, CustomP
}