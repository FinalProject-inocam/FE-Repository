import { FC } from "react";
import * as SC from "../css";
import { useLoginInput } from "../../hooks";

export const LoginInput: FC<any> = ({
  name,
  type,
  placeholder,
  inputRef,
  submitted,
  validiteMsg,
  setValiditeMsg,
}) => {
  const { input, onBlurLoginDispatch, onChangeInput } = useLoginInput({
    name,
    submitted,
    setValiditeMsg,
  });

  return (
    <>
      <SC.AuthInput
        type={type}
        value={input}
        onBlur={onBlurLoginDispatch}
        onChange={onChangeInput}
        placeholder={placeholder}
        ref={inputRef}
        $state={validiteMsg[1]}
      />
      <SC.ValidateInputMsg
        $signColor={validiteMsg[1]}
        children={validiteMsg[0]}
      />
    </>
  );
};
