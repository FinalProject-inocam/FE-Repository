import { ChangeEvent, useEffect, useState } from "react";
import * as RTK from "../../redux";

export const useLoginInput = ({
  name,
  submitted,
  setValiditeMsg,
}: any): any => {
  const [input, setInput] = useState<string>("");
  const dispatch = RTK.useAppDispatch();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onValiditeMsg = (input: string): void => {
    !emailRegex.test(input)
      ? setValiditeMsg(["올바른 이메일 주소가 아닙니다.", false])
      : setValiditeMsg(["", true]);
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    name === "email" && onValiditeMsg(e.target.value);
    name === "password" && setValiditeMsg("", true);
  };

  const onBlurLoginDispatch = () => {
    dispatch(RTK.setLoginDate({ [`${name}`]: input }));
  };

  useEffect(() => {
    setInput("");
  }, [submitted]);

  return { input, onBlurLoginDispatch, onChangeInput };
};
