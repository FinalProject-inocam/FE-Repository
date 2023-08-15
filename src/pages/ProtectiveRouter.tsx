import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'; 
import * as RD from '../redux';

export const ProtectiveRouter: React.FC = () => {
  const {sub} = RD.useAppSelector(RD.selectDecode)
  console.log(sub);

  return sub ? <Outlet/> : <Navigate to={"/login"} replace={true}/>
};
