import React from 'react';
import { styled } from 'styled-components';
import { Styled } from '../../types';
import { useHome } from '../../hooks';

export const Home: React.FC = () => {
  const {SplashScreenRef, sectionRef1, sectionRef2, sectionRef3, sectionRef4} = useHome()

  return (
    <div>
      <SplashScreen ref={SplashScreenRef}>
        <img src={require('../../assets/SnappyWelloff.gif')} style={{height:"100%", display:"block", margin:"0 auto"}} alt='SplashScreen'/>
      </SplashScreen>
      <Section ref={sectionRef1} $color="red" />
      <Section ref={sectionRef2} $color="skyblue" />
      <Section ref={sectionRef3} $color="green" />
      <Section ref={sectionRef4} $color="yellow" />
    </div>
  );
};


const Section = styled.section<Partial<Styled>>`
  width: 100%;
  height: 650px;
  border-bottom: 3px dotted red;
`

const SplashScreen = styled.div<Partial<Styled>>`
  position: absolute;
  top: 100vh;
  width: 100%;
  height: 100vh;
  background-color:white;
  transition: all 1s linear;
`