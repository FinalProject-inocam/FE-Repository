import { ChangeEvent, FormEvent, useState } from "react";
import * as RTK from "../../redux";
import { useRouter } from "../useRouter";
import * as Type from "../../types";

export const useCommunityDetail = ():Type.useCommunityDetail => {
  const { getId, onNavigate } = useRouter();

  // RTK - 상세페이지 GET
  const { isLoading, data, isError, error } = RTK.useGetCommunityDetailQuery(getId);

  // RTK - 상세페이지 삭제
  const [
    onDeletePostRTK
    // {
    //   isSuccess: postSuccess,
    //   data: postData,
    //   isError: postIsError,
    //   error: postError,
    // },
  ] = RTK.useDeleteCommunityMutation();

  const onDeletePost = (post_id: number | undefined) => () => {
    onDeletePostRTK(post_id);
    onNavigate(-1)();
  };

  // RTK - 상세페이지 댓글작성(POST)
  const [commentInfo, setCommentInfo] = useState<string>("");
  const [
    onCommentPostRTK
    // {
    //   isSuccess: commentSuccess,
    //   data: commentData,
    //   isError: commentIsError,
    //   error: commentError,
    // },
  ] = RTK.usePostCommunityCommentMutation();
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
    onDeleteCommentRTK
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

  return { isLoading, isError, data, error, onDeletePost, onSubmitPostComment, commentInfo, onChangeComment, onDeleteComment }
}


  // // 데이터 확인을 위한
  // useEffect(() => {
  //   if (postSuccess) console.log("useDeletePostsMutation 삭제성공", postData);
  //   if (postIsError) console.log("useDeletePostsMutation 삭제실패", postError);
  //   if (commentSuccess) console.log("commentData 입력성공", commentData);
  //   if (commentIsError) console.log("commentData 입력실패", commentError);
  //   if (commentDeleteSuccess)
  //     console.log("commentDelete 댓글삭제성공", commentDeleteData);
  //   if (commentDeleteIsError)
  //     console.log("commentDelte 댓글삭제실패", commentDeleteError);
  // }, [
  //   postSuccess,
  //   postData,
  //   postIsError,
  //   postError,
  //   commentSuccess,
  //   commentData,
  //   commentIsError,
  //   commentError,
  //   commentDeleteSuccess,
  //   commentDeleteData,
  //   commentDeleteIsError,
  //   commentDeleteError,
  // ]);