import React from 'react';
import * as SC from '../../components';
import * as Hook from '../../hooks';
import { css, styled, keyframes } from 'styled-components';
import { Styled } from '../../types';
import {MdOutlineKeyboardArrowDown} from 'react-icons/md'

export const InnoCar: React.FC = () => {

  // useInnoCarRef에서 제어 중인 Ref와 인터렉티브 동작제어 및 상태관련 배열 호출 
  const { 
    sectionRef1,
    sectionRef1ImgRef,
    sectionRef2,
    sectionRef3,
    Sections3ScrollGridText,
    sectionRef4,
    innocarCharacterRef,
    sectionRef3InnerRef,
    sectionRef3FlexRef,
    onToggleCarCharacter,
    onToggleTechnic
  } = Hook.useInnoCarRef()

  const {onNavigate} = Hook.useRouter() 

  // useModelOne에서 제어 중인 상태에 대한 커스텀훅, 첫번째 섹션의 TechnicalLists 관련 배열을 호출 
  const { M1CharacterTitle, TechnicalLists } = Hook.useModelOne()
  const animationText = "ANOTHERWORLD".split("")
  const spans = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2];

  return (
    <>
      <SC.SectionFlex $fd='column' ref={sectionRef1} $bColor="white" $gap={10}>
        <SC.CustomH1 $size={3} children="INNO-Create I"/>
        <SectionRef1Img ref={sectionRef1ImgRef}><SC.FigureObjectFitImg width='1024px' height='450px' src={require('../../assets/porshce/porsche-normal.png')} alt='porsche-normal' types="innoCarSection1Img"/></SectionRef1Img>
        <Section1BtnFlex $gap={20}>
        <SectionFlex1Btn $bColor='lightgray3' onClick={onToggleCarCharacter} children="기술사양"/>
        <SectionFlex1Btn onClick={onNavigate({url:'order'})} children="주문하기" />
        </Section1BtnFlex>

        <UnderArrow 
          onClick={() => {
            if (sectionRef2 !== undefined && sectionRef2.current) {
              sectionRef2.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }}
          children={<MdOutlineKeyboardArrowDown size={"30px"}/>} />

        {/* 모달...  */}
        <SC.Section1ModalLayout ref={innocarCharacterRef} >
          <SC.Artical $ai='flex-start' $fd='column' $gap={15}>
            {/* Artical.Body */}
            <SC.CustomH1 $size={2} children="INNO-Create I" />
            <SC.FlexBox>
              {M1CharacterTitle.map((lists, idx) => (
                <SC.FlexBox 
                  key={idx} $fd='column' $gap={5} $ai='flex-start' 
                  style={{ 
                      borderRight: idx === M1CharacterTitle.length - 1 ? "none" : "1px solid lightgray", 
                      paddingLeft: idx === 0 ? "0" : "20px", paddingRight: "20px" }}>
                  <SC.CustomH2 children={lists[0]} />
                  <SC.CustomH3 $size={0.75} children={lists[1]} />
                </SC.FlexBox>))}
            </SC.FlexBox>

            {/* 나가기버튼 */}
            <SC.ExitBtn
              onClick={onToggleCarCharacter}>
              <SC.ExitLine $rotate={45} />
              <SC.ExitLine $rotate={-45} />
            </SC.ExitBtn>

          </SC.Artical>
          <SC.Artical $height="fin-content" $ai='flex-start' $bColor="white">
            <div style={{ width: "100%", paddingTop: "50px" }}>
              <SC.CusTomModalH1 $size={2} children="기술 사양" />
              {/* useModelOne에서 호출한 TechnicalLists 배열로 map 실행 */}
              {TechnicalLists.map(({title, technicalInfoCategory, infoBoolean, setInfoBoolean}:any) => (
                <SC.TechnicalListInner 
                  key={title}
                  title={title}
                  technicalInfoCategory={technicalInfoCategory}
                  onToggle={onToggleTechnic}
                  infoBoolean={infoBoolean}
                  setInfoBoolean={setInfoBoolean}/>
              ))}
            </div>
           {/* useModelOne에서 호출한 TechnicalListInnerImg(innoCarImgText) map 실행 */}
            <SC.TechnicalListInnerImg />
          </SC.Artical>
          <SC.Artical />
        </SC.Section1ModalLayout>

      </SC.SectionFlex>

      {/* SectionFlex-sectionRef2 ----------------------------------- */}
      <SC.SectionFlex ref={sectionRef2} >
        <SC.FlexBox as='figure' style={{ width: "100%" }}>
          <SC.Section3Video 
          muted loop autoPlay playsInline
            src={`https://finalimgbucket.s3.amazonaws.com/918148fc-55f3-4280-a899-9e78e98adf2a`}  />
        </SC.FlexBox>
        <Section2AnnimationText $spans={spans}>
          {animationText.map((text,idx) => <span key={idx} children={text} />)}
        </Section2AnnimationText>
        {/* ANOTHER\nWORLD */}
        <HorizontallyLine />
      </SC.SectionFlex>

      {/* SectionFlex-sectionRef3 ----------------------------------- */}
      <SC.SectionFlex ref={sectionRef3} >
        <SC.Sections3ScrollInnerFlex ref={sectionRef3FlexRef} $fd='column' $gap={20} $ai='flex-start'>
          <SC.CustomH1 $size={2} $color='white' children="버튼을 누르면 솟구치는 아드레날린" />
          <SC.GridBox $gtc='repeat(3, 1fr)'>
            {Sections3ScrollGridText.map(list => <SC.Sections3ScrollGridInner key={list} children={list}/>)}
          </SC.GridBox>
        </SC.Sections3ScrollInnerFlex>
        {/* 스크롤 이벤트에 따라서, 글짜 제어하기 */}
        <SC.FigureObjectFitImg 
          width='100%' height='100%' alt='porsche-normal'
          src={'https://finalimgbucket.s3.amazonaws.com/2c6b88b0-f333-44e8-9bcf-12c03d76ebb7'}  />
        <SC.Section3ScrollDiv ref={sectionRef3InnerRef} />
      </SC.SectionFlex>


      {/* SectionFlex-sectionRef4 ----------------------------------- */}
      <SC.SectionFlex ref={sectionRef4}>
        <SC.FigureObjectFitImg 
          width='100%' height='100%' alt='porsche-normal'
          src={'https://finalimgbucket.s3.amazonaws.com/f775af66-a592-49bd-b98e-5cc53aa3d54b'}  />
      </SC.SectionFlex>
    </>
  )
};

const SectionFlex1Btn = styled.div<Partial<Styled>>`
${SC.Flex}
${SC.cursor}
margin-top: px;
width: 200px;
height: 40px;
border-radius: 10px;

${({$bColor}) => $bColor === 'lightgray3' 
  ? css`
    color: white;
    background-color: ${({theme}) => theme.color[$bColor]};
  `
  : css`
    box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 10px;
  `
  }
`

const Section1BtnFlex = styled.div<Partial<Styled>>`
  ${SC.Flex}
  @media (max-width: 700px) {
    flex-direction: column;
    position: absolute;
    bottom: 100px;
  }
`

const SectionRef1Img = styled.div`
  opacity: 0;
  width: 100%;
  transform:scale(1);
  transition: all 1.5s linear;
`


const KeyFrameArrow = keyframes`
  0% {
      ottom: 50px;
    }
    50% {
      bottom: 40px;
    }
    100% {
      bottom: 50px;
    }
`


const KeyFrameAnimationText = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const UnderArrow = styled.div`
  ${SC.cursor}
  position: absolute;
  bottom: 50px;
  animation: ${KeyFrameArrow} 0.5s infinite linear;
`

const Section2AnnimationText = styled(SC.PerDiv)<Partial<Styled>>`
  position: absolute;
  bottom: 100px;
  left: 40px;

  span {
    color: ${({theme}) => theme.color.white};
    font-family: 'Giants-Inline';
    font-size: 4rem;
    display: inline-block;
    margin: 0 -.05em;
    animation: ${KeyFrameAnimationText} 2s infinite alternate;

    @media (max-width: 1024px) {
      font-size: 6.25vw;
    }
  }

  ${({$spans}) => $spans && $spans.map((delay, idx) => css`
    span:nth-child(${idx+2}) {
      animation-delay: ${delay}s;
    }
  `)}
`

const HorizontallyLine = styled.div`
  position: absolute;
  bottom: 100px;
  left: 30px;
  width: 95%;
  border: 3px solid white;
`

