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
  const {
    input,
    inputTwo,
    inputThree,
    onChangeInput,
    onChangeInputTwo,
    onChangeInputThree,
    onBlurSignupDispatch,
  } = useSignupInput({
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
        placeholder="010"
        ref={inputRef}
        $width="120px"
        $state={true}
      />
      <SC.AuthInput
        type="number"
        value={inputTwo}
        onBlur={onBlurSignupDispatch}
        onChange={onChangeInputTwo}
        placeholder="1111"
        ref={inputRef}
        $width="120px"
        $state={true}
      />
      <SC.AuthInput
        type="number"
        value={inputThree}
        onBlur={onBlurSignupDispatch}
        onChange={onChangeInputThree}
        placeholder="1111"
        ref={inputRef}
        $width="120px"
        $state={true}
      />
    </SC.FlexBox>
  );
};
