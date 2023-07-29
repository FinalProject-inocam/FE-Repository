import React from 'react';
import { Outlet } from 'react-router-dom';

export const ProtectiveRouter: React.FC = () => {
  // 만역 관리자가 아니면 Redirect => 원래 위치로
  // 만역 회원이 아니면 Redirect => 원래 위치로

  // let {decodeToken} = useSelector(selectToken)
  // console.log(JSON.stringify(!decodeToken));
  // return !decodeToken ? <Outlet/> : <Navigate to={"/login"}/>
  return <Outlet />;
};
