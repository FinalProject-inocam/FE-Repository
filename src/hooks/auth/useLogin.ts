import { FormEvent, useEffect, useRef, useState } from "react";
import * as RTK from "../../redux";
import * as Type from "../../types";
import { useRouter } from "../useRouter";

export const useLogin = (state: string): Type.UseLogin => {
  console.log(state);
  const [submitted, setSubmitted] = useState<boolean>(true);

  const [validiteMsgE, setValiditeMsgE] = useState<[string, boolean]>([
    "",
    true,
  ]);

  const [validiteMsgP, setValiditeMsgP] = useState<[string, boolean]>([
    "",
    true,
  ]);

  const dispatch = RTK.useAppDispatch();
  const getLogin = RTK.useAppSelector(RTK.selectLogin);
  const { onNavigate } = useRouter();

  const inputRef1 = useRef<HTMLInputElement | null>(null);
  const inputRef2 = useRef<HTMLInputElement | null>(null);

  const emailRef = inputRef1.current?.value;
  const passwordRef = inputRef2.current?.value;

  const onSignupClick = (): void => {
    onNavigate({ url: "/signup" })();
  };

  const [onpostLoginRTK, { isLoading, isSuccess, data, isError, error }] =
    RTK.usePostLoginMutation();

  const onSubmitLogin = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!!emailRef && !!passwordRef) {
      onpostLoginRTK(getLogin);
      dispatch(RTK.deleteLoginDate());
      setSubmitted((pre) => !pre);
    } else {
      !emailRef && setValiditeMsgE(["이메일을 입력해주세요.", false]);
      !passwordRef && setValiditeMsgP(["비밀번호를 입력해주세요.", false]);
    }
  };

  useEffect(() => {
    emailRef && setValiditeMsgE(["", true]);
  }, [emailRef]);

  useEffect(() => {
    passwordRef && setValiditeMsgP(["", true]);
  }, [passwordRef]);

  const onSnsLogin = (sns: string) => () => {
    localStorage.setItem("location", state);
    switch (sns) {
      case "kakao":
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API}&redirect_uri=${window.location.origin}${process.env.REACT_APP_KAKAO_REDIRECT_URL}&response_type=code`;
        break;
      case "google":
        window.location.href = `https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=${process.env.REACT_APP_GOOGLE_REST_API}&redirect_uri=${window.location.origin}${process.env.REACT_APP_GOOGLE_REDIRECT_URL}&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&service=lso&o2v=1&flowName=GeneralOAuthFlow`;
        break;
      case "naver":
        window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_REST_API}&state=STATE_STRING&redirect_uri=${window.location.origin}${process.env.REACT_APP_NAVER_REDIRECT_URL}`;
        break;
      default:
        break;
    }
  };

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    data,
    submitted,
    inputRef1,
    inputRef2,
    validiteMsgE,
    validiteMsgP,
    onSubmitLogin,
    onSnsLogin,
    onSignupClick,
  };
};
