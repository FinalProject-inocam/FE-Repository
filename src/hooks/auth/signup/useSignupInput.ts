import { ChangeEvent, useEffect, useState } from "react";
import * as RTK from "../../../redux";

export const useSignupInput = ({ name, submitted }: any): any => {
  const dispatch = RTK.useAppDispatch();
  const [input, setInput] = useState<string>("");

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onBlurSignupDispatch = () => {
    dispatch(RTK.setSignupDate({ [`${name}`]: input }));
  };

  useEffect(() => {
    setInput("");
  }, [submitted]);

  return { input, onChangeInput, onBlurSignupDispatch };
};
