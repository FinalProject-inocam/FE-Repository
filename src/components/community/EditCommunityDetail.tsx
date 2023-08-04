import React, { ChangeEvent, useEffect, useState } from 'react'
import * as Type from '../../types'
import { usePatchPostsMutation } from '../../redux'

export const EditCommunityDetail: React.FC<Type.PostPosts> = ({ postId, title, content }) => {
  const [edit, setEdit] = useState<Boolean>(false)
  const [inputValue, setInputValue] = useState<Type.PostPosts>({
    title: "",
    content: ""
  })

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setInputValue({ ...inputValue, [name]: value })
  }

  const onToogleEdit = () => {
    setEdit(!edit)
  }

  const [onPatchPostsRTK, {isSuccess:patchSuccess, data:patchData, isError:patchIsError, error:patchError}] = usePatchPostsMutation()

  const onPatchPosts = (post_id:number | undefined) => () => {
    // data 폼데이터 -> posts Write : "data" = blob
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(inputValue)], {type:'application/json'}))
    onPatchPostsRTK({post_id, formData}) 
    setEdit(!edit)
    setInputValue({
      title: "",
      content: ""
    })
  }

  useEffect(()=> {
    patchSuccess && console.log("isSuccess",patchData );
    patchIsError && console.log("isError", patchError);
  },[patchSuccess, patchData, patchIsError,patchError])

  return (
    <div>
      {!edit ? <><div>{title}</div>
        <div>{content}</div>
        <div onClick={onToogleEdit}>수정하기</div>
      </>
        : <>
          <input
            value={inputValue.title}
            name='title'
            onChange={onChangeValue}
            placeholder="타이들수정" />
          <input
            value={inputValue.content}
            name='content'
            onChange={onChangeValue}
            placeholder="콘텐트수정" />
          <button onClick={onPatchPosts(postId)}>수정제출</button>
          <button onClick={onToogleEdit}>수정취소</button>
        </>}
    </div>
  )
}
