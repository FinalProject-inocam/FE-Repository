import { ChangeEvent, useEffect, useState } from "react";
import * as RTK from "../../../redux";

export const useSignupEmail = ({ name, submitted }: any): any => {

  const dispatch = RTK.useAppDispatch();
  const [input, setInput] = useState<string>("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [serverCheck, setServerCheck] = useState<boolean>(true);
  const getValidateMsg = RTK.useAppSelector(RTK.selectValiditeEMsg);

  const onValiditeMsg = (input: string): void => {
    input === ""
      ? dispatch(RTK.setValiditeMsg({ type: name, msg: ["", false] }))
      : !emailRegex.test(input)
        ? dispatch(
          RTK.setValiditeMsg({
            type: name,
            msg: ["이메일을 입력해주세요(exam@.exam.com)", false],
          })
        )
        : dispatch(
          RTK.setValiditeMsg({
            type: name,
            msg: ["이메일 형식에 부합합니다.", false],
          })
        );
  }

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setServerCheck(true);
    onValiditeMsg(e.target.value);
    setInput(e.target.value);
  };

  const onBlurSignupDispatch = () => {
    dispatch(RTK.setSignupDate({ [`${name}`]: input }));
    emailRegex.test(input) && setServerCheck(false);
  };

  const { isSuccess, data, isError, error } = RTK.useGetEmailCheckQuery(input, {
    skip: serverCheck,
  });

  useEffect(() => {
    setInput("");
  }, [submitted]);

  useEffect(() => {
    isSuccess &&
      dispatch(
        RTK.setValiditeMsg({
          type: "email",
          msg: [data, data.includes("사용") ? true : false],
        })
      );
    isError && console.log(error);
  }, [
    isSuccess,
    data,
    isError,
    error,
    dispatch,
  ]);

  return { input, getValidateMsg, onChangeInput, onBlurSignupDispatch }

}