import { ChangeEvent, FormEvent, useState } from 'react';
import * as Type from '../../types/auth';
import { useGetEmailCheckQuery, useGetNickCheckQuery, usePostSignupMutation } from '../../redux';

export const useSignup = () => {

  const [signInfo, setSignInfo] = useState<Type.UserInfo>({
    email: "",
    password: "",
    nickname: "",
    phone_number: "",
    isAdmin: false,
    admincode: "E002"
  })

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setSignInfo({ ...signInfo, [name]: value })
    setCheckEmail(true)
    setCheckNickName(true)
  }

  const [onpostSignupRTK, { isSuccess, data, isError, error }] = usePostSignupMutation()
  const onSubmitSign = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    onpostSignupRTK(signInfo)
  }

  const [checkEmail, setCheckEmail] = useState(true)
  const { isSuccess: checkEmailSuccess, data: checkEmailData, isError: checkEmailError, error: emailError } = useGetEmailCheckQuery(signInfo.email, {
    skip: checkEmail,
  })

  const [checkNickName, setCheckNickName] = useState(true)
  const { isSuccess: checkNickNameSuccess, data: checkNickNameData, isError: checkNickNameError, error: nickNameError } = useGetNickCheckQuery(signInfo.nickname, {
    skip: checkNickName
  })

  const onCheckEmail = (): void => {
    !!signInfo.email && setCheckEmail(false)
  }


  const onCheckNickName = (): void => {
    !!signInfo.nickname && setCheckNickName(false)
  }
  return { onChangeInput, onSubmitSign, onCheckEmail, onCheckNickName, 
            signInfo, isSuccess, data, isError, error, 
            checkEmailSuccess, checkEmailData, checkEmailError, 
            emailError, checkNickNameSuccess, checkNickNameData, 
            checkNickNameError, nickNameError }
}

