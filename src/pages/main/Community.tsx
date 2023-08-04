import React from 'react';
import { useRouter } from '../../hooks';
import * as Type from '../../types/post';
import { useGetPostsQuery } from '../../redux';

export const Community: React.FC = () => {
  const { onNavigate } = useRouter()
  const { isLoading, data, isError, error } = useGetPostsQuery({})

  if (isLoading) {
    return <div>... 로딩중</div>
  }
  if (isError) {
    return <div>에러발생... {JSON.stringify(error)}</div>
  }

  return (
    <>
      {data.map(({ postId, title, content }: Type.PostsData) => (
        <div key={postId}>
          <div onClick={onNavigate(`/communityDetail/${postId}`)}>{title} : {content} 상세페이지로</div>
        </div>
      ))}
    </>
  )
};
