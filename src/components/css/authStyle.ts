import * as sc from "styled-components";
import { Styled } from "../../types";
import { Flex } from "./GlobalStyled";

const AuthInput = sc.styled.input<Partial<Styled>>`
  display: block;
  outline: none;
  padding-left: 16px;
  width:100%;
  font-size: 14px;
  color: #000;
  border: 1px solid black;
`;

const ValidateInputMsg = sc.styled.div<Partial<Styled>>`
  color : ${({ $signColor }) => ($signColor ? "green" : "red")}
`;

const SignupLabel = sc.styled.label<Partial<Styled>>`
  background-color: ${({ $state }) => ($state ? "black" : "yellow")};
`;

const SignupForm = sc.styled.form<Partial<Styled>>`
  ${Flex}
  width: 500px;
  margin: 0 auto;
  background-color: #eee;
`;

export { AuthInput, ValidateInputMsg, SignupLabel, SignupForm };
