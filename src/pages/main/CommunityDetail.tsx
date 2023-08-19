import React from "react";
import * as Type from "../../types";
import * as COMP from "../../components";
import { useCommunityDetail } from "../../hooks";

export const CommunityDetail: React.FC = () => {
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

  console.log(data)

  if (isLoading) return <div>... 로딩중</div>;
  else if (isError) return <div>에러발생... {JSON.stringify(error)}</div>;
  else {
    const { postId, title, content, isLike, likeCount, imageUrls, commentsList } = data  
    return (
      <div style={{marginTop:"90px"}}>
        CommunityDetail
        <div key={postId}>
          <div>
            <COMP.EditCommunityDetail
              postId={postId}
              title={title}
              content={content}
            />
            <button onClick={onDeletePost(postId)}>삭제</button>
            <div>item.is_like : {JSON.stringify(isLike)}</div>
            <div>like_count: {likeCount}개</div>
            {imageUrls[0] && <img src={imageUrls[0]} alt="사진이라우" />}
          </div>
          <form onSubmit={onSubmitPostComment(postId)}>
            <input
              value={commentInfo}
              onChange={onChangeComment}
              placeholder="댓글입력해주세요"
            />
            <input type="submit" value="제출하기" />
          </form>
          <hr />
          {commentsList && commentsList.map(
            ({
              commentId,
              nickname,
              comment,
              createdAt,
              modifiedAt,
            }: Type.CommunityComments) => (
              <div key={commentId}>
                <div>작성자 : {nickname}</div>
                <COMP.EditCommunityComment
                  postId={postId}
                  commentId={commentId}
                  comment={comment}
                />
                <div>작성시간 : {createdAt}</div>
                <div>수정시간 : {modifiedAt}</div>
                <div onClick={onDeleteComment(postId, commentId)}>
                  info
                </div>
                <hr />
              </div>
            )
          )}
        </div>
      </div>
    );
  }
};