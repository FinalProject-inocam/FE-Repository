import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import * as Type from '../../types'
import { usePatchPostCommentMutation } from '../../redux'

export const EditComment: React.FC<Type.EditComment> = ({ post_id, comment_id, comment }) => {
  const [edit, setEdit] = useState<Boolean>(false)
  const [inputValue, setInputValue] = useState<Type.Comment>({ comment: "" })

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setInputValue({ ...inputValue, [name]: value })
  }

  const onToogleEdit = () => {
    setEdit(!edit)
  }

  const [onPatchPostCommentRTK, { isSuccess: patchIsSuccess, data, isError: patchIsError, error }] = usePatchPostCommentMutation()


  const onSubmitPatchComments = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onPatchPostCommentRTK({ post_id, comment_id, data:inputValue })
    setEdit(!edit)
    setInputValue({comment: ""})
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
            value={inputValue.comment}
            name="comment"
            onChange={onChangeValue} />
          <input type='submit' value="수정제출" />
          <button onClick={onToogleEdit}>수정취소</button>
        </form>
      }
    </div>
  )
}