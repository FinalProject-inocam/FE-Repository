import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import * as Hooks from '../hooks';

export const ProtectiveRouterA: React.FC = () => {
  const {decodeLoaded, sub} = Hooks.useProtectiveRouter()

  return !decodeLoaded
    ? <div />
    : sub === "E001"
      ? <Outlet />
      : <Navigate to={"/"} replace={true} />
};
