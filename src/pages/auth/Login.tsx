import React, {useEffect} from 'react';
import { useLogin, useRouter } from '../../hooks';

export const Login: React.FC = () => {
  const {onNavigate} = useRouter()
  const  {loginInfo, onChangeInput, onSubmitLogin, isSuccess, data, isError, error} = useLogin()

  useEffect(()=> {
    if (isSuccess){
      onNavigate('/')()
    }
    isError && console.log("query Err", error)
  }, [isSuccess, data, isError, error, onNavigate])

  const onSnsLogin = () => {
    window.location.href=`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&response_type=code`
  }

  const onGoogleLogin = () => {
    window.location.href=`https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=241187094315-9h1rc47r7k69fr03uldk4dggtq8l739v.apps.googleusercontent.com&redirect_uri=http://inocamfinal.s3-website.ap-northeast-2.amazonaws.com/login/oauth2/code/google&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&service=lso&o2v=1&flowName=GeneralOAuthFlow`
  }

  return (
    <>
    <form onSubmit={onSubmitLogin}>
      <input type="text" value={loginInfo.email} name='email' onChange={onChangeInput} placeholder='이메일 형식으로 입력해주세요.' />
      <input type="password" value={loginInfo.password} name='password' onChange={onChangeInput} placeholder='비밀번호를 입력해 주세요.' />
      <input type='submit' value="로그인" />
    </form>
    <button onClick={onSnsLogin}>카카오로 로그인하기</button>
    <button onClick={onGoogleLogin}>구글로 로그인하기</button>
    </>
  )
};
