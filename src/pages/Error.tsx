import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Error: React.FC = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <div>Error</div>;
};
