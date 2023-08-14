import React, { createContext } from 'react';
import { Outlet } from 'react-router-dom';
import { useGeolocation } from '../hooks';
import * as Type from '../types/hooks/hooks';
import { MainHeader } from '../components';
import { useDecodeToken } from '../hooks/auth/useDecodeToken';
export const geolocationContext = createContext<Partial<Type.useGeolocation> | null>(null)

export const MainRouter: React.FC = () => {
  const geolocation = useGeolocation()

const { decodeToken } = useDecodeToken()
console.log("MainRouter - useDecodeToken", decodeToken);

  return (
    <geolocationContext.Provider value={geolocation}>
        <MainHeader/>
        <Outlet />
    </geolocationContext.Provider>
  );
};






