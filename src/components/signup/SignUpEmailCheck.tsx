import React, { useState, useEffect } from "react";
import * as RTK from "../../redux";
import { useSelector } from "react-redux";
import * as SC from "../css";
import * as Type from "../../types";
import { SignUpEmailCheckCode } from "./SignUpEmailCheckCode";

export const SignUpEmailCheck: React.FC<Type.SignUpECProps> = ({
  inputRef,
}) => {
  const [certificateEmail, setCertificateEmail] = useState(true);
  const [timerOpen, setTimerOpen] = useState(false);
  const dispatch = RTK.useAppDispatch();
  const { email } = useSelector(RTK?.selectSignup);

  const emailAvailable = useSelector(RTK?.selectValiditeEMsg)[1];

  //이메일 보내는 rtk
  const {
    isSuccess: emailIsSuccess,
    isError: emailIsError,
    error: emailError,
  } = RTK.useGetCertificateEmailQuery(email, {
    skip: certificateEmail,
  });

  //인증 메일 보내기 skip boolean
  const onCertificateEmail = (): void => {
    emailAvailable && setCertificateEmail(false);
    setTimerOpen(true);
  };

  useEffect(() => {
    if (emailIsSuccess) {
      setCertificateEmail(true);
      dispatch(
        RTK.setValiditeMsg({
          type: "emailCheckedMsg",
          msg: ["", false],
        })
      );
      console.log("CertificateEmailRTK", "인증메일이 발송되었습니다.");
    }
    emailIsError && console.log(emailError);

    !emailAvailable && setTimerOpen(false);
  }, [
    emailIsSuccess,
    emailIsError,
    emailError,
    email,
    emailAvailable,
    dispatch,
  ]);

  return (
    <>
      {!timerOpen ? (
        <SC.SignUpCertificateEmailDiv
          onClick={onCertificateEmail}
          $state={emailAvailable}
        >
          이메일 인증하기
        </SC.SignUpCertificateEmailDiv>
      ) : (
        <SignUpEmailCheckCode
          inputRef={inputRef}
          email={email}
          onCertificateEmail={onCertificateEmail}
        />
      )}
    </>
  );
};
