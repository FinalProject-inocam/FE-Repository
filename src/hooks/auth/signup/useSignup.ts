import { useRef, useState, FormEvent, useEffect } from "react";
import * as RTK from "../../../redux";
import * as Type from "../../../types";
import { useRouter } from "../../useRouter";
import { useSelector } from "react-redux";

export const useSignup = (): Type.UseSignup => {
  const [submitted, setSubmitted] = useState<boolean>(true);
  const [check, setCheck] = useState<boolean>(false);
  const [adminCheck, setAdminCheck] = useState<boolean>(false);
  const pathName = window.location.pathname;

  const inputRef1 = useRef<HTMLInputElement | null>(null);
  const inputRef2 = useRef<HTMLInputElement | null>(null);
  const inputRef3 = useRef<HTMLInputElement | null>(null);
  const inputRef4 = useRef<HTMLInputElement | null>(null);
  const inputRef5 = useRef<HTMLInputElement | null>(null);
  const inputRef6 = useRef<HTMLInputElement | null>(null);
  const inputRef7 = useRef<HTMLInputElement | null>(null);

  const inputRef8 = useRef<HTMLInputElement | null>(null);

  const { onNavigate } = useRouter();
  const getSignup = RTK.useAppSelector(RTK.selectSignup);
  const dispatch = RTK.useAppDispatch();
  const [onpostSignupRTK, { isSuccess, isError, error }] =
    RTK.usePostSignupMutation();

  console.log(getSignup);

  const nAvailable = useSelector(RTK?.selectValiditeNMsg)[1];
  const birthYearValue = inputRef2.current?.value;
  const phonNumberValue = inputRef3.current?.value;
  const eAvailable = useSelector(RTK?.selectValiditeEMsg)[1];
  const ecAvailable = useSelector(RTK?.selectValiditeECMsg)[1];
  const pAvailable = useSelector(RTK?.selectValiditePMsg)[1];
  const pcAvailable = useSelector(RTK?.selectValiditePWCMsg)[1];
  const adminCodeValue = inputRef8.current?.value;

  const onSubmitSign = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onpostSignupRTK(getSignup);
    dispatch(RTK.deleteSignupDate());
    dispatch(RTK.deleteValiditeMsg());
    setSubmitted((pre) => !pre);
  };

  useEffect(() => {
    dispatch(RTK.deleteSignupDate());
    dispatch(RTK.deleteValiditeMsg());
    if (pathName.includes("admin")) {
      setAdminCheck(true);
      dispatch(RTK.setSignupDate({ [`admin`]: adminCheck }));
    }
  }, [pathName, dispatch, adminCheck]);

  useEffect(() => {
    isSuccess && onNavigate({ url: "/login" })();
    isError && console.log(error);

    (pathName.includes("admin") ? adminCodeValue : true) &&
    nAvailable &&
    birthYearValue &&
    phonNumberValue &&
    eAvailable &&
    ecAvailable &&
    pAvailable &&
    pcAvailable
      ? setCheck(true)
      : setCheck(false);
  }, [
    isSuccess,
    isError,
    error,
    nAvailable,
    birthYearValue,
    phonNumberValue,
    eAvailable,
    ecAvailable,
    pAvailable,
    pcAvailable,
    adminCodeValue,
    pathName,
    onNavigate,
  ]);

  return {
    inputRef1,
    inputRef2,
    inputRef3,
    inputRef4,
    inputRef5,
    inputRef6,
    inputRef7,
    inputRef8,
    submitted,
    check,
    adminCheck,
    onSubmitSign,
  };
};

//빈값 있는지 확인 후, 칸 테두리 빨갛게 만들기
// const nicknameValue = inputRef1.current?.value;
// const birthYearValue = inputRef2.current?.value;
// const phonNumberValue = inputRef3.current?.value;
// const emailValue = inputRef4.current?.value;
// const emailCheckValue = inputRef5.current?.value;
// const passwordValue = inputRef6.current?.value;
// const pwCheckedValue = inputRef7.current?.value;
//지금 생각은 여기서 state를 내려서 css하고 경고 메시지를 같이 관리하는 건데, 이러면 너무 복잡해지는 것 + input이 들어왔을 때 컨트롤을 어떻게 해야할지 모르겠음
