import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from '../../hooks';
import * as RTK from '../../redux';
import * as Type from '../../types';
import { EditCommunityDetail } from '../../components';
import { EditComment } from '../../components/community/EditComment';

export const CommunityDetail: React.FC = () => {
  const { getId, onNavigate } = useRouter()

  const { isLoading, data, isError, error } = RTK.useGetPostsDetailQuery(getId)

  const [onCommentPostRTK, { isSuccess: commentSuccess, data: commentData, isError: commentIsError, error: commentError }] = RTK.usePostPostsCommentMutation()
  const [commentInfo, setCommentInfo] = useState<string>("")
  const onChangeComment = (e: ChangeEvent<HTMLInputElement>): void => {
    setCommentInfo(e.target.value)
  }
  const onSubmitPostComment = (post_id:number | undefined) => (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    onCommentPostRTK({post_id, data:{comment:commentInfo}})
  }

  const [onDeleteCommentRTK, { isSuccess: commentDeleteSuccess, data: commentDeleteData, isError: commentDeleteIsError, error: commentDeleteError }] = RTK.useDeletePostsCommentMutation()
  const onDeleteComment = (post_id:number | undefined, comment_id:number | undefined) => () => {  
    onDeleteCommentRTK({post_id, comment_id})
  }
 

  const [onDeletePostRTK, { isSuccess: postSuccess, data: postData, isError: postIsError, error: postError }] = RTK.useDeletePostsMutation()
  const onDeletePost = (post_id: number | undefined) => () => {
    onDeletePostRTK(post_id)
    onNavigate(-1)()
  }

  useEffect(() => {
    if (postSuccess) console.log("useDeletePostsMutation 삭제성공", postData);
    if (postIsError) console.log("useDeletePostsMutation 삭제실패", postError);
    if (commentSuccess) console.log("commentData 입력성공", commentData);
    if (commentIsError) console.log("commentData 입력실패", commentError);
    if (commentDeleteSuccess) console.log("commentDelete 댓글삭제성공", commentDeleteData);
    if (commentDeleteIsError) console.log("commentDelte 댓글삭제실패", commentDeleteError);
    
  }, [postSuccess, postData, postIsError, postError, commentSuccess, commentData, commentIsError, commentError, commentDeleteSuccess, commentDeleteData, commentDeleteIsError, commentDeleteError])

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
        <div key={post_id}>
          <div>
            <EditCommunityDetail post_id={post_id} title={title} content={content} />
            <button onClick={onDeletePost(post_id)}>삭제</button>
            <div>item.is_like : {JSON.stringify(is_like)}</div>
            <div>like_count: {like_count}개</div>
            <img src={image_urls[0]} alt='사진이라우' />
          </div>
          <form onSubmit={onSubmitPostComment(post_id)}>
            <input value={commentInfo} onChange={onChangeComment} placeholder='댓글입력해주세요'/>
            <input type='submit' value="제출하기"/>
          </form>
          <hr />
          {comment.map(({ comment_id, nickname, comment, created_at, modified_at }: Type.CommentsData) => (
            <div key={comment_id}>
              <div>작성자 : {nickname}</div>
              <EditComment post_id={post_id} comment_id={comment_id} comment={comment} />
              <div>작성시간 : {created_at}</div>
              <div>수정시간 : {modified_at}</div>
              <div onClick={onDeleteComment(post_id, comment_id)}>삭제하기</div>
              <hr />
            </div>
          ))
          }
        </div>
      ))}
    </div>
  )
};
