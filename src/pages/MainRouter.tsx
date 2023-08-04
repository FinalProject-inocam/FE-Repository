import React from 'react';
import { Outlet } from 'react-router-dom';
import { useDecodeToken } from '../hooks/auth/useDecodeToken';

export const MainRouter: React.FC = () => {
  const {decodeToken} = useDecodeToken()
  console.log("MainRouter - useDecodeToken", decodeToken);
  
  return (
    <div>
      mainRouter
      <Outlet />
    </div>
  );
};
