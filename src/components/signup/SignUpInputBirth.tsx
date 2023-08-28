import { FC } from "react";
import * as SC from "../css";
import { useSignupInput } from "../../hooks";
import * as Type from "../../types";

export const SignUpInputBirth: FC<Type.SignUpInputBirthProps> = ({
  name,
  inputRef,
  submitted,
}) => {
  const { input, onChangeInput, onBlurSignupDispatch } = useSignupInput({
    name,
    submitted,
  });
  return (
    <SC.FlexBox $gap={10}>
      <SC.AuthInput
        type="number"
        value={input}
        onBlur={onBlurSignupDispatch}
        onChange={onChangeInput}
        placeholder="1990"
        ref={inputRef}
        $width="120px"
      />
      <SC.AuthInput
        type="number"
        placeholder="01"
        $width="120px"
        ref={inputRef}
      />
      <SC.AuthInput
        type="number"
        placeholder="01"
        $width="120px"
        ref={inputRef}
      />
    </SC.FlexBox>
  );
};
