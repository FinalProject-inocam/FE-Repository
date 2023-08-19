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
      <div style={{ position: "relative", width: "100%" }}>
        <SC.AuthInput
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
      <SC.ValidateInputMsg $signColor={getValidateMsg[1]} children={getValidateMsg[0]} />
    </>
  );
};
