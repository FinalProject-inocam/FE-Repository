import React from 'react';
import { styled } from 'styled-components';
import { FlexBox, GridBox, GridMergedSpaceFlex } from '../../components';

export const DecorationDetail: React.FC = () => {

  return (
    <div style={{ height: "calc(100vh - 34px)" }}>
      <h1>그리드 레이아웃 연습하기</h1>
      <Section>
        <Header>헤더</Header>
        <Nav>네비게이션</Nav>
        <Main>
          <h2>GridMergedSpace 연습하기</h2>
          <GridBox $gtc="repeat(auto-fill, minmax(25%, auto))" $gar="minmax(200px, auto)">

            <GridMergedSpaceFlex $mergedgcs={2} $mergedgce={5} $mergedgrs={2} $mergedgre={5} style={{ backgroundColor: "red" }}>나요 </GridMergedSpaceFlex>
            <FlexBox style={{ backgroundColor: "lightcoral" }}>아</FlexBox>
            <FlexBox style={{ backgroundColor: "lightcoral" }}>아</FlexBox>
            <FlexBox style={{ backgroundColor: "lightcoral" }}>아</FlexBox>
            <FlexBox style={{ backgroundColor: "lightcoral" }}>아</FlexBox>
            <FlexBox style={{ backgroundColor: "lightcoral" }}>아</FlexBox>
            <FlexBox style={{ backgroundColor: "lightcoral" }}>아</FlexBox>
            <FlexBox style={{ backgroundColor: "lightcoral" }}>아</FlexBox>
            <FlexBox style={{ backgroundColor: "lightcoral" }}>아</FlexBox>
            <FlexBox style={{ backgroundColor: "lightcoral" }}>아</FlexBox>
            <FlexBox style={{ backgroundColor: "lightcoral" }}>아</FlexBox>
            <FlexBox style={{ backgroundColor: "lightcoral" }}>아</FlexBox>
            <FlexBox style={{ backgroundColor: "lightcoral" }}>아</FlexBox>
            <FlexBox style={{ backgroundColor: "lightcoral" }}>아</FlexBox>

          </GridBox>
        </Main>
        <Footer>푸터</Footer>
      </Section>
    </div>
  );
};


// Layout grid-template-areas
// Inner Grid = <GridMergedSpace>

const Section = styled.section`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-areas:
    "head head"
    "nav  main"
    "nav  foot";
  grid-template-rows: 100px 1fr 20px;
  grid-template-columns: 150px 1fr;
`

const Header = styled.header`
  grid-area: head;
  background-color: #8ca0ff;
`

const Nav = styled.nav`
  grid-area: nav;
  background-color: #ffa08c;
`
const Main = styled.main`
  grid-area: main;
  background-color: #ffff24;
`

const Footer = styled.footer`
grid-area: foot;
background-color: #8cffa0;
`