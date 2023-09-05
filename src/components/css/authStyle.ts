import * as sc from "styled-components";
import { Styled } from "../../types";
import { Flex, Grid } from "./GlobalStyled";
import { cursor } from "./GlobalStyled";

//타이틀 : 이노캠모터스에 오신걸 환영합니다
const AuthTitle = sc.styled.div<Partial<Styled>>`
  ${Flex};
  ${({ theme }) => theme.font.PretendardM};
  font-size: 40px;
  margin-top: 170px;
  margin-bottom: 30px;
`;

//폼
const AuthForm = sc.styled.form<Partial<Styled>>`
  ${Grid}
  width: ${({ $width }) => $width};
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
  color: ${({ theme }) => theme.color.lightgray3};
  display: block;
  width: ${({ $width }) => ($width ? $width : "380px")};
  height: 56px;
  border: 1px solid ${({ $state, theme }) =>
    $state ? theme.color.lightgray4 : "red"};
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
  ${cursor}
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
  cursor: ${({ $state }) => ($state ? "pointer" : "auto")};
  pointer-events: ${({ $state }) => ($state ? "auto" : "none")};
  font-size: 18px;
  font-weight: 600;
  color: white;
`;

const SignUpCertificateEmailDiv = sc.styled.div<Partial<Styled>>`
  ${CommonABStyles}
  background-color: ${({ $state, theme }) =>
    $state ? theme.color.blue : theme.color.lightgray0};
`;

const AuthSubmitInput = sc.styled.input<Partial<Styled>>`
  ${CommonABStyles}
  ${({ theme }) => theme.font.PretendardSB}
  background-color: ${({ $state, theme }) =>
    $state ? theme.color.blue : theme.color.textColorSub};
`;

const SignUpReSendDiv = sc.styled.div`
${CommonBoxStyles}
  width: 75px;
  border: 1px solid ${({ theme }) => theme.color.blue};
  color: ${({ theme }) => theme.color.blue};
`;

const EmailCodeDiv = sc.styled.div<Partial<Styled>>`
  position: relative;
  width: ${({ $width }) => ($width ? $width : "380px")};
`;
const SignUpInputInnerDiv = sc.styled.div<Partial<Styled>>`
  position: absolute;
  top: 16px;
  right: 12px;
`;

//Login: sns
const LoginSnsButton = sc.styled.div<Partial<Styled>>`
${CommonBoxStyles}
  ${cursor}
  ${({ theme }) => theme.font.PretendardM}
  font-size: 16px;
  width: 380px;
  gap: 10px;
  ${({ $types }) =>
    $types === "kakao"
      ? sc.css`background-color:#FEE500`
      : $types === "naver"
      ? sc.css`background-color:#03C75A; color:#FFFFFF`
      : sc.css`background-color:#FFFFFF; border: 1px solid ${({ theme }) =>
          theme.color.lightgray0}`}
`;

const LoginSignupButton = sc.styled.div`
${cursor}
`;

export {
  AuthInput,
  ValidateInputMsg,
  SignupLabel,
  AuthForm,
  AuthTitle,
  SignupGenderLabel,
  SignUpCertificateEmailDiv,
  SignUpCertificateLayout,
  SignUpReSendDiv,
  EmailCodeDiv,
  SignUpInputInnerDiv,
  AuthSubmitInput,
  LoginSnsButton,
  LoginSignupButton,
};
