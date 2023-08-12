import { ChangeEvent, FormEvent, useState } from "react";
import * as Type from "../../types";
import {
  useGetEmailCheckQuery,
  useGetNickCheckQuery,
  usePostSignupMutation,
  useGetCertificateEmailQuery,
  useGetCertificateCodeQuery,
} from "../../redux";

export const useSignup = () => {
  const [signInfo, setSignInfo] = useState<Type.UserInfoCheckPW>({
    email: "",
    password: "",
    pwChecked: "",
    nickname: "",
    phoneNumber: "",
    gender: "male",
    birthdate: "2023-08-04",
    isAdmin: false,
    admincode: "E002",
  });

  const [validiteMsg, setValiditeMse] = useState<Type.ValiditeMsg>({
    validteEmail: ["", false],
    validtepassword: ["", false],
    passwordChMsg: ["", false],
  });

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setSignInfo({ ...signInfo, [name]: value });
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      emailRegex.test(value)
        ? setValiditeMse({
            ...validiteMsg,
            validteEmail: ["사용 가능한 이메일입니다.", true],
          })
        : setValiditeMse({
            ...validiteMsg,
            validteEmail: ["이메일을 입력해주세요(exam@.exam.com)", false],
          });
    }

    if (name === "password") {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#?$%^&*]).{8,15}$/;
      value.length < 8
        ? setValiditeMse({
            ...validiteMsg,
            validtepassword: ["8자 이상 입력해 주세요.", false],
          })
        : passwordRegex.test(value)
        ? setValiditeMse({
            ...validiteMsg,
            validtepassword: [
              "보안등급: 높음 보안등급이 높을 수록 서비스를 안전하게 이용할 수 있습니다.",
              true,
            ],
          })
        : setValiditeMse({
            ...validiteMsg,
            validtepassword: [
              "알파벳 대문자,알파벳 소문자, 숫자, 특수문자(?, !, * 등)를 조합하여 입력해 주세요.",
              false,
            ],
          });
    }

    if (name === "pwChecked") {
      !validiteMsg.validtepassword[1]
        ? setValiditeMse({ ...validiteMsg, passwordChMsg: ["", false] })
        : validiteMsg.validtepassword[1] && signInfo.password === value
        ? setValiditeMse({
            ...validiteMsg,
            passwordChMsg: ["비밀번호가 일치합니다.", true],
          })
        : setValiditeMse({
            ...validiteMsg,
            passwordChMsg: ["입력하신 비밀번호가 서로 다릅니다.", false],
          });
    }

    setCheckEmail(true);
    setCheckNickName(true);
    setCertificateEmail(true);
    setCertificateCode(true);
  };

  const [checkCode, setCheckCode] = useState<string>("");

  const onChangeCheckCode = (e: ChangeEvent<HTMLInputElement>): void => {
    setCheckCode(e.target.value);
    setCertificateCode(true);
  };

  const [onpostSignupRTK, { isSuccess, data, isError, error }] =
    usePostSignupMutation();
  const onSubmitSign = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onpostSignupRTK(signInfo);
  };

  const [checkEmail, setCheckEmail] = useState(true);
  const { isSuccess: checkEmailSuccess, data: checkEmailData } =
    useGetEmailCheckQuery(signInfo.email, {
      skip: checkEmail,
    });

  const [checkNickName, setCheckNickName] = useState(true);
  const { isSuccess: checkNickNameSuccess, data: checkNickNameData } =
    useGetNickCheckQuery(signInfo.nickname, {
      skip: checkNickName,
    });

  const onCheckEmail = (): void => {
    !!signInfo.email && setCheckEmail(false);
  };

  const onCheckNickName = (): void => {
    !!signInfo.nickname && setCheckNickName(false);
  };

  const [certificateEmail, setCertificateEmail] = useState(true);
  const CertificateEmail = useGetCertificateEmailQuery(signInfo.email, {
    skip: certificateEmail,
  });

  const onCertificateEmail = () => {
    !!signInfo.email && setCertificateEmail(false);
  };

  const [certificateCode, setCertificateCode] = useState(true);
  const GetCertificateCode = useGetCertificateCodeQuery(
    { email: signInfo.email, code: checkCode },
    {
      skip: certificateCode,
    }
  );

  const onClickCheckCode = () => {
    setCertificateCode(false);
  };

  const [showPW, setShowPw] = useState(false);

  const onClickShowPW = () => {
    setShowPw(!showPW);
  };

  return {
    onChangeInput,
    onSubmitSign,
    onCheckEmail,
    onCheckNickName,
    signInfo,
    isSuccess,
    data,
    isError,
    error,
    checkEmailSuccess,
    checkEmailData,
    checkNickNameSuccess,
    checkNickNameData,
    CertificateEmail,
    onCertificateEmail,
    GetCertificateCode,
    certificateEmail,
    checkCode,
    onChangeCheckCode,
    onClickCheckCode,
    validiteMsg,
    showPW,
    onClickShowPW,
  };
};
