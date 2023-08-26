import React from "react";
import * as SC from "../css";
import * as Type from "../../types";
import { useSignupPassword } from "../../hooks";

export const SignUpInputP: React.FC<Type.SignUpInputProps> = ({
  placeholder,
  name,
  length,
  inputRef,
  submitted,
}) => {
  const {
    input,
    seePassword,
    getValidateMsg,
    onChangeInput,
    onBlurSignupDispatch,
    onClickSeePassword,
  } = useSignupPassword({
    name,
    submitted,
  });

  return (
    <>
      <SC.EmailCodeDiv>
        <SC.AuthInput
          ref={inputRef}
          type={seePassword ? "text" : "password"}
          value={input}
          onBlur={onBlurSignupDispatch}
          onChange={onChangeInput}
          maxLength={length}
          placeholder={placeholder}
        />
        <SC.SignUpTimerDiv onClick={onClickSeePassword}>
          {seePassword ? "숨김" : "보기"}
        </SC.SignUpTimerDiv>
      </SC.EmailCodeDiv>
      <SC.ValidateInputMsg
        $signColor={getValidateMsg[1]}
        children={getValidateMsg[0]}
      />
    </>
  );
};
