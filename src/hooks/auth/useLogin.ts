import { ChangeEvent, FormEvent, useState } from "react";
import * as RTK from "../../redux";
import * as Type from "../../types";

export const useLogin = (state: string): Type.UseLogin => {
  console.log(state);
  const [loginInfo, setLoginInfo] = useState<Type.User>({
    email: "",
    password: "",
  });

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const [onpostLoginRTK, { isLoading, isSuccess, data, isError, error }] =
    RTK.usePostLoginMutation();

  const onSubmitLogin = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onpostLoginRTK(loginInfo);
  };

  const dispatch = RTK.useAppDispatch();
  const onSnsLogin = (sns: string) => () => {
    switch (sns) {
      case "kakao":
        dispatch(RTK.setLocationState(state));
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API}&redirect_uri=${window.location.origin}${process.env.REACT_APP_KAKAO_REDIRECT_URL}&response_type=code`;
        break;
      case "google":
        dispatch(RTK.setLocationState(state));
        window.location.href = `https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=${process.env.REACT_APP_GOOGLE_REST_API}&redirect_uri=${window.location.origin}${process.env.REACT_APP_GOOGLE_REDIRECT_URL}&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&service=lso&o2v=1&flowName=GeneralOAuthFlow`;
        break;
      case "naver":
        dispatch(RTK.setLocationState(state));
        window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_REST_API}&state=STATE_STRING&redirect_uri=${window.location.origin}${process.env.REACT_APP_NAVER_REDIRECT_URL}`;
        break;
      default:
        break;
    }
  };

  return {
    loginInfo,
    isLoading,
    isSuccess,
    data,
    isError,
    error,
    onChangeInput,
    onSubmitLogin,
    onSnsLogin,
  };
};
