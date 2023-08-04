import React from 'react';
import { Outlet } from 'react-router-dom';

export const MyPageRouter: React.FC = () => {
  return (
    <div>
      MyPageRouter
      <Outlet />
    </div>
  );
};
