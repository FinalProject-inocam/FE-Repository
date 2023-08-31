import * as SC from "../GlobalStyled"
import { Styled } from "../../../types"
import { styled } from "styled-components"

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

export {
  AdminNav,
  AdminNavLayout,
  AdminNavInnerFlex
}
