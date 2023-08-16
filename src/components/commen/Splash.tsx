import React from 'react'
import { useMainHeader } from '../../hooks'
import * as SC from '../css'

export const Splash:React.FC = () => {
  const { SplashScreenRef } = useMainHeader()
  return (
    <SC.SplashScreen ref={SplashScreenRef}>
    <img 
      src={require('../../assets/SnappyWelloff.gif')} 
      alt='SplashScreen' />
  </SC.SplashScreen>
  )
}
