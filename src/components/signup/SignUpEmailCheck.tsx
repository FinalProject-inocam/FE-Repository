import React, { useState, ChangeEvent, useEffect } from "react";
import { Timer } from "./Timer";
import * as RTK from "../../redux";
import { useSelector } from "react-redux";
import * as SC from "../css";

export const SignUpEmailCheck: React.FC<any> = () => {
  const [certificateEmail, setCertificateEmail] = useState(true);
  const [certificateCode, setCertificateCode] = useState(true);
  const [timerOpen, setTimerOpen] = useState(false);
  const dispatch = RTK.useAppDispatch();
  const getValidateMsg = RTK.useAppSelector(RTK.selectValiditeECMsg);
  // 인증코드 state
  const [checkCode, setCheckCode] = useState<string>("");
  // 인증코드 인증 성공 state(불일치일때 제외)
  const [validateCheckCode, setvalidateCheckCode] = useState<boolean>(false);
  const { email } = useSelector(RTK?.selectSignup);

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
    setTimerOpen(true);
  };

  // 이메일 인증코드 skip boolean
  const onClickCheckCode = (): void => {
    setCertificateCode(false);
    dispatch(RTK.setSignupDate({ [`checkCode`]: checkCode }));
  };
  // 뭐라고 보내줘야하는지 이름 찾아야함(08.25 아직 안 정해짐)

  // 인증코드 state 변경 확인
  const onChangeCheckCode = (e: ChangeEvent<HTMLInputElement>): void => {
    setCheckCode(e.target.value);
    setCertificateCode(true);
    setCertificateEmail(true);
  };

  useEffect(() => {
    CertificateEmailRTK.isSuccess &&
      console.log("CertificateEmailRTK", "인증메일이 발송되었습니다.");
    if (GetCertificateCodeRTK.isSuccess) {
      GetCertificateCodeRTK.data.includes("완료") && setvalidateCheckCode(true);
      dispatch(
        RTK.setValiditeMsg({
          type: "emailCheckedMsg",
          msg: [
            GetCertificateCodeRTK.data.includes("완료")
              ? "완료"
              : GetCertificateCodeRTK.data,
            GetCertificateCodeRTK.data.includes("완료") ? true : false,
          ],
        })
      );
    }
  }, [CertificateEmailRTK, GetCertificateCodeRTK, email, dispatch]);

  return (
    <>
      {!timerOpen ? (
        <SC.SignUpCertificateEmailDiv onClick={onCertificateEmail}>
          이메일 인증하기
        </SC.SignUpCertificateEmailDiv>
      ) : (
        <>
          <SC.SignUpCertificateLayout>
            <SC.EmailCodeDiv $width={"301px"}>
              <SC.AuthInput
                value={checkCode}
                onChange={onChangeCheckCode}
                $width="301px"
              />
              <SC.SignUpTimerDiv>
                <Timer state={validateCheckCode} />
              </SC.SignUpTimerDiv>
            </SC.EmailCodeDiv>

            <SC.SignUpReSendDiv onClick={onCertificateEmail}>
              재전송
            </SC.SignUpReSendDiv>
          </SC.SignUpCertificateLayout>
          {!validateCheckCode && (
            <SC.ValidateInputMsg
              $signColor={getValidateMsg[1]}
              children={getValidateMsg[0]}
            />
          )}
          <SC.SignUpCertificateEmailDiv onClick={onClickCheckCode}>
            인증코드 확인
          </SC.SignUpCertificateEmailDiv>
        </>
      )}
    </>
  );
};
