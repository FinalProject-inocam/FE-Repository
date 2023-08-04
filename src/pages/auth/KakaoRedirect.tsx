import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRouter } from '../../hooks';
import { useLoginSNSRTKQuery } from '../../redux';

export const KakaoRedirect: React.FC = () => {
  const {search} = useLocation()
  const { onNavigate } = useRouter();
  const {isSuccess} = useLoginSNSRTKQuery(search)

  useEffect(()=>{
    isSuccess && onNavigate('/')()
  }, [isSuccess,onNavigate])
  return <div>KakaoRedirect</div>;
};
