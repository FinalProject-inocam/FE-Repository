import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import * as Type from '../../types/auth';
import { usePostLoginMutation } from '../../redux';
import { useRouter } from '../../hooks';

export const Login: React.FC = () => {
  const {onNavigate} = useRouter()
  const [loginInfo, setLoginInfo] = useState<Type.User>({
    email: "",
    password: ""
  })

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setLoginInfo({ ...loginInfo, [name]: value })
  }

  const [onpostLogin, {isSuccess, isError, error }] = usePostLoginMutation()
  const onSubmitLogin = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    onpostLogin(loginInfo)
  }

  useEffect(()=> {
    isSuccess && onNavigate('/')()
    isError && console.log("query Err", error)
  }, [isSuccess, isError, error, onNavigate])


  return (
    <form onSubmit={onSubmitLogin}>
      <input type="text" value={loginInfo.email} name='email' onChange={onChangeInput} placeholder='이메일 형식으로 입력해주세요.' />
      <input type="password" value={loginInfo.password} name='password' onChange={onChangeInput} placeholder='비밀번호를 입력해 주세요.' />
      <input type='submit' value="로그인" />
    </form>
  )
};
