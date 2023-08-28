import React from "react";
import * as COMP from "../../components";
import * as SC from "../../components";
import { useSignup } from "../../hooks";
import SignupLogo from "../../assets/SignupLogo.png";

export const Signup: React.FC = () => {
  const {
    inputRef1,
    inputRef2,
    inputRef3,
    inputRef4,
    inputRef5,
    inputRef6,
    inputRef7,
    submitted,
    check,
    onSubmitSign,
  } = useSignup();

  return (
    <>
      <SC.SignupTitle>이노캠 모터스에 오신걸 환영합니다.</SC.SignupTitle>
      <SC.FlexBox>
        <SC.SignupForm onSubmit={onSubmitSign} $gap={40}>
          <SC.FlexBox $fd={"column"} $gap={20}>
            <SC.FlexBox>
              <img alt="Logo" src={SignupLogo} />
            </SC.FlexBox>
            <div>
              <SC.SignupLabel>닉네임</SC.SignupLabel>
              <COMP.SignUpInputN
                type="text"
                name="nickname"
                length={20}
                inputRef={inputRef1}
                submitted={submitted}
                placeholder="닉네임을 입력해주세요"
              />
            </div>
            <div>
              <SC.SignupLabel>생년월일</SC.SignupLabel>
              <COMP.SignUpInputBirth
                name="birthYear"
                inputRef={inputRef2}
                submitted={submitted}
              />
            </div>
            <div>
              {/* 기본값이 male로 설정되어 있음 */}
              <COMP.SignUpInputRadio />
            </div>
            <div>
              <SC.SignupLabel>휴대전화</SC.SignupLabel>
              <COMP.SignUpInputPhon
                name="phonNumber"
                inputRef={inputRef3}
                submitted={submitted}
              />
            </div>
          </SC.FlexBox>
          <SC.FlexBox $fd={"column"} $gap={20}>
            <div>
              <SC.SignupLabel>이메일/아이디</SC.SignupLabel>
              <COMP.SignUpInputE
                type="email"
                name="email"
                length={30}
                inputRef={inputRef4}
                submitted={submitted}
                placeholder="이메일 형식으로 입력해주세요."
              />
              <COMP.SignUpEmailCheck inputRef={inputRef5} />
            </div>

            <div>
              <SC.SignupLabel>비밀번호</SC.SignupLabel>
              <COMP.SignUpInputP
                name="password"
                length={20}
                inputRef={inputRef6}
                submitted={submitted}
                placeholder="비밀번호를 입력해 주세요."
              />
            </div>

            <div>
              <SC.SignupLabel>비밀번호 확인</SC.SignupLabel>
              <COMP.SignUpInputP
                name="pwChecked"
                length={20}
                inputRef={inputRef7}
                submitted={submitted}
                placeholder="비밀번호를 다시 입력해 주세요."
              />
            </div>

            <div>
              <SC.SignUpSubmitInput
                type="submit"
                value="회원가입"
                $state={check}
              />
            </div>
          </SC.FlexBox>
        </SC.SignupForm>
      </SC.FlexBox>
    </>
  );
};
