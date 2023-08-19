import React  from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useProtectiveRouter } from '../hooks';

export const ProtectiveRouter: React.FC = () => {
  const {decodeLoaded, sub} = useProtectiveRouter()

  return !decodeLoaded
    ?  <div />
    : sub
      ? <Outlet />
      : <Navigate to={"/login"} replace={true} />
};
