import React from "react";
import * as SC from "../css";
import * as Type from "../../types";
import { useSignupInput } from "../../hooks";
import * as RTK from "../../redux";

export const SignUpInput: React.FC<Type.SignUpInputProps> = ({
  placeholder,
  name,
  type,
  length,
  inputRef,
  submitted,
}) => {
  const { input, onChangeInput, onBlurSignupDispatch } = useSignupInput({
    name,
    submitted,
  });
  const getValidateMsg = RTK.useAppSelector(RTK.selectValiditeMsg);

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
      {name === "email" && getValidateMsg.emailMsg && (
        <SC.ValidateInputMsg
          $signColor={getValidateMsg.emailMsg[1]}
          children={getValidateMsg.emailMsg[0]}
        />
      )}
    </>
  );
};
