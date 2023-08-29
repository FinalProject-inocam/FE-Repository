import { ChangeEvent, FC, useEffect, useState } from "react";
import * as RTK from "../../redux";
import * as SC from "../css";

export const LoginInput: FC<any> = ({
  name,
  type,
  placeholder,
  submitted,
  inputRef,
  validiteMsg,
}) => {
  const [input, setInput] = useState<string>("");
  const dispatch = RTK.useAppDispatch();

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onBlurLoginDispatch = () => {
    dispatch(RTK.setLoginDate({ [`${name}`]: input }));
  };

  useEffect(() => {
    setInput("");
  }, [submitted]);

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
