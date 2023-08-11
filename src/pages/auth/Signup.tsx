import React, { useEffect, useState } from "react";
import { useRouter, useSignup } from "../../hooks";
import { AuthInput, ValidateInputMsg, Timer } from "../../components";

export const Signup: React.FC = () => {
  const { onNavigate } = useRouter();
  const [validateCheckCode, setvalidateCheckCode] = useState<boolean>(false);

  const {
    onSubmitSign,
    signInfo,
    onChangeInput,
    onCheckEmail,
    onCheckNickName,
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
    //아래것 추가함
    certificateEmail,
    checkCode,
    onChangeCheckCode,
    onClickCheckCode,
    validiteMsg,
    showPW,
    onClickShowPW,
  } = useSignup();

  useEffect(() => {
    if (isSuccess) onNavigate("/login")();
    if (checkEmailSuccess)
      console.log(
        checkEmailData
          ? "사용 가능한 이메일 입니다"
          : "이미 사용 중인 이메일입니다"
      );
    if (checkNickNameSuccess)
      console.log(
        checkNickNameData
          ? "사용 가능한 닉네임 입니다"
          : "이미 사용 중인 닉네임입니다"
      );
    CertificateEmail.isSuccess && console.log(CertificateEmail);
    CertificateEmail.isError && console.log(CertificateEmail);
    GetCertificateCode.isSuccess && setvalidateCheckCode(true);
  }, [
    isSuccess,
    data,
    isError,
    error,
    onNavigate,
    checkEmailSuccess,
    checkEmailData,
    checkNickNameSuccess,
    checkNickNameData,
    CertificateEmail,
    GetCertificateCode,
  ]);

  return (
    <form onSubmit={onSubmitSign}>
      <AuthInput
        type="text"
        value={signInfo.email}
        name="email"
        onBlur={onCheckEmail}
        onChange={onChangeInput}
        placeholder="이메일 형식으로 입력해주세요."
      />
      <ValidateInputMsg $signColor={validiteMsg.validteEmail[1]}>
        {validiteMsg.validteEmail[0]}
      </ValidateInputMsg>
      <AuthInput
        type="text"
        value={signInfo.nickname}
        name="nickname"
        onBlur={onCheckNickName}
        onChange={onChangeInput}
        placeholder="이름을 입력해 주세요"
      />
      <AuthInput
        type={showPW ? "text" : "password"}
        value={signInfo.password}
        name="password"
        onChange={onChangeInput}
        placeholder="비밀번호를 입력해 주세요"
      />
      <button onClick={onClickShowPW}>{showPW ? "숨김" : "표시"}</button>
      <ValidateInputMsg $signColor={validiteMsg.validtepassword[1]}>
        {validiteMsg.validtepassword[0]}
      </ValidateInputMsg>
      <AuthInput
        type="password"
        value={signInfo.pwChecked}
        name="pwChecked"
        onChange={onChangeInput}
        placeholder="비밀번호를 다시 입력해주세요"
      />
      <ValidateInputMsg $signColor={validiteMsg.passwordChMsg[1]}>
        {validiteMsg.passwordChMsg[0]}
      </ValidateInputMsg>
      <AuthInput
        type="text"
        value={signInfo.phone_number}
        name="phoneNumber"
        onChange={onChangeInput}
        placeholder="휴대전화를 입력해 주세요"
      />
      <input type="submit" value="회원가입" />
      <div onClick={onCheckEmail}>이메일 중복확인</div> {/* onBlur */}
      <div onClick={onCertificateEmail}>이메일 인증메일보내기</div>
      <input value={checkCode} onChange={onChangeCheckCode} />
      <div onClick={onClickCheckCode}>이메일 확인</div>
      {!certificateEmail && (
        <>
          <Timer state={validateCheckCode} />
        </>
      )}
      <div onClick={onCheckNickName}>닉네임 중복확인</div>
    </form>
  );
};
