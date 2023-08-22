import { ChangeEvent, useEffect, useState } from "react";
import * as RTK from "../../../redux";

export const useSignupNickName = ({ name, submitted }: any): any => {
  const dispatch = RTK.useAppDispatch();
  const [input, setInput] = useState<string>("");
  const [serverCheck, setServerCheck] = useState<boolean>(true);
  const getValidateMsg = RTK.useAppSelector(RTK.selectValiditeNMsg);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setServerCheck(true);
    e.target.value === "" &&
      dispatch(RTK.setValiditeMsg({ type: name, msg: ["", false] }));
    setInput(e.target.value);
  };

  const onBlurSignupDispatch = () => {
    dispatch(RTK.setSignupDate({ [`${name}`]: input }));
    input && setServerCheck(false);
  };

  const { isSuccess, data, isError, error } = RTK.useGetNickCheckQuery(input, {
    skip: serverCheck,
  });

  useEffect(() => {
    setInput("");
  }, [submitted]);

  useEffect(() => {
    isSuccess &&
      dispatch(
        RTK.setValiditeMsg({
          type: "nickname",
          msg: [data, data.includes("사용") ? true : false],
        })
      );
    isError && console.log(error);
  }, [isSuccess, data, isError, error, dispatch]);

  return { input, getValidateMsg, onChangeInput, onBlurSignupDispatch };
};
