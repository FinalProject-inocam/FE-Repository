import React, { useEffect } from 'react';
import { useRouter, useSignup } from '../../hooks';

export const Signup: React.FC = () => {
  const { onNavigate } = useRouter()

  const { onSubmitSign, signInfo, onChangeInput, onCheckEmail, onCheckNickName,
    isSuccess, data, isError, error,
    checkEmailSuccess, checkEmailData, checkEmailError, emailError,
    checkNickNameSuccess, checkNickNameData, checkNickNameError, nickNameError } = useSignup()

  useEffect(() => {
    if (isSuccess) onNavigate('/login')()
    if (checkEmailSuccess) console.log(checkEmailData)
    if (checkEmailError) console.log(emailError);
    if (checkNickNameSuccess) console.log(checkNickNameData)
    if (checkNickNameError) console.log(nickNameError);

  }, [isSuccess, data, isError, error, onNavigate,
    checkEmailSuccess, checkEmailData, checkEmailError, emailError,
    checkNickNameSuccess, checkNickNameData, checkNickNameError, nickNameError])

  return (
    <form onSubmit={onSubmitSign}>
      <input type='text' value={signInfo.email} name='email' onBlur={onCheckEmail} onChange={onChangeInput} placeholder='이메일 형식으로 입력해주세요.' />
      <input type='text' value={signInfo.nickname} name='nickname' onBlur={onCheckNickName} onChange={onChangeInput} placeholder='이름을 입력해 주세요' />
      <input type='password' value={signInfo.password} name='password' onChange={onChangeInput} placeholder='비밀번호를 입력해 주세요' />
      <input type='text' value={signInfo.phone_number} name='phone_number' onChange={onChangeInput} placeholder='휴대전화를 입력해 주세요' />
      <input type='submit' value="회원가입" />
      <div onClick={onCheckEmail}>이메일 중복확인</div> {/* onBlur */}
      <div onClick={onCheckNickName}>닉네임 중복확인</div>

    </form>
  );
};
