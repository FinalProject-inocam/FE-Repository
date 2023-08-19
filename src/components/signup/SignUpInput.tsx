import React from "react";
import * as SC from "../css";
import * as Type from "../../types";
import { useSignupInput } from "../../hooks";

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
    </>
  );
};
