import React from "react";
import { useCommunityDetail, useRouter } from "../../hooks";
import * as SC from "../../components";
import { communityBanner, heart, heartg } from "../../assets";

export const CommunityDetail: React.FC = () => {
  const { onNavigate, state } = useRouter();

  const {
    isLoading,
    isError,
    data,
    error,
    onDeletePost,
    onSubmitPostComment,
    commentInfo,
    onChangeComment,
    onDeleteComment,
    onDebounce,
    onPatchLiked,
    decokenNickname,
  } = useCommunityDetail()


  if (isLoading) return <div>... 로딩중</div>;
  else if (isError) return <div>에러발생... {JSON.stringify(error)}</div>;
  else {
    const { content, isLike, likeCount, title, postId, commentsList, nickname } = data; // createAt // imageUrls // postId // commentsList
    return (
      <SC.FlexBox $fd="column" $ai="start" $jc="start" $gap={30}>
        <SC.SettingBtn
          onClick={onNavigate({ url: state })}
          children={<SC.CustomP
            $height="47px"
            $bColor="white"
            $size={1.125}
            children="목록으로" />} />
        <SC.PostList $jc="flex-start" $gap={50}>
          <SC.FlexBox $fd="column" $gap={20} style={{ width: "100%" }}>
            <SC.CustomH1 $height="78px" $size={1.5} $types="bottomLine" children={title} />
            <SC.PerDiv children={content} />
            <SC.GridBox $gtc="repeat(3, 1fr)" $cgap={10}>
              {Array.from({ length: 3 }, (_, idx) => idx).map(imgs => (
                <SC.FigureObjectFitImg
                  key={imgs}
                  width={"100%"}
                  types="postInnerImg"
                  src={communityBanner}
                  alt="reviewImgs" />
              ))}
            </SC.GridBox>
            <SC.CommunityDetilHeart
              onClick={onDebounce(onPatchLiked, postId as number)} $gap={10}>
              <SC.FigureObjectFitImg
                width={"18px"}
                height={"16px"}
                src={isLike ? heart : heartg}
                alt="heart" />
              <SC.CustomP children={likeCount} />
            </SC.CommunityDetilHeart>
            <SC.FlexBox style={{ width: "100%" }} $jc="space-between">
              <SC.SettingsBtn
                onClick={onNavigate({ url: state })}
                $bColor="lightgray1"
                $types="postinnerSettingBtn1"
                children={<SC.CustomP
                  $height="50px"
                  $bColor="white"
                  $size={1.25}
                  children="목록으로" />} />
              <SC.FlexBox $gap={10}>
                {nickname === decokenNickname && (
                  <>
                    <SC.SettingsBtn
                      $bColor="lightgray1"
                      $types="postinnerSettingBtn2"
                      children={<SC.CustomP
                        $height="50px"
                        $bColor="white"
                        $size={1.25}
                        children="수정" />} />
                    <SC.SettingsBtn
                      onClick={onDeletePost(postId as number)}
                      $bColor="lightgray1"
                      $types="postinnerSettingBtn2"
                      children={<SC.CustomP
                        $height="50px"
                        $bColor="white"
                        $size={1.25}
                        children="삭제" />} />
                  </>
                )}
              </SC.FlexBox>
            </SC.FlexBox>
          </SC.FlexBox>
          <div style={{ width: "100%", position: "relative" }}>
            <SC.CustomH1 $size={1.5} children="댓글" />
            <SC.CommunityCommentText
              value={commentInfo}
              onChange={onChangeComment}
              placeholder={decokenNickname ? "댓글을 입력해주세요" : "댓글 작성은 로그인 후 이동 가능합니다."} />
            <SC.CommunityCommentTextBtn
              onClick={onSubmitPostComment(postId)}
              children={<SC.CustomP $height="45px" $bColor="blue" $size={1.25} children="작성" />} />
          </div>
          <SC.FlexBox $fd="column" $ai="start" $jc="start" $gap={20}>
            {commentsList.map((comment, idx) => <div key={comment.commentId}>{JSON.stringify(commentsList[idx])}
              {decokenNickname === comment.nickname && <button onClick={onDeleteComment(postId, comment.commentId)} children="댓글삭제" />}
            </div>)}
          </SC.FlexBox>
        </SC.PostList>
      </SC.FlexBox>
    );
  }
};