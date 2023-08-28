import React from "react";
import * as SC from "../../components";
import { communityBanner, communityTopimg, mainLogo } from "../../assets";
import { Outlet } from "react-router-dom";


export const Community: React.FC = () => {

    return (
      <SC.CommunityLayout>

        {/* 상단 이미지 공간 */}
        <SC.TopImgArticle>
          <SC.FigureObjectFitImg width="100%" height={"500px"} src={communityTopimg} alt="communityTopimg" />
          <SC.ArticleInner>
            <SC.TopImgLogo>
              <SC.FigureObjectFitImg width={"435px"} height={"122px"} src={mainLogo} alt="mainLogo" />
            </SC.TopImgLogo>
          </SC.ArticleInner>
        </SC.TopImgArticle>

        <SC.ArticleGrid $gtc="467px 1fr" $cgap={20}>

          {/* 좌측 인기최근 게시물 공간  */}
          <div>
            <SC.GridBox $gtc="repeat(1, 1fr)" $gtr="350px 350px 220px" style={{ position: "sticky", top: "20px" }}>
              {["인기게시물", "최근게시물"].map(content => (
                <SC.PostingList key={content}>
                  <SC.CustomH1 $size={1.5}>{content}</SC.CustomH1>
                  <SC.PostingBox>
                    {Array.from({ length: 5 }, (_, index: number) => index + 1).map(item => (
                      <SC.GridBox key={item} $gtc="30px 1fr 100px" $cgap={25}>
                        <SC.RankNum $bColor={item === 1 ? "blue" : "lightgray2"}><SC.CustomP $bColor={item === 1 ? "blue" : "lightgray2"}>{item}</SC.CustomP></SC.RankNum>
                        <SC.PostingText $color={item === 1 ? "lightgray3" : "lightgray2"}><p>일이삼사오육칠팔구십일이삼...</p></SC.PostingText>
                        <SC.PostingText $color="lightgray2" $tAlign="end"><p>2023.08.25</p></SC.PostingText>
                      </SC.GridBox>
                    ))}
                  </SC.PostingBox>
                </SC.PostingList>
              ))}
              <SC.PositionRelavite style={{ cursor: "pointer" }}>
                <SC.FigureObjectFitImg width={"100%"} height={"220px"} src={communityBanner} alt="mainLogo" />
                <SC.BannerText>오늘의 신차</SC.BannerText>
              </SC.PositionRelavite>
            </SC.GridBox>
          </div>


          {/* 우측 게시물 공간 */}
          <Outlet/>
        </SC.ArticleGrid>
      </SC.CommunityLayout>
    );
  }