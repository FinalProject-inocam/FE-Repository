import React, { useState, ChangeEvent, useEffect } from "react";
import { Timer } from "./Timer";
import * as RTK from "../../redux";
import { useSelector } from "react-redux";

export const SignUpEmailCheck: React.FC<any> = () => {
  const [certificateEmail, setCertificateEmail] = useState(true);
  const [certificateCode, setCertificateCode] = useState(true);
  const dispatch = RTK.useAppDispatch();
  // 인증코드 state
  const [checkCode, setCheckCode] = useState<string>("");
  // 인증코드 인증 성공 state
  const [validateCheckCode, setvalidateCheckCode] = useState<boolean>(false);
  const { email } = useSelector(RTK.selectSignup);

  //이메일 보내는 rtk
  const CertificateEmailRTK = RTK.useGetCertificateEmailQuery(email, {
    skip: certificateEmail,
  });

  // 이메일 인증코드 확인 rtk
  const GetCertificateCodeRTK = RTK.useGetCertificateCodeQuery(
    { email: email, code: checkCode },
    {
      skip: certificateCode,
    }
  );

  //인증 메일 보내기 skip boolean
  const onCertificateEmail = (): void => {
    !!email && setCertificateEmail(false);
  };

  // 이메일 인증코드 skip boolean
  const onClickCheckCode = (): void => {
    setCertificateCode(false);
  };

  // 인증코드 state 변경 확인
  const onChangeCheckCode = (e: ChangeEvent<HTMLInputElement>): void => {
    setCheckCode(e.target.value);
    setCertificateCode(true);
  };

  useEffect(() => {
    CertificateEmailRTK.isSuccess &&
      console.log("CertificateEmailRTK", "인증메일이 발송되었습니다.");
    if (GetCertificateCodeRTK.isSuccess) {
      setvalidateCheckCode((pre) => !pre);
      dispatch(
        RTK.setValiditeMsg({
          type: "emailCheckedMsg",
          msg: [
            GetCertificateCodeRTK.data,
            GetCertificateCodeRTK.data.includes("완료") ? true : false,
          ],
        })
      );
    }
  }, [CertificateEmailRTK, GetCertificateCodeRTK, email, dispatch]);

  return (
    <div>
      {
        <div onClick={onCertificateEmail}>
          {certificateEmail ? "이메일 인증메일보내기" : "이메일 재발송하기"}
        </div>
      }
      <input value={checkCode} onChange={onChangeCheckCode} />
      <div onClick={onClickCheckCode}>이메일 확인</div>
      {!certificateEmail && (
        <>
          <Timer state={validateCheckCode} />
        </>
      )}
    </div>
  );
};
