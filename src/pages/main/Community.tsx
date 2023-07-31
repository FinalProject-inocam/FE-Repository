import React from 'react';
import { useGetPostsQuery } from '../../redux';
import * as Type from '../../types/post';
import { useRouter } from '../../hooks';

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
      {data.map(({ post_id, title, content }: Type.PostsData) => (
        <div key={post_id}>
          <div onClick={onNavigate(`/communityDetail/${post_id}`)}>{title} : {content} 상세페이지로</div>
        </div>
      ))}
    </>
  )
};
