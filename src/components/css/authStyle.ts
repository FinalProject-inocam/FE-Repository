import * as sc from "styled-components";
import { Styled } from "../../types";
import { Flex, Grid } from "./GlobalStyled";

//타이틀 : 이노캠모터스에 오신걸 환영합니다
const SignupTitle = sc.styled.div<Partial<Styled>>`
  ${Flex};
  ${({ theme }) => theme.font.PretendardM};
  font-size: 40px;
  margin-top: 170px;
  margin-bottom: 30px;
`;

//폼
const SignupForm = sc.styled.form<Partial<Styled>>`
  ${Grid}
  width: 920px;
  padding: 40px;
  padding-top: 50px;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 10px;
`;

const SignUpCertificateLayout = sc.styled.div<Partial<Styled>>`
${Flex}
  margin-top: 4px;
`;

const AuthInput = sc.styled.input<Partial<Styled>>`
  ${({ theme }) => theme.font.PretendardM}
  font-size: 16px;
  color: ${({ theme }) => theme.color.darkgray3};
  display: block;
  width: ${({ $width }) => ($width ? $width : "380px")};
  height: 56px;
  border: 1px solid ${({ theme }) => theme.color.lightgray4};
  border-radius: 4px;
  padding-left: 12px;

  &:focus{
    ${({ theme }) => theme.font.PretendardB}
    font-weight: 600;
    outline: none;
    border: 2px solid ${({ theme }) => theme.color.blue}
  }
`;

const SignupLabel = sc.styled.div<Partial<Styled>>`
  ${({ theme }) => theme.font.PretendardM}
  font-size: 16px;
  margin-bottom: 4px;
`;

const ValidateInputMsg = sc.styled.div<Partial<Styled>>`
  color : ${({ $signColor, theme }) =>
    $signColor ? theme.color.blue : theme.color.red3}
`;

const CommonBoxStyles = sc.css`
${Flex}
height: 56px;
border-radius: 4px;
`;

const SignupGenderLabel = sc.styled.label<Partial<Styled>>`
  ${CommonBoxStyles}
  ${({ theme }) => theme.font.PretendardSB}
  font-size: 18px;
  font-weight: 600;
  width: 185px;
  color: ${({ $state, theme }) => ($state ? "white" : theme.color.blue)};
  border: 1px solid ${({ $state, theme }) =>
    $state ? "none" : theme.color.blue};
  background-color: ${({ $state, theme }) =>
    $state ? theme.color.blue : "white"};
`;

//CommonAvailableStyles
const CommonABStyles = sc.css<Partial<Styled>>`
${CommonBoxStyles}
  width: 380px;
  margin-top: 4px;
  pointer-events: ${({ $state }) => ($state ? "auto" : "none")};
  background-color: ${({ $state, theme }) =>
    $state ? theme.color.blue : theme.color.lightgray3};
`;

const SignUpCertificateEmailDiv = sc.styled.div<Partial<Styled>>`
  ${CommonABStyles}
`;

const SignUpSubmitInput = sc.styled.input<Partial<Styled>>`
  ${CommonABStyles}
  ${({ theme }) => theme.font.PretendardSB}
  font-size: 18px;
  font-weight: 600;
  color: white;
`;

const SignUpReSendDiv = sc.styled.div`
${CommonBoxStyles}
  width: 75px;
  border: 1px solid ${({ theme }) => theme.color.lightgray2};
  color: rgb(85, 85, 85);
`;

const EmailCodeDiv = sc.styled.div<Partial<Styled>>`
  position: relative;
  width: ${({ $width }) => ($width ? $width : "380px")};
`;
const SignUpTimerDiv = sc.styled.div`
  position: absolute;
  top: 16px;
  right: 12px;
`;

export {
  AuthInput,
  ValidateInputMsg,
  SignupLabel,
  SignupForm,
  SignupTitle,
  SignupGenderLabel,
  SignUpCertificateEmailDiv,
  SignUpCertificateLayout,
  SignUpReSendDiv,
  EmailCodeDiv,
  SignUpTimerDiv,
  SignUpSubmitInput,
};
