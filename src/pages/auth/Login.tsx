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


  return (
    <form onSubmit={onSubmitLogin}>
      <input type="text" value={loginInfo.email} name='email' onChange={onChangeInput} placeholder='이메일 형식으로 입력해주세요.' />
      <input type="password" value={loginInfo.password} name='password' onChange={onChangeInput} placeholder='비밀번호를 입력해 주세요.' />
      <input type='submit' value="로그인" />
    </form>
  )
};
