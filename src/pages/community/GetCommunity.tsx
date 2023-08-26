import { FC } from "react"
import * as SC from "../../components";
import { communityBanner, heart, posting, searchIcon } from "../../assets";
import { useRouter } from "../../hooks";


export const GetCommunity:FC = () => {
  const { onNavigate } = useRouter();
  return (
    <SC.FlexBox $fd="column" $ai="start" $jc="start" $gap={30}>
    <SC.FlexBox $gap={10}>
      <SC.CategoryBtn $bColor="darkBlue2"><SC.CustomP $height="44px" $bColor="darkBlue2">전체</SC.CustomP></SC.CategoryBtn>
      <SC.CategoryBtn $bColor="white"><SC.CustomP $height="44px" $bColor="white">공지</SC.CustomP></SC.CategoryBtn>
      <SC.CategoryBtn $bColor="white"><SC.CustomP $height="44px" $bColor="white">자유</SC.CustomP></SC.CategoryBtn>
      <SC.CategoryBtn $bColor="white"><SC.CustomP $height="44px" $bColor="white">후기</SC.CustomP></SC.CategoryBtn>
    </SC.FlexBox>

    <SC.PostList>
      <SC.PostInnerItem onClick={onNavigate({ url: '1' })}>
        <SC.FigureObjectFitImg width={"100%"} height={"150px"} src={communityBanner} alt="mainLogo" />
        <SC.PostInnerContext>
          <SC.CategoryBtn $bColor="blue" $types="PostTag"><SC.CustomP $height="34px" $bColor="blue">태그</SC.CustomP></SC.CategoryBtn>
          <SC.FlexBox $fd="column" $gap={8} $ai="start" $jc="start">
            <SC.PostingText $height="34px" ><p>공지는 하나만 등록할 수 있고 맨위에 고정되어요~</p></SC.PostingText>
            <SC.PostingText $height="24px" ><p>커뮤니티에서는 올바른 말과 행동..</p></SC.PostingText>
            <div>관리자 조회수 9562 2023. 12. 31</div>
          </SC.FlexBox>
          <SC.FlexBox $gap={5} style={{ width: "150px", height: "40px", position: "absolute", bottom: "10px", right: "15px" }}>
            <SC.FigureObjectFitImg width={"18px"} height={"16px"} src={heart} alt="heart" />
            <p>1,024</p>
            <SC.FigureObjectFitImg width={"18px"} height={"16px"} src={posting} alt="posting" />
            <p>92</p>
          </SC.FlexBox>
        </SC.PostInnerContext>
      </SC.PostInnerItem>

      {Array.from({ length: 4 }).map((_, idx: number) => (
        <SC.PostInnerItem key={idx}>
          <SC.FigureObjectFitImg width={"100%"} height={"150px"} src={communityBanner} alt="mainLogo" />
          <SC.PostInnerContext>
            <SC.CategoryBtn $bColor="lightgray1" $types="PostTag"><SC.CustomP $height="34px" $bColor="lightgray1">태그</SC.CustomP></SC.CategoryBtn>
            <SC.FlexBox $fd="column" $gap={8} $ai="start" $jc="start">
              <SC.PostingText $height="34px" ><p>공지는 하나만 등록할 수 있고 맨위에 고정되어요~</p></SC.PostingText>
              <SC.PostingText $height="24px" ><p>커뮤니티에서는 올바른 말과 행동..</p></SC.PostingText>
              <div>관리자 조회수 9562 2023. 12. 31</div>
            </SC.FlexBox>
            <SC.FlexBox $gap={5} style={{ width: "150px", height: "40px", position: "absolute", bottom: "10px", right: "15px" }}>
              <SC.FigureObjectFitImg width={"18px"} height={"16px"} src={heart} alt="heart" />
              <p>1,024</p>
              <SC.FigureObjectFitImg width={"18px"} height={"16px"} src={posting} alt="posting" />
              <p>92</p>
            </SC.FlexBox>
          </SC.PostInnerContext>
        </SC.PostInnerItem>
      ))}


    </SC.PostList>


    <SC.FlexBox $jc="space-between" style={{ width: "100%" }}>
      <SC.PositionRelavite>
        <SC.SearchBar type="text" placeholder="검색어를 입력하세요..." />
        <img
          src={searchIcon}
          alt="searchIcon"
          style={{ display: "block", cursor: "pointer", position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)" }}></img>
      </SC.PositionRelavite>
      <SC.FlexBox $gap={10}>
        <SC.SettingsBtn $bColor="lightgray2">삭제(관리자)</SC.SettingsBtn>
        <SC.SettingsBtn $bColor="orange2">선택(관리자)</SC.SettingsBtn>
        <SC.SettingsBtn $bColor="blue">글 작성하기</SC.SettingsBtn>
      </SC.FlexBox>
    </SC.FlexBox>
    <SC.FlexBox $gap={30} style={{ margin: "0 auto" }}>
      <SC.RankNum $bColor="lightgray3"><SC.CustomP $bColor="lightgray3">{`<`}</SC.CustomP></SC.RankNum>
      <SC.FlexBox $gap={10}>
        <SC.RankNum $bColor="lightgray2"><SC.CustomP $bColor="lightgray3">...</SC.CustomP></SC.RankNum>
        <SC.RankNum $bColor="blue"><SC.CustomP $bColor="blue">1</SC.CustomP></SC.RankNum>
        <SC.RankNum $bColor="lightgray2"><SC.CustomP $bColor="lightgray2">2</SC.CustomP></SC.RankNum>
        <SC.RankNum $bColor="lightgray2"><SC.CustomP $bColor="lightgray2">3</SC.CustomP></SC.RankNum>
        <SC.RankNum $bColor="lightgray2"><SC.CustomP $bColor="lightgray2">4</SC.CustomP></SC.RankNum>
        <SC.RankNum $bColor="lightgray2"><SC.CustomP $bColor="lightgray2">...</SC.CustomP></SC.RankNum>
      </SC.FlexBox>
      <SC.RankNum $bColor="lightgray3"><SC.CustomP $bColor="lightgray3">{`>`}</SC.CustomP></SC.RankNum>
    </SC.FlexBox>
  </SC.FlexBox>
  )
}
