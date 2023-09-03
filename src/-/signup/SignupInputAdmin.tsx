import React from "react";
import * as SC from "../css";
import * as Type from "../../types";
import { useSignupInput } from "../../hooks";

export const SignUpInputAdmin: React.FC<Type.SignUpInputBasicProps> = ({
  name,
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
        type="text"
        value={input}
        onBlur={onBlurSignupDispatch}
        onChange={onChangeInput}
        placeholder="관리자 코드를 입력해주세요"
        $state={true}
      />
    </>
  );
};
