import { FC, LegacyRef } from "react";
import * as SC from "../css";
import { useSignupInput } from "../../hooks";

interface SignUpInputBirthProps {
  name: string;
  inputRef: LegacyRef<HTMLInputElement> | undefined;
  submitted: boolean;
}

export const SignUpInputBirth: FC<SignUpInputBirthProps> = ({
  name,
  inputRef,
  submitted,
}) => {
  const { input, onChangeInput, onBlurSignupDispatch } = useSignupInput({
    name,
    submitted,
  });
  return (
    <SC.AuthInputsLayout ref={inputRef}>
      <SC.AuthInput
        type="number"
        value={input}
        onBlur={onBlurSignupDispatch}
        onChange={onChangeInput}
        placeholder="1990"
        $width="120px"
      />
      <SC.AuthInput type="number" placeholder="01" $width="120px" />
      <SC.AuthInput type="number" placeholder="01" $width="120px" />
    </SC.AuthInputsLayout>
  );
};
