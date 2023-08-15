import React, { createContext } from 'react';
import * as Hooks from '../hooks';
import { Outlet } from 'react-router-dom';
import { MainHeader } from '../components';
import * as Type from '../types/hooks/hooks';
export const geolocationContext = createContext<Partial<Type.useGeolocation> | null>(null)

export const MainRouter: React.FC = () => {
  const geolocation = Hooks.useGeolocation()
  Hooks.useDecodeDispatch()
  
  return (
    <geolocationContext.Provider value={geolocation}>
        <MainHeader/>
        <Outlet />
    </geolocationContext.Provider>
  );
};







