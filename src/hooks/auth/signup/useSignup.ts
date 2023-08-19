import { useRef, useState, FormEvent, useEffect } from "react";
import * as RTK from "../../../redux";
import * as Type from "../../../types";
import { useRouter } from "../../useRouter";

export const useSignup = (): Type.UseSignup => {
  const [submitted, setSubmitted] = useState<boolean>(true);
  const inputRef1 = useRef<HTMLInputElement | null>(null);
  const inputRef2 = useRef<HTMLInputElement | null>(null);
  const inputRef3 = useRef<HTMLInputElement | null>(null);
  const inputRef4 = useRef<HTMLInputElement | null>(null);
  const inputRef5 = useRef<HTMLInputElement | null>(null);
  const inputRef6 = useRef<HTMLInputElement | null>(null);
  const inputRef7 = useRef<HTMLInputElement | null>(null);

  const { onNavigate } = useRouter();
  const getSignup = RTK.useAppSelector(RTK.selectSignup);
  const dispatch = RTK.useAppDispatch();
  const [onpostSignupRTK, { isSuccess, isError, error }] =
    RTK.usePostSignupMutation();
  const onSubmitSign = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onpostSignupRTK(getSignup);
    dispatch(RTK.deleteSignupDate());
    dispatch(RTK.deleteValiditeMsg());
    // setSubmitted((pre) => !pre);
  };

  console.log(setSubmitted);

  useEffect(() => {
    isSuccess && onNavigate("/login")();
    isError && console.log(error);
  }, [isSuccess, isError, error, onNavigate]);

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
