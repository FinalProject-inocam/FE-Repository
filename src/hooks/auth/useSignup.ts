import { ChangeEvent, FormEvent, useState } from "react";
import * as Type from "../../types/auth";
import {
  useGetEmailCheckQuery,
  useGetNickCheckQuery,
  usePostSignupMutation,
  useGetCertificateEmailQuery,
  useGetCertificateCodeQuery,
} from "../../redux";

export const useSignup = () => {
  const [signInfo, setSignInfo] = useState<Type.UserInfo>({
    email: "",
    password: "",
    nickname: "",
    phoneNumber: "",
    gender: "male",
    birthdate: "2023-08-04",
    isAdmin: false,
    admincode: "E002",
  });

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setSignInfo({ ...signInfo, [name]: value });
    setCheckEmail(true);
    setCheckNickName(true);
    setCertificateEmail(true);
    setCertificateCode(true)  
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
  const GetCertificateCode = useGetCertificateCodeQuery({email:signInfo.email, code:"ANGUM5"}, {
    skip:certificateCode
  })

  const onCertificateCode = () => {
    setCertificateCode(false)  
  }

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
    onCertificateCode, 
    GetCertificateCode
  };
};