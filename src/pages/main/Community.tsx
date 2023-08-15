import React from 'react';
// import * as Type from '../../types';
import { useCommunity } from '../../hooks';

export const Community: React.FC = () => {
  const { isLoading, data, isError, error, onNavigate } = useCommunity()
  console.log(data, onNavigate);
  

  if (isLoading) return <div>... 로딩중</div>
  else if (isError) return <div>에러발생... {JSON.stringify(error)}</div> // <ErrorBoundary FallbackComponent={Error}>
  else {
    return (
      <div>
        {/* {data.content.map(({ postId, title, content }: Type.TotalCommunity) => (
          <div key={postId}>
            <div onClick={onNavigate && onNavigate(`${postId}`)}>{title} : {content} 상세페이지로</div>
          </div>
        ))} */}
      </div>
    )
  }
};
