import React, { createContext } from 'react';
import { Outlet } from 'react-router-dom';
import { useGeolocation } from '../hooks';
import * as Type from '../types/hooks';
export const geolocationContext = createContext<Partial<Type.useGeolocation> | null>(null)
export const kakoContext = createContext(null)
const kakao = window.kakao;

export const MainRouter: React.FC = () => {
  const geolocation = useGeolocation()
  console.log(geolocation);
  return (
    <kakoContext.Provider value={kakao}>
      <geolocationContext.Provider value={geolocation}>
        <div>
          mainRouter
          <Outlet />
        </div>
      </geolocationContext.Provider>
    </kakoContext.Provider>
  );
};


  // import { useDecodeToken } from '../hooks/auth/useDecodeToken';
  // const { decodeToken } = useDecodeToken()
  // console.log("MainRouter - useDecodeToken", decodeToken);