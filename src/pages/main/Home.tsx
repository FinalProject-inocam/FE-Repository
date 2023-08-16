import React from 'react'; 
import { css, styled } from 'styled-components';
import { Styled } from '../../types';
import { useHome } from '../../hooks';
import { Flex, FlexBox, cursor, theme } from '../../components';
import { Threejs } from '../Threejs';

export const Home: React.FC = () => {
  const { sectionRef1, sectionRef2, sectionRef3, sectionRef4, sectionRef5, sectionContentRef } = useHome()
  const videoUrl: string = 'https://finalimgbucket.s3.ap-northeast-2.amazonaws.com/61bd94a0-39e9-4aff-a677-dfc4167be03b'

  return (
    <div style={{ wordBreak: "break-word" }}>
      <SectionFlex ref={sectionRef1} $color="red" $position="relative">
        <SectionOneContent ref={sectionContentRef}>
          <CustomPSize $size={4.375} $mSize={5.46} $font={theme.font.PretendardSB}>ANOTHER WORLD</CustomPSize>
          <CustomPSize $size={2.5} $mSize={3.125}>지금까지 없던 새로운 경험</CustomPSize>
          <SectionOneMoreBTN onClick={() => {
						if (sectionRef2.current) {
							sectionRef2.current.scrollIntoView({
								behavior: "smooth",
								block: "start",
							});
						}
					}}>MORE</SectionOneMoreBTN>
        </SectionOneContent>
        <FlexBox as="figure" style={{ width: "100%" }}>
          <SectionOneVideo src={videoUrl} muted loop autoPlay playsInline />
        </FlexBox>
      </SectionFlex>
      <SectionFlex ref={sectionRef2} $color="orange" $bColor="blackM">
        <SectionTwo>
          <Threejs />
          <CustomPSize $size={9.375} $mSize={10.416} $color="darkGray">INNOCAM</CustomPSize>
          <SectionOneContent>
          <CustomPSize $size={1.25} $mSize={1.388} $font={theme.font.PretendardSB}>ANOTHER WORLD</CustomPSize>
          <CustomPSize $size={0.75} $mSize={0.833}>지금까지 없던 새로운 경험</CustomPSize>
          <SectionOneMoreBTN>MORE</SectionOneMoreBTN>
        </SectionOneContent>
        </SectionTwo>
        <Triangle/>
        <button onClick={() => {
						if (sectionRef3.current) {
							sectionRef3.current.scrollIntoView({
								behavior: "smooth",
								block: "start",
							});
						}
					}} style={{position:"absolute", right:"0"}}>아래로 내려가기</button>
      </SectionFlex>

      <Section ref={sectionRef3} $color="green" $bColor="darkBlue"/>
      <Section ref={sectionRef4} $color="yellow">
        <Triangle2 />
      </Section>
      <Section ref={sectionRef5} $color="coral">
        <FlexBox as="figure" style={{ width: "100%" }}>
          <img src={require('../../assets/1920pxtest.jpg')} alt="게임" style={{ width: "2400px" }} />
        </FlexBox>
      </Section>
    </div>
  );
};


const Section = styled.section<Partial<Styled>>`
  width: 100%;
  height: 650px;
  border-bottom: 3px dotted ${({ $color }) => $color};
  overflow: hidden;
  position:relative;
  background-color: ${({ $bColor, theme }) => theme.color[`${$bColor}`]};
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
  z-index: 10;
`

const CustomPSize = styled.p<Partial<Styled>>`
  color: white;
  font-size: ${({ $size }) => `${$size}rem`};
  color :${({ $color, theme }) => theme.color[`${$color}`]};
  ${({ $font }) => css`
  ${$font}
  `}
  @media (min-width: 1280px) {
    font-size: ${({ $mSize }) => `${$mSize}vw`};
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

const SectionOneVideo = styled.video`
  position: absolute;
  z-index: -1;
  width:2400px;
  top: 0;
  @media (min-width: 2400px) {
    width:100%;
  }
`

const SectionTwo = styled.article`
  ${Flex}
  /* background-color: rgba(150,150,150,0.3); */
  max-width: 1440px;
  width: 100%;
  height: 100%;
  border: 1px double dotted;

  h1{
    font-size: 150px;
    color:#26252B;
  }
`

const Triangle = styled.div<Partial<Styled>>`
  position: absolute;
  bottom: 0;
	width: 0;
	height: 0;
	border-left: 100vw solid transparent; 
	border-right: 0 solid transparent; 
	border-bottom: 100px solid ${({theme}) => theme.color.darkBlue}; 
`

const Triangle2 = styled.div<Partial<Styled>>`
  position: absolute;
  top: 0;
	width: 0;
	height: 0;
	border-left: 0 solid transparent; 
	border-right: 100vw solid transparent; 
	border-top: 100px solid ${({theme}) => theme.color.darkBlue}; 
`