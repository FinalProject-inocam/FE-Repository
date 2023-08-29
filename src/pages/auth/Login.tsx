import React, { useEffect } from "react";
import { useLogin, useRouter } from "../../hooks";
import * as SC from "../../components";
import * as COMP from "../../components";
import { kakaoIcon, naverIcon, googleIcon } from "../../assets";

export const Login: React.FC = () => {
  const { onNavigate, state } = useRouter();
  const {
    isSuccess,
    isError,
    error,
    submitted,
    inputRef1,
    inputRef2,
    validiteMsgE,
    validiteMsgP,
    onSubmitLogin,
    onSnsLogin,
    onSignupClick,
  } = useLogin(state);

  useEffect(() => {
    if (isSuccess) {
      onNavigate({ url: state })();
    }
    isError && console.log("query Err", error);
  }, [isSuccess, state, isError, error, onNavigate]);

  return (
    <>
      <SC.AuthTitle>로그인</SC.AuthTitle>
      <SC.FlexBox>
        <SC.AuthForm
          onSubmit={onSubmitLogin}
          $gtc={"repeat(1, 1fr)"}
          $rgap={40}
        >
          <SC.FlexBox $gap={12} $fd={"column"}>
            <div>
              <SC.SignupLabel>이메일</SC.SignupLabel>
              <COMP.LoginInput
                name={"email"}
                type={"text"}
                placeholder={"example@innocam.com"}
                submitted={submitted}
                inputRef={inputRef1}
                validiteMsg={validiteMsgE}
              />
            </div>
            <div>
              <SC.SignupLabel>비밀번호</SC.SignupLabel>
              <COMP.LoginInput
                name={"password"}
                type={"password"}
                placeholder={"비밀번호를 입력해주세요"}
                submitted={submitted}
                inputRef={inputRef2}
                validiteMsg={validiteMsgP}
              />
            </div>

            <div>
              <SC.AuthSubmitInput
                type="submit"
                value="이메일 로그인"
                $state={true}
              />
            </div>

            <SC.LoginSignupButton onClick={onSignupClick}>
              회원가입하기
            </SC.LoginSignupButton>
          </SC.FlexBox>

          <SC.FlexBox $gap={10} $fd={"column"}>
            <SC.LoginSnsButton onClick={onSnsLogin("kakao")} $types={"kakao"}>
              <img src={kakaoIcon} alt="kakaoIcon" />
              카카오로 로그인하기
            </SC.LoginSnsButton>
            <SC.LoginSnsButton onClick={onSnsLogin("naver")} $types={"naver"}>
              <img src={naverIcon} alt="naverIcon" />
              이메일로 로그인하기
            </SC.LoginSnsButton>
            <SC.LoginSnsButton onClick={onSnsLogin("google")} $types={"google"}>
              <img src={googleIcon} alt="googleIcon" />
              이메일로 로그인하기
            </SC.LoginSnsButton>
          </SC.FlexBox>
        </SC.AuthForm>
      </SC.FlexBox>
    </>
  );
};
