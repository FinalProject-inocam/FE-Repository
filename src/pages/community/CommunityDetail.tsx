import React, { useEffect } from "react";
import { useCommunityDetail, useRouter } from "../../hooks";
import { CustomH1, CustomP, FigureObjectFitImg, FlexBox, GridBox, PostList, SettingsBtn, cursor } from "../../components";
import { styled } from "styled-components";
import { communityBanner, heart } from "../../assets";

export const CommunityDetail: React.FC = () => {
  const { onNavigate } = useRouter()
  const {
    isLoading,
    isError,
    data,
    error,
    onDeletePost,
    onSubmitPostComment,
    commentInfo,
    onChangeComment,
    onDeleteComment
  } = useCommunityDetail()

    useEffect(()=>{
      console.log("동작")
      window.scrollTo(0,500)
      console.log(data, onDeletePost,
        onSubmitPostComment,
        commentInfo,
        onChangeComment,
        onDeleteComment)
    },[])


  if (isLoading) return <div>... 로딩중</div>;
  else if (isError) return <div>에러발생... {JSON.stringify(error)}</div>;
  else {
    return (
        <FlexBox $fd="column" $ai="start" $jc="start" $gap={30}>
          <SettingBtn onClick={onNavigate({ url: "/community/1" })}><CustomP $height="47px" $bColor="white" $size={1.125}>목록으로</CustomP></SettingBtn>
          <PostList $jc="flex-start" $gap={50}>
            <FlexBox $fd="column" $gap={20} style={{ width: "100%" }}>
              <CustomH1 $height="78px" $size={1.5} $types="bottomLine">무의미한 한글 텍스트 생성기입니다.</CustomH1>
              <PerDiv>{`자랑처럼 노루, 밤이 어머니, 계십니다. 마디씩 다 하나에 있습니다. 덮어 옥 무덤 이런 다 까닭입니다. 했던 이름과 이름과, 나의 있습니다. 릴케 하나에 이웃 밤이 불러 이런 듯합니다. 어머니, 자랑처럼 지나고 그리고 너무나 별 노새, 거외다. 어머님, 벌써 자랑처럼 당신은 않은 불러 잔디가 이름자 버리었습니다. 어머님, 하나의 위에 버리었습니다. 너무나 노새, 무덤 계십니다. 별들을 언덕 프랑시스 추억과 보고, 별 새워 있습니다. 가득 그리워 별 하나에 어머니, 봅니다.내린 노새, 가난한 하나에 버리었습니다. 지나고 봄이 헤는 있습니다. \n\n쉬이 별 묻힌 내 불러 라이너 겨울이 강아지, 봅니다. 이런 헤일 별 하나 겨울이 우는 있습니다. 흙으로 위에도 새겨지는 이런 토끼, 하나에 무엇인지 라이너 나의 있습니다. 이름과, 별빛이 그러나 봄이 나는 묻힌 계십니다. 언덕 지나고 계집애들의 어머니, 옥 있습니다. 어머님, 밤이 없이 너무나 언덕 별에도 아침이 했던 헤는 버리었습니다. 보고, 새워 아침이 지나가는 못 한 이제 소녀들의 이런 까닭입니다.이국 프랑시스 어머님, 어머니 그리워 계절이 계십니다. 오는 같이 별 있습니다. 까닭이요, 가을로 멀듯이, 경, 묻힌 계십니다. \n\n이름자를 릴케 나의 동경과 청춘이 봅니다. 옥 당신은 어머니 나의 아무 까닭입니다. 잠, 하나의 멀듯이, 마디씩 시와 이웃 내일 쓸쓸함과 거외다. 프랑시스 나는 그리고 자랑처럼 한 별 무엇인지 있습니다. 별 별들을 이름을 어머니, 이름과 패, 이 추억과 무성할 듯합니다. 이네들은 않은 이웃 헤일 봅니다. 하나 언덕 시인의 흙으로 계절이 거외다. 아름다운 언덕 무덤 버리었습니다. \n\n출처 http://hangul.thefron.me/`}</PerDiv>
              <GridBox $gtc="repeat(3, 1fr)" $cgap={10}>
              <FigureObjectFitImg width={"100%"} types="postInnerImg" src={communityBanner} alt="mainLogo" />
              <FigureObjectFitImg width={"100%"} types="postInnerImg" src={communityBanner} alt="mainLogo" />
              <FigureObjectFitImg width={"100%"} types="postInnerImg" src={communityBanner} alt="mainLogo" />
              </GridBox>
              <FlexBox $gap={5} style={{padding:"10px 20px", border:"1px solid blue", borderRadius:"10px", cursor:"pointer"}}>
              <FigureObjectFitImg width={"18px"} height={"16px"} src={heart} alt="heart" />
              <CustomP>1,024</CustomP>
              </FlexBox>
              <FlexBox style={{width:"100%"}} $jc="space-between">
                <SettingsBtn $bColor="lightgray1" $types="postinnerSettingBtn1"><CustomP $height="50px" $bColor="white" $size={1.25}>목록으로</CustomP></SettingsBtn>
                <FlexBox $gap={10}>
                <SettingsBtn $bColor="lightgray1" $types="postinnerSettingBtn2"><CustomP $height="50px" $bColor="white" $size={1.25}>수정</CustomP></SettingsBtn>
                <SettingsBtn $bColor="lightgray1" $types="postinnerSettingBtn2"><CustomP $height="50px" $bColor="white" $size={1.25}>삭제</CustomP></SettingsBtn>
                </FlexBox>
              </FlexBox>
            </FlexBox>
            <div style={{ width: "100%", position: "relative" }}>
              <CustomH1 $size={1.5}>댓글</CustomH1>
              <textarea 
                  value={commentInfo}
                  onChange={onChangeComment}
                  placeholder="댓글을 입력해주세요" style={{ marginTop: "20px", display: "block", width: "100%", height: "150px", borderRadius: "10px", resize: "none", border: "1px solid black", padding:"20px" }} />
              <div
                onClick={onSubmitPostComment(65)}
                style={{ position: "absolute", bottom: "20px", right: "20px", width: "75px", height: "45px", backgroundColor: "blue", borderRadius: "10px" }}><CustomP $height="45px" $bColor="blue" $size={1.25}>작성</CustomP></div>
            </div>
            <div>댓글내용</div>
            <div>댓글내용</div>
            <div>댓글내용</div>
            <div>댓글내용</div>
            <div>댓글내용</div>
            <div>댓글내용</div>
            <div>댓글내용</div>
            <div>댓글내용</div>
            <div>댓글내용</div>
            <div>댓글내용</div>
            <div>댓글내용</div>
          </PostList>
        </FlexBox>
    );
  }
};

export const SettingBtn = styled.div`
  ${cursor}
  width: 142px;
  height: 47px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 8px;
  background-color: ${({ theme }) => theme.color.white};
`
export const PerDiv = styled.div`
  width: 100%;
  text-align: justify;
  white-space: pre-line;
`