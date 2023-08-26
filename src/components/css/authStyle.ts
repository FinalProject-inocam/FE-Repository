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

//폼 가운데 배치
const SignupFormLayout = sc.styled.div`
  ${Flex}
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

const SignupSection = sc.styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AuthInput = sc.styled.input<Partial<Styled>>`
  ${({ theme }) => theme.font.PretendardM}
  font-size: 16px;
  color: rgb(85, 85, 85);
  display: block;
  width: ${({ $width }) => ($width ? $width : "380px")};
  height: 56px;
  border: 1px solid rgb(214, 214, 214);
  border-radius: 4px;
  padding-left: 12px;

  &:focus{
    ${({ theme }) => theme.font.PretendardB}
    font-weight: 600;
    outline: none;
    border: 2px solid rgb(76,76,255)
  }
`;

const AuthInputsLayout = sc.styled.div`
  display: flex;
  gap: 10px;
`;

const SignupLabel = sc.styled.div<Partial<Styled>>`
  ${({ theme }) => theme.font.PretendardM}
  font-size: 16px;
  margin-bottom: 4px;
`;

const ValidateInputMsg = sc.styled.div<Partial<Styled>>`
  color : ${({ $signColor }) => ($signColor ? "rgb(76,76,255)" : "red")}
`;

const SignupSexLabel = sc.styled.label<Partial<Styled>>`
  ${Flex}
  ${({ theme }) => theme.font.PretendardSB}
  font-size: 18px;
  font-weight: 600;
  width: 185px;
  height: 56px;
  border-radius: 4px;
  color: ${({ $state }) => ($state ? "white" : "rgb(76,76,255)")};
  border: 1px solid ${({ $state }) => ($state ? "none" : "rgb(76,76,255)")};
  background-color: ${({ $state }) => ($state ? "rgb(76,76,255)" : "white")};
`;

const SignUpCertificateEmailDiv = sc.styled.div`
${Flex}
  width: 380px;
  height: 56px;
  border-radius: 4px;
  margin-top: 4px;
  background-color: rgb(199,199,203);
`;

const SignUpSubmitInput = sc.styled.input`
${Flex}
  width: 380px;
  height: 56px;
  border-radius: 4px;
  margin-top: 4px;
  background-color: rgb(76, 76, 255);

  ${({ theme }) => theme.font.PretendardSB}
  font-size: 18px;
  font-weight: 600;
  color: white;
`;

//위의 두 개가 비슷 나중에 수정 필요

const SignUpCertificateLayout = sc.styled.div`
  margin-top: 4px;
  display: flex;
  gap: 4px;
`;

const SignUpReSendDiv = sc.styled.div`
  ${Flex}
  width: 75px;
  height: 56px;
  border: 1px solid rgb(130, 130, 149);
  border-radius: 4px;
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

//이름 바꾸기, 관리자회원가입에도 쓰고 있음, 위에도 있음..
const LogoImgDiv = sc.styled.div`
 ${Flex}
`;

export {
  AuthInput,
  SignupSection,
  ValidateInputMsg,
  AuthInputsLayout,
  SignupLabel,
  SignupForm,
  SignupTitle,
  SignupSexLabel,
  SignupFormLayout,
  SignUpCertificateEmailDiv,
  SignUpCertificateLayout,
  SignUpReSendDiv,
  EmailCodeDiv,
  SignUpTimerDiv,
  SignUpSubmitInput,
  LogoImgDiv,
};
