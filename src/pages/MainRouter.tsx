import React from 'react';
import { Outlet } from 'react-router-dom';

export const MainRouter: React.FC = () => {
  return (
    <div>
      mainRouter
      <Outlet />
    </div>
  );
};
