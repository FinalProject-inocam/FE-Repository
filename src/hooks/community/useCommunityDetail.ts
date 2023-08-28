import { ChangeEvent, MouseEvent, useState } from "react";
import * as RTK from "../../redux";
import { useRouter } from "../useRouter";
import * as Type from "../../types";

export const useCommunityDetail = (): Type.UseCommunityDetail => {
  const { onNavigate } = useRouter(); // getId

  // RTK - 상세페이지 GET
  const { isLoading, data, isError, error } =
    RTK.useGetCommunityDetailQuery(65);

  // RTK - 상세페이지 삭제
  const [
    onDeletePostRTK,
    // {
    //   isSuccess: postSuccess,
    //   data: postData,
    //   isError: postIsError,
    //   error: postError,
    // },
  ] = RTK.useDeleteCommunityMutation();

  const onDeletePost = (post_id: number | undefined) => () => {
    onDeletePostRTK(post_id);
    onNavigate({ url: -1 })();
  };

  // RTK - 상세페이지 댓글작성(POST)
  const [commentInfo, setCommentInfo] = useState<string>("");
  const [
    onCommentPostRTK,
    // {
    //   isSuccess: commentSuccess,
    //   data: commentData,
    //   isError: commentIsError,
    //   error: commentError,
    // },
  ] = RTK.usePostCommunityCommentMutation();
  const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setCommentInfo(e.target.value);
  };
  const onSubmitPostComment =
    (post_id: number | undefined) =>
    (e: MouseEvent<HTMLDivElement>): void => {
      e.preventDefault();
      onCommentPostRTK({ post_id, data: { comment: commentInfo } });
    };

  // RTK - 상세페페이지 댓글삭제(DELETE)
  const [
    onDeleteCommentRTK,
    // {
    //   isSuccess: commentDeleteSuccess,
    //   data: commentDeleteData,
    //   isError: commentDeleteIsError,
    //   error: commentDeleteError,
    // },
  ] = RTK.useDeleteCommunityCommentMutation();
  const onDeleteComment =
    (post_id: number | undefined, comment_id: number | undefined) => () => {
      onDeleteCommentRTK({ post_id, comment_id });
    };

  return {
    isLoading,
    isError,
    data,
    error,
    onDeletePost,
    onSubmitPostComment,
    commentInfo,
    onChangeComment,
    onDeleteComment,
  };
};
