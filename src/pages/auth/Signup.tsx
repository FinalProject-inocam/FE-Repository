import React from "react";
import * as COMP from "../../components";
import * as SC from "../../components";
import { useSignup } from "../../hooks";

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
    onSubmitSign,
  } = useSignup();

  return (
    <SC.SignupForm onSubmit={onSubmitSign} $fd="column" $gap={20}>
      <COMP.SignUpInputE
        type="email"
        name="email"
        length={20}
        inputRef={inputRef1}
        submitted={submitted}
        placeholder="이메일 형식으로 입력해주세요."
      />
      <COMP.SignUpInputN
        type="text"
        name="nickname"
        length={20}
        inputRef={inputRef2}
        submitted={submitted}
        placeholder="이름을 입력해 주세요."
      />
      <COMP.SignUpInput
        type="date"
        name="birthdate"
        length={20}
        inputRef={inputRef3}
        submitted={submitted}
        placeholder="생일을 입력해 주세요."
      />
      <COMP.SignUpInputP
        name="password"
        length={20}
        inputRef={inputRef4}
        submitted={submitted}
        placeholder="비밀번호를 입력해 주세요."
      />
      {}
      <COMP.SignUpInputP
        name="pwChecked"
        length={20}
        inputRef={inputRef5}
        submitted={submitted}
        placeholder="비밀번호를 다시 입력해 주세요."
      />
      <COMP.SignUpInput
        type="text"
        length={20}
        name="phonNumber"
        inputRef={inputRef6}
        submitted={submitted}
        placeholder="휴대전화를 입력해주세요."
      />
      <COMP.SignUpInputRadio inputRef={inputRef7} submitted={submitted} />
      <input type="submit" value="제출" />
    </SC.SignupForm>
  );
};

// import { useSignup } from "../../hooks";
// import { AuthInput, ValidateInputMsg, Timer } from "../../components";

// const [validateCheckCode, setvalidateCheckCode] = useState<boolean>(false);

// const {
// 	signInfo,
// 	//아래것 추가함
// 	certificateEmail,
// 	checkCode,
// 	validiteMsg,
// 	showPW,
// 	onSubmitSign,
// 	onChangeInput,
// 	onCheckEmail,
// 	onCheckNickName,
// 	onCertificateEmail,
// 	onChangeCheckCode,
// 	onClickCheckCode,
// 	onClickShowPW,
// } = useSignup(setvalidateCheckCode);

// <form onSubmit={onSubmitSign}>
// 	<AuthInput
// 	type='text'
// 	value={signInfo.email}
// 	name='email'
// 	onBlur={onCheckEmail}
// 	onChange={onChangeInput}
// 	placeholder='이메일 형식으로 입력해주세요.'
// />
// <ValidateInputMsg $signColor={validiteMsg.validteEmail[1]}>{validiteMsg.validteEmail[0]}</ValidateInputMsg>
// <AuthInput
// 	type='text'
// 	value={signInfo.nickname}
// 	name='nickname'
// 	onBlur={onCheckNickName}
// 	onChange={onChangeInput}
// 	placeholder='이름을 입력해 주세요'
// />
// <AuthInput
// 	type={showPW ? "text" : "password"}
// 	value={signInfo.password}
// 	name='password'
// 	onChange={onChangeInput}
// 	placeholder='비밀번호를 입력해 주세요'
// />
// <div onClick={onClickShowPW}>{showPW ? "숨김" : "표시"}</div>
// <ValidateInputMsg $signColor={validiteMsg.validtepassword[1]}>
// 	{validiteMsg.validtepassword[0]}
// </ValidateInputMsg>
// <AuthInput
// 	type='password'
// 	value={signInfo.pwChecked}
// 	name='pwChecked'
// 	onChange={onChangeInput}
// 	placeholder='비밀번호를 다시 입력해주세요'
// />
// <ValidateInputMsg $signColor={validiteMsg.passwordChMsg[1]}>
// 	{validiteMsg.passwordChMsg[0]}
// </ValidateInputMsg>
// <AuthInput
// 	type='text'
// 	value={signInfo.phone_number}
// 	name='phoneNumber'
// 	onChange={onChangeInput}
// 	placeholder='휴대전화를 입력해 주세요'
// />
// <input type='submit' value='회원가입' />
// <div onClick={onCheckEmail}>이메일 중복확인</div> {/* onBlur */}
// <div onClick={onCertificateEmail}>이메일 인증메일보내기</div>
// <input value={checkCode} onChange={onChangeCheckCode} />
// <div onClick={onClickCheckCode}>이메일 확인</div>
// {!certificateEmail && (
// 	<>
// 		<Timer state={validateCheckCode} />
// 	</>
// )}
// <div onClick={onCheckNickName}>닉네임 중복확인</div>
