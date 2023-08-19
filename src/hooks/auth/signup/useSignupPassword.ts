import { ChangeEvent, useEffect, useState } from "react";
import * as RTK from "../../../redux";

export const useSignupPassword = ({ name, submitted }: any): any => {
  const dispatch = RTK.useAppDispatch();
  const [input, setInput] = useState<string>("");
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const getSignupP = RTK.useAppSelector(RTK.selectSignupP);
  const getValidateMsg = RTK.useAppSelector(name === "password" ? RTK.selectValiditePMsg : RTK.selectValiditePWCMsg);
  
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#?$%^&*]).{8,15}$/;
  const onValiditeMsgP = (input: string): void => {
      input === ""
        ? dispatch(RTK.setValiditeMsg({ type: name, msg: ["", false] }))
        : input.length < 8
        ? dispatch(RTK.setValiditeMsg({ type: name, msg: ["8자 이상 입력해 주세요.", false] }))
        : passwordRegex.test(input)
        ? dispatch(RTK.setValiditeMsg({ type: name, msg: ["보안등급: 높음 보안등급이 높을 수록 서비스를 안전하게 이용할 수 있습니다.", true] }))
        : dispatch(RTK.setValiditeMsg({ type: name, msg: ["알파벳 대문자,알파벳 소문자, 숫자, 특수문자(?, !, * 등)를 조합하여 입력해 주세요.", false] }))
  }

  const onValiditeMsgPWC = (input: string): void => {
    input === ""
      ? dispatch(RTK.setValiditeMsg({ type: name, msg: ["", false] })) 
      : !!input.length && getSignupP !== input
      ? dispatch(RTK.setValiditeMsg({ type: name, msg: ["입력하신 비밀번호가 서로 다릅니다.", false] }))
      : dispatch(RTK.setValiditeMsg({ type: name, msg: ["비밀번호가 일치합니다. ", true] }))
}

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    name === "password" ? onValiditeMsgP(e.target.value) : onValiditeMsgPWC(e.target.value);
    setInput(e.target.value);
  };

  const onBlurSignupDispatch = () => {
    dispatch(RTK.setSignupDate({ [`${name}`]: input }));
  };

  const onClickSeePassword = () => {
    setSeePassword((pre) => !pre);
  };

  useEffect(() => {
    setInput("");
  }, [submitted]);

  return { input, seePassword, getValidateMsg, onChangeInput, onBlurSignupDispatch, onClickSeePassword }

}