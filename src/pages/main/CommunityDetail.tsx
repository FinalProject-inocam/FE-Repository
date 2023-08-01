import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from '../../hooks';
import { useGetPostsDetailQuery, useDeletePostsMutation, usePostCommentMutation } from '../../redux';
import * as Type from '../../types';
import { EditCommunityDetail } from '../../components';



export const CommunityDetail: React.FC = () => {
  const { getId, onNavigate } = useRouter()

  const { isLoading, data, isError, error } = useGetPostsDetailQuery(getId)
  data && console.log(data)

  const [onCommentPostRTK, { isSuccess: commentSuccess, data: commentData, isError: commentIsError, error: commentError }] = usePostCommentMutation()
  const [commentInfo, setCommentInfo] = useState<string>("")
  const onChangeComment = (e: ChangeEvent<HTMLInputElement>): void => {
    setCommentInfo(e.target.value)
  }
  const onCommentButton = (): void => {
    onCommentPostRTK(commentInfo)
  }

  const [onDeletePostRTK, { isSuccess: postSuccess, data: postData, isError: postIsError, error: postError }] = useDeletePostsMutation()
  const onDeletePost = (post_id: number | undefined) => () => {
    onDeletePostRTK(post_id)
    onNavigate(-1)()
  }

  useEffect(() => {
    if (postSuccess) console.log("useDeletePostsMutation 삭제성공", postData);
    if (postIsError) console.log("useDeletePostsMutation 삭제실패", postError);
    if (commentSuccess) console.log("useDeletePostsMutation 삭제성공", commentData);
    if (commentIsError) console.log("useDeletePostsMutation 삭제실패", commentError);
  }, [postSuccess, postData, postIsError, postError, commentSuccess, commentData, commentIsError, commentError])

  if (isLoading) {
    return <div>... 로딩중</div>
  }
  if (isError) {
    return <div>에러발생... {JSON.stringify(error)}</div>
  }

  return (
    <div>
      CommunityDetail
      {data && data.map(({ post_id, title, content, is_like, like_count, image_urls, comment }: Type.PostsDetailData) => (
        <>
          <div key={post_id}>

            <EditCommunityDetail post_id={post_id} title={title} content={content} />
            <button onClick={onDeletePost(post_id)}>삭제</button>
            <div>item.is_like : {JSON.stringify(is_like)}</div>
            <div>like_count: {like_count}개</div>
            <img src={image_urls[0]} alt='사진이라우' />
          </div>

          {
            comment.map(({ comment_id, nickname, comment, created_at, modified_at }: Type.CommentsData) => (
              <div key={comment_id}>
                <div>작성자 : {nickname}</div>
                <div>내용 : {comment}</div>
                <div>작성시간 : {created_at}</div>
                <div>수정시간 : {modified_at}</div>
              </div>
            ))
          }
          <form>
            <input type='text' name='comment' value={commentInfo}  onChange={onChangeComment} placeholder='댓글을 입력해 주세요' />
            <div onClick={onCommentButton}>제출하기</div>
          </form>
        </>
      ))}
    </div>
  )
};
