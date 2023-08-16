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

  const onSnsLogin = (sns: string) => () => {
    console.log(sns);
    
    switch (sns) {
        case "kakao":
          window.location.href=`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API}&redirect_uri=${window.location.origin}/${process.env.REACT_APP_KAKAO_REDIRECT_URL}&response_type=code`
            break
        case "google":
          window.location.href=`https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=${process.env.REACT_APP_GOOGLE_REST_API}&redirect_uri=${window.location.origin}/${process.env.REACT_APP_GOOGLE_REDIRECT_URL}&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&service=lso&o2v=1&flowName=GeneralOAuthFlow`
            break
        case "naver":
            window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_REST_API}&state=STATE_STRING&redirect_uri=${window.location.origin}/${process.env.REACT_APP_NAVER_REDIRECT_URL}`
            break    
        default:
            break
    }
}

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
