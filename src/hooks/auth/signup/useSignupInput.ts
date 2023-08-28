import { ChangeEvent, useEffect, useState } from "react";
import * as RTK from "../../../redux";

export const useSignupInput = ({ name, submitted }: any): any => {
  const dispatch = RTK.useAppDispatch();
  const [input, setInput] = useState<string>("");
  const [inputTwo, setInputTwo] = useState<string>("");
  const [inputThree, setInputThree] = useState<String>("");

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onChangeInputTwo = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTwo(e.target.value);
  };

  const onChangeInputThree = (e: ChangeEvent<HTMLInputElement>) => {
    setInputThree(e.target.value);
  };

  const onBlurSignupDispatch = () => {
    dispatch(
      RTK.setSignupDate({
        [`${name}`]:
          name === "phonNumber" ? input : input + inputTwo + inputThree,
      })
    );
  };

  useEffect(() => {
    setInput("");
  }, [submitted]);

  return {
    input,
    inputTwo,
    inputThree,
    onChangeInput,
    onChangeInputTwo,
    onChangeInputThree,
    onBlurSignupDispatch,
  };
};
