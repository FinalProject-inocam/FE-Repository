import React from 'react';
import { styled } from 'styled-components';
import { Styled } from '../../types';
import { useHome } from '../../hooks';

export const Home: React.FC = () => {
  const {sectionRef1, sectionRef2, sectionRef3, sectionRef4} = useHome()

  return (
    <div style={{wordBreak:"break-word"}}>
      <Section ref={sectionRef1} $color="red">
      </Section>
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