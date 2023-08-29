import React from "react";
import * as SC from "../css";
import * as Type from "../../types";
import { useSignupNickName } from "../../hooks";

export const SignUpInputN: React.FC<Type.SignUpInputProps> = ({
  placeholder,
  name,
  type,
  length,
  inputRef,
  submitted,
}) => {
  const { input, getValidateMsg, onChangeInput, onBlurSignupDispatch } =
    useSignupNickName({
      name,
      submitted,
    });

  return (
    <>
      <SC.AuthInput
        ref={inputRef}
        type={type}
        value={input}
        onBlur={onBlurSignupDispatch}
        onChange={onChangeInput}
        maxLength={length}
        placeholder={placeholder}
        $state={true}
      />
      <SC.ValidateInputMsg
        $signColor={getValidateMsg[1]}
        children={getValidateMsg[0]}
      />
    </>
  );
};
