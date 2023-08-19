import React from "react";
import * as SC from "../css";
import * as Type from "../../types";
import { useSignupEmail } from "../../hooks";


export const SignUpInputE: React.FC<Type.SignUpInputProps> = ({ 
  placeholder, name, type, length, inputRef, submitted }) => {
  const { input, getValidateMsg, onChangeInput, onBlurSignupDispatch } = useSignupEmail({
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
      />
      <SC.ValidateInputMsg
        $signColor={getValidateMsg[1]}
        children={getValidateMsg[0]}
      />
    </>
  );
};
