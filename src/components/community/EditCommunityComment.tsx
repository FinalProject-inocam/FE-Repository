import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import * as Type from '../../types'
import * as RTK from '../../redux'

export const EditCommunityComment: React.FC<Type.EditComment> = ({ postId, commentId, comment }) => {
  const [edit, setEdit] = useState<Boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
  }

  const onToogleEdit = () => {
    setEdit(!edit)
  }

  const [onPatchPostCommentRTK, { isSuccess: patchIsSuccess, data, isError: patchIsError, error }] = RTK.usePatchCommunityCommentMutation()


  const onSubmitPatchComments = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onPatchPostCommentRTK({ postId, commentId, data: { comment: inputValue } })
    setEdit(!edit)
    setInputValue("")
  }

  useEffect(() => {
    patchIsSuccess && console.log(data);
    patchIsError && console.log(error);

  }, [patchIsSuccess, data, patchIsError, error])

  return (
    <div>
      {!edit ?
        <>
          <div>{comment}</div>
          <div onClick={onToogleEdit}>수정하기</div>
        </>
        :
        <form onSubmit={onSubmitPatchComments}>
          <input
            value={inputValue}
            name="comment"
            onChange={onChangeValue} />
          <input type='submit' value="수정제출" />
          <button onClick={onToogleEdit}>수정취소</button>
        </form>
      }
    </div>
  )
}