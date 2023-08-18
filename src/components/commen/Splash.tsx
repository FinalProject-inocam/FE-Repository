import React from 'react'
import { useMainHeader } from '../../hooks'
import Lottie from 'react-lottie';
import * as SC from '../css'
import LottieData from '../../assets/logo/300_logo.json'

export const Splash:React.FC = () => {
  const { SplashScreenRef } = useMainHeader()
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: LottieData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <SC.SplashScreen ref={SplashScreenRef}>

      <Lottie
        options={defaultOptions}
        height={300}
        width={300}
        isClickToPauseDisabled={false}
      />
  </SC.SplashScreen>
  )
}