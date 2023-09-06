import { ChangeEvent, FC, useEffect, useState } from "react";
import * as SC from "../css";
import { Timer } from "./Timer";
import * as RTK from "../../redux";

export const SignUpEmailCheckCode: FC<any> = ({
  inputRef,
  email,
  onCertificateEmail,
}) => {
  // 인증코드 input state
  const [checkCode, setCheckCode] = useState<string>("");
  const [certificateCode, setCertificateCode] = useState(true);
  // 인증코드 인증 성공 state(불일치일때 제외) : 메시지 띄우기 위함
  const [validateCheckCode, setValidateCheckCode] = useState<boolean>(false);
  const dispatch = RTK.useAppDispatch();
  const getValidateMsg = RTK.useAppSelector(RTK.selectValiditeECMsg);

  //재전송 때 타이머 리셋
  const [reTimer, setReTimer] = useState<boolean>(false);

  const onReTimer = () => setReTimer((pre) => !pre);

  // 인증코드 state 변경 확인
  const onChangeCheckCode = (e: ChangeEvent<HTMLInputElement>): void => {
    setCheckCode(e.target.value);
    setCertificateCode(true);
  };

  // 이메일 인증코드 확인 rtk
  const {
    isSuccess: checkCodeIsSuccess,
    data: checkCodeData,
    isError: checkCodeIsError,
    error: checkCodeError,
  } = RTK.useGetCertificateCodeQuery(
    { email: email, code: checkCode },
    {
      skip: certificateCode,
    }
  );

  // 이메일 인증코드 skip boolean
  const onClickCheckCode = (): void => {
    setCertificateCode(false);
    dispatch(RTK.setSignupDate({ [`checkCode`]: checkCode }));
  };
  // 뭐라고 보내줘야하는지 이름 찾아야함(08.25 아직 안 정해짐)

  useEffect(() => {
    if (checkCodeIsSuccess) {
      setValidateCheckCode(checkCodeData.includes("완료") ? true : false);
      dispatch(
        RTK.setValiditeMsg({
          type: "emailCheckedMsg",
          msg: [
            checkCodeData.includes("완료") ? "완료" : checkCodeData,
            checkCodeData.includes("완료") ? true : false,
          ],
        })
      );
    }
  }, [
    checkCodeIsSuccess,
    checkCodeData,
    checkCodeIsError,
    checkCodeError,
    dispatch,
  ]);

  return (
    <>
      <SC.SignUpCertificateLayout $gap={4}>
        <SC.EmailCodeDiv $width={"301px"}>
          <SC.AuthInput
            value={checkCode}
            onChange={onChangeCheckCode}
            ref={inputRef}
            $width="301px"
            $state={true}
          />
          <SC.SignUpInputInnerDiv>
            <Timer state={validateCheckCode} reTimer={reTimer} />
          </SC.SignUpInputInnerDiv>
        </SC.EmailCodeDiv>

        <SC.SignUpReSendDiv
          onClick={() => {
            onCertificateEmail();
            onReTimer();
          }}
        >
          재전송
        </SC.SignUpReSendDiv>
      </SC.SignUpCertificateLayout>
      {!validateCheckCode && (
        <SC.ValidateInputMsg
          $signColor={getValidateMsg[1]}
          children={getValidateMsg[0]}
        />
      )}
      <SC.SignUpCertificateEmailDiv
        onClick={onClickCheckCode}
        $state={!!checkCode}
      >
        인증코드 확인
      </SC.SignUpCertificateEmailDiv>
    </>
  );
};
