import React from 'react';
import { Outlet } from 'react-router-dom';

export const AdminRouter: React.FC = () => {
  return (
    <div>
      AdminRouter
      <Outlet />
    </div>
  );
};
