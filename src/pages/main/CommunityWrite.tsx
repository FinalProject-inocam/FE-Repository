import React from 'react';
import { useCommunityWrite } from '../../hooks';


export const CommunityWrite: React.FC = () => {
  const  {onChangePost,onChageFile, onSubmitPostPosts, postInfo} = useCommunityWrite()

  return (
    <form onSubmit={onSubmitPostPosts}>
      <input type="text" value={postInfo.title} name='title' onChange={onChangePost} placeholder='제목을 입력해 주세요' />
      <input type="text" value={postInfo.content} name='content' onChange={onChangePost} placeholder='내용을 입력해 주세요' />
      <input type="file" name='image' accept=".png, .jpg, .jpeg" onChange={onChageFile} />
      <input type="submit" value="제출하기"/>
    </form>
  )
};