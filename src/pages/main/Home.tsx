import React from 'react';
import { css, styled } from 'styled-components';
import { Styled } from '../../types';
import { useHome } from '../../hooks';
import { Flex, FlexBox, cursor, theme } from '../../components';

export const Home: React.FC = () => {
  const { sectionRef1, sectionRef2, sectionRef3, sectionRef4, sectionRef5, sectionContentRef } = useHome()
  const videoUrl:string = 'https://finalimgbucket.s3.ap-northeast-2.amazonaws.com/61bd94a0-39e9-4aff-a677-dfc4167be03b'

  return (
    <div style={{ wordBreak: "break-word" }}>
      <SectionFlex ref={sectionRef1} $color="red" style={{ overflow: "hidden", position: "relative" }}>
        <SectionOneContent ref={sectionContentRef}>
          <CustomPSize $size={4.375} $mSize={5.46} $font={theme.font.PretendardSB}>ANOTHER WORLD</CustomPSize>
          <CustomPSize $size={2.5} $mSize={3.125}>지금까지 없던 새로운 경험</CustomPSize>
          <SectionOneMoreBTN>MORE</SectionOneMoreBTN>
        </SectionOneContent>
        <FlexBox as="figure" style={{ width: "100%" }}>
          <video src={videoUrl} muted loop autoPlay style={{ position: "absolute", zIndex: "-1", width:"2400px", top: "0" }} />
        </FlexBox>
      </SectionFlex>
      <Section ref={sectionRef2} $color="skyblue" style={{ overflow: "hidden" }}>
        <FlexBox as="figure" style={{ width: "100%" }}>
          <img src={require('../../assets/1920pxtest.jpg')} alt="게임" style={{width:"2400px"}} />
        </FlexBox>
      </Section>
      <Section ref={sectionRef3} $color="green" />
      <Section ref={sectionRef4} $color="yellow" />
      <Section ref={sectionRef5} $color="coral" />
    </div>
  );
};


const Section = styled.section<Partial<Styled>>`
  width: 100%;
  height: 650px;
  border-bottom: 3px dotted ${({ $color }) => $color};
`
const SectionFlex = styled(Section)`
  ${Flex}
`

const SectionOneContent = styled.div`
  ${Flex}
  transform: translateY(20%);
  flex-direction: column;
  gap: 20px;
  position: absolute;
  bottom: 8vh;
  transition: all 0.15s linear;
`

const CustomPSize = styled.p<Partial<Styled>>`
  color: white;
  font-size: ${({$size}) => `${$size}rem`};
  ${({$font}) => css`
   ${$font}
  `}
  @media (min-width: 1280px) {
    font-size: ${({$mSize}) => `${$mSize}vw`};
  }
`

const SectionOneMoreBTN = styled.div`
  ${cursor}
  width: 150px;
  height: 35px;
  line-height: 35px;
  font-size: 0.875rem;
  text-align: center;
  border: 1px solid white;
  color: white;
  margin-top: 20px;

  @media (min-width: 1280px) {
    width: 11.718vw;
    height: 2.734vw;
    line-height: 2.734vw;
    font-size: 1.093vw;
  }
`


