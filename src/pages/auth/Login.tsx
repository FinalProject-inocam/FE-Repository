import React, {useEffect} from 'react';
import { useLogin, useRouter } from '../../hooks';



export const Login: React.FC = () => {
  const {onNavigate} = useRouter()
  console.log(window.location);
  
  const  {loginInfo, isSuccess, data, isError, error, onChangeInput, onSubmitLogin, onSnsLogin} = useLogin()

  useEffect(()=> {
    if (isSuccess){
      onNavigate('/')()
    }
    isError && console.log("query Err", error)
  }, [isSuccess, data, isError, error, onNavigate])

  return (
    <>
    <form onSubmit={onSubmitLogin}>
      <input type="text" value={loginInfo.email} name='email' onChange={onChangeInput} placeholder='이메일 형식으로 입력해주세요.' />
      <input type="password" value={loginInfo.password} name='password' onChange={onChangeInput} placeholder='비밀번호를 입력해 주세요.' />
      <input type='submit' value="로그인" />
    </form>

    <button onClick={onSnsLogin("kakao")}>카카오로 로그인하기</button>
    <button onClick={onSnsLogin("google")}>구글로 로그인하기</button>
    <button onClick={onSnsLogin("naver")}>네이버로 로그인하기</button>
    </>
  )
};
