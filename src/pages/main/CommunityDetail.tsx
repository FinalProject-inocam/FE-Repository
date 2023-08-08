import * as RTK from "../../redux";
import * as Type from "../../types";
import { useRouter } from "../../hooks";
import { EditCommunityDetail } from "../../components";
import { EditComment } from "../../components/community/EditComment";
import React,  { ChangeEvent, FormEvent, useState, useEffect } from "react";

export const CommunityDetail: React.FC = () => {
  const { getId, onNavigate } = useRouter();

  // RTK - 상세페이지 GET
  const { isLoading, data, isError, error } = RTK.useGetPostsDetailQuery(getId);
  console.log(data);

  // RTK - 상세페이지 삭제
  const [
    onDeletePostRTK,
    {
      isSuccess: postSuccess,
      data: postData,
      isError: postIsError,
      error: postError,
    },
  ] = RTK.useDeletePostsMutation();
  const onDeletePost = (post_id: number | undefined) => () => {
    onDeletePostRTK(post_id);
    onNavigate(-1)();
  };

  // RTK - 상세페이지 댓글작성(POST)
  const [commentInfo, setCommentInfo] = useState<string>("");
  const [
    onCommentPostRTK,
    {
      isSuccess: commentSuccess,
      data: commentData,
      isError: commentIsError,
      error: commentError,
    },
  ] = RTK.usePostPostsCommentMutation();
  const onChangeComment = (e: ChangeEvent<HTMLInputElement>): void => {
    setCommentInfo(e.target.value);
  };
  const onSubmitPostComment =
    (post_id: number | undefined) =>
    (e: FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      onCommentPostRTK({ post_id, data: { comment: commentInfo } });
    };

  // RTK - 상세페페이지 댓글삭제(DELETE)
  const [
    onDeleteCommentRTK,
    {
      isSuccess: commentDeleteSuccess,
      data: commentDeleteData,
      isError: commentDeleteIsError,
      error: commentDeleteError,
    },
  ] = RTK.useDeletePostsCommentMutation();
  const onDeleteComment =
    (post_id: number | undefined, comment_id: number | undefined) => () => {
      onDeleteCommentRTK({ post_id, comment_id });
    };

  // 데이터 확인을 위한
  useEffect(() => {
    if (postSuccess) console.log("useDeletePostsMutation 삭제성공", postData);
    if (postIsError) console.log("useDeletePostsMutation 삭제실패", postError);
    if (commentSuccess) console.log("commentData 입력성공", commentData);
    if (commentIsError) console.log("commentData 입력실패", commentError);
    if (commentDeleteSuccess)
      console.log("commentDelete 댓글삭제성공", commentDeleteData);
    if (commentDeleteIsError)
      console.log("commentDelte 댓글삭제실패", commentDeleteError);
  }, [
    postSuccess,
    postData,
    postIsError,
    postError,
    commentSuccess,
    commentData,
    commentIsError,
    commentError,
    commentDeleteSuccess,
    commentDeleteData,
    commentDeleteIsError,
    commentDeleteError,
  ]);

  if (isLoading) {
    return <div>... 로딩중</div>;
  }
  if (isError) {
    return <div>에러발생... {JSON.stringify(error)}</div>;
  }

  return (
    <div>
      CommunityDetail
      {/* 요청된 값이 하나면, {} 객체로 보내주고 있어요  :: >> 맵을 돌릴 필요가 없다. */}
      {data &&
        [data].map(
          (info: Type.PostsDetailData) => (
            <div key={info.postId}>
              <div>
                <EditCommunityDetail
                  postId={info.postId}
                  title={info.title}
                  content={info.content}
                />
                <button onClick={onDeletePost(info.postId)}>삭제</button>
                <div>item.is_like : {JSON.stringify(info.isLike)}</div>
                <div>like_count: {info.likeCount}개</div>
                <img src={info.imageUrls[0]} alt="사진이라우" />
              </div>
              <form onSubmit={onSubmitPostComment(info.postId)}>
                <input
                  value={commentInfo}
                  onChange={onChangeComment}
                  placeholder="댓글입력해주세요"
                />
                <input type="submit" value="제출하기" />
              </form>
              <hr />
              {info.commentsList.map(
                ({
                  commentId,
                  nickname,
                  comment,
                  createdAt,
                  modifiedAt,
                }: Type.CommentsData) => (
                  <div key={commentId}>
                    <div>작성자 : {nickname}</div>
                    <EditComment
                      postId={info.postId}
                      commentId={commentId}
                      comment={comment}
                    />
                    <div>작성시간 : {createdAt}</div>
                    <div>수정시간 : {modifiedAt}</div>
                    <div onClick={onDeleteComment(info.postId, commentId)}>
                      info
                    </div>
                    <hr />
                  </div>
                )
              )}
            </div>
          )
        )}
    </div>
  );
};
