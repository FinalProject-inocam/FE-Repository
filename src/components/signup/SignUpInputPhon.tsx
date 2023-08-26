import { FC, LegacyRef } from "react";
import * as SC from "../css";
import { useSignupInput } from "../../hooks";

interface SignUpInputPhonProps {
  name: string;
  inputRef: LegacyRef<HTMLInputElement> | undefined;
  submitted: boolean;
}

export const SignUpInputPhon: FC<SignUpInputPhonProps> = ({
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
        placeholder="010"
        $width="120px"
      />
      <SC.AuthInput type="number" placeholder="1111" $width="120px" />
      <SC.AuthInput type="number" placeholder="1111" $width="120px" />
    </SC.AuthInputsLayout>
  );
};
