import { useRef, useState, FormEvent } from "react";
import * as RTK from "../../redux";
import * as Type from "../../types";

export const useSignup = (): Type.UseSignup => {
  const [submitted, setSubmitted] = useState<boolean>(true);
  const inputRef1 = useRef<HTMLInputElement | null>(null);
  const inputRef2 = useRef<HTMLInputElement | null>(null);
  const inputRef3 = useRef<HTMLInputElement | null>(null);
  const inputRef4 = useRef<HTMLInputElement | null>(null);
  const inputRef5 = useRef<HTMLInputElement | null>(null);
  const inputRef6 = useRef<HTMLInputElement | null>(null);
  const inputRef7 = useRef<HTMLInputElement | null>(null);

  const getSignup = RTK.useAppSelector(RTK.selectSignup);
  const dispatch = RTK.useAppDispatch();
  const onSubmitSign = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(getSignup);
    dispatch(RTK.deleteSignupDate());
    setSubmitted((pre) => !pre);
  };

  return {
    inputRef1,
    inputRef2,
    inputRef3,
    inputRef4,
    inputRef5,
    inputRef6,
    inputRef7,
    submitted,
    onSubmitSign,
  };
};
