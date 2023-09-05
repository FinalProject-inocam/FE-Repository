import * as SC from "../GlobalStyled"
import { Styled } from "../../../types"
import { css, styled } from "styled-components"
import { Bar, Line } from "react-chartjs-2"

const AdminNav = styled.nav`
  height:100vh;
  padding: 35px 0;
  background-color: ${({ theme }) => theme.color.adminNav};
  position: sticky;
  top: 0;
`

const AdminNavLayout = styled.div<Partial<Styled>>`
  ${SC.Flex}
  margin-left: auto;  
  width: 70%;

  h3 {
    ${SC.Flex}
    font-size: 1rem;
    width: 100%;
    padding: 20px 0;
    border-radius: ${({ $state }) => $state ? "20px 0 0 20px" : "none"};
    background-color: ${({ $state, theme }) => $state ? theme.color.lightgray1 : theme.color.adminNav};
    color: ${({ $state }) => $state ? "black" : "white"};
  }

  .currentLogation, .top, .bottom {
    position: absolute;
  }

  .currentLogation {
    width: 10px;
    height: 10px;
    background-color:${({ $state, theme }) => $state ? theme.color.lightgray1 : theme.color.adminNav};
  }

  .top, .bottom {
    margin-left: auto;
    width: 10px;
    height: 10px;
    background-color: ${({ theme }) => theme.color.adminNav};
    z-index: 2;
  }

  .top {
    border-radius: 0 0 20px 0;
  }
  .bottom {
    border-radius: 0 20px 0 0;
  }
`

const AdminNavInnerFlex = styled.div`
  ${SC.Flex}
  height : 10px;
  width : 10px;
  margin-left : auto;
  position : relative;
`
const DeshboardGrid = styled.section<Partial<Styled>>`
  ${SC.Grid}
  background-color: ${({ theme }) => theme.color.lightgray1};
`

const ChartLayout = styled.div<Partial<Styled>>`
  height: 100%;
  padding: ${({ $padding }) => $padding};
  background-color: ${({ $bColor, theme }) => theme.color[`${$bColor}`]};
`


const ChartInner = styled.div<Partial<Styled>>`
  ${SC.Flex}
  padding: 15px;
  background-color: white;
  border-radius: 10px;

  ${({ $types }) => $types === "left" && css`
    box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 10px;  
  `}
`

const RatioBox = styled.div<Partial<Styled>>`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  background-color: ${({ $bColor, theme }) => theme.color[`${$bColor}`]};
`
const DataTypeSelect = styled.div<Partial<Styled>>`
  ${SC.Flex}
  ${SC.cursor}
  width: 100px;
  height: 42px;
  position: relative;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.lightgray5};
`

const DataTypeOptions = styled.div`
  position: absolute;
  bottom: ${-42 * 3 - 10}px;
  width: 100px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.lightgray5};

  div {
    ${SC.Flex}
    height: 42px;
  }
`

const DateShowPeriod = styled.div<Partial<Styled>>`
  ${SC.Flex}
  width: 270px;
  border-radius: 5px;
  height: 42px;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.lightgray5};
`

const PurchaseSecondRowInner = styled.div<Partial<Styled>>`
  ${SC.Flex}
  height: 100%;
  border: 1px solid #DEDEE0;
  border-radius: 10px;
  padding: 15px 20px;
`

const CustomBar = styled(Bar)`
  width: 100%;
  max-height: 90%;
  transition: all 0.3s linear;
  
`


const CustomLine = styled(Line)`
  width: 100%;
  max-height: 90%;
  transition: all 0.3s linear;
  
`

const CivilComplaintLists = styled.div<Partial<Styled>>`
  ${SC.Grid}
  border-right: 1px solid #DEDEDE;
`

const ChatNumber = styled.div<Partial<Styled>>`
  ${SC.Flex}
  width: 100%;
  height: 25px;
  font-size: 0.875rem;
  border-radius: 30px;
  ${({ $bColor, theme }) => $bColor === 'blue'
    ? css`
      background-color: ${theme.color[$bColor]};
      color: white;
    `
    : css`
      border: 1px solid #DEDEDE;
    `
  }
`

const ChatRoomOutLine = styled.div<Partial<Styled>>`
  ${SC.Flex}
  height: ${({ $height }) => $height}; 
  overflow: auto ;
  padding: 0 30px ;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    height: 30%;
    background: ${({ theme }) => theme.color.blue};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, 0.1);
  }
`

const ChatRoomList = styled.div<Partial<Styled>>`
  ${SC.cursor}
  ${SC.Flex}
  width: 100%;
  height: 104px;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #DEDEE0;
  background: ${({ $bColor, theme }) => $bColor ? theme.color[$bColor] : "#FFF"} 
`


export {
  AdminNav,
  AdminNavLayout,
  AdminNavInnerFlex,

  // 대시보드
  DeshboardGrid,
  ChartLayout,
  ChartInner,
  RatioBox,
  DataTypeSelect,
  DataTypeOptions,
  DateShowPeriod,
  PurchaseSecondRowInner,
  CustomBar,
  CustomLine,

  // 민원상담관련
  CivilComplaintLists,
  ChatNumber,
  ChatRoomOutLine,
  ChatRoomList,

}
