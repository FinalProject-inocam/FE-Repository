import * as sc from "styled-components";
import { Styled } from "../../types";

const AuthInput = sc.styled.input<Partial<Styled>>`
  display: block;
  outline: none;
  padding-left: 16px;

  font-size: 14px;
  color: #000;
`;

const ValidateInputMsg = sc.styled.div<Partial<Styled>>`
  color : ${({ $signColor }) => ($signColor ? "green" : "red")}
`;

export { AuthInput, ValidateInputMsg };
