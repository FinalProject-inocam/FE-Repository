import React, { createContext } from 'react';
import { Outlet } from 'react-router-dom';
import { useGeolocation } from '../hooks';
import * as Type from '../types/hooks/hooks';
export const geolocationContext = createContext<Partial<Type.useGeolocation> | null>(null)

export const MainRouter: React.FC = () => {
  const geolocation = useGeolocation()
  return (
    <geolocationContext.Provider value={geolocation}>
      <div>
        mainRouter
        <Outlet />
      </div>
    </geolocationContext.Provider>
  );
};


// import { useDecodeToken } from '../hooks/auth/useDecodeToken';
// const { decodeToken } = useDecodeToken()
// console.log("MainRouter - useDecodeToken", decodeToken);