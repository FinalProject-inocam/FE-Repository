import React from "react";
import { AuthInput } from "../css";
import * as Type from "../../types";
import { useSignupInput } from "../../hooks";

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
    onChangeInput,
    onBlurSignupDispatch,
    onClickSeePassword,
  } = useSignupInput({
    name,
    submitted,
  });

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <AuthInput
        ref={inputRef}
        type={seePassword ? "text" : "password"}
        value={input}
        onBlur={onBlurSignupDispatch}
        onChange={onChangeInput}
        maxLength={length}
        placeholder={placeholder}
      />
      <div
        onClick={onClickSeePassword}
        style={{ position: "absolute", right: "0.5rem", top: "0" }}
      >
        {seePassword ? "text" : "password"}
      </div>
    </div>
  );
};
