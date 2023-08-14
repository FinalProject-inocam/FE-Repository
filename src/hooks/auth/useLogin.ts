import { ChangeEvent, FormEvent, useState } from 'react';
import { usePostLoginMutation } from '../../redux';
import * as Type from '../../types';

export const useLogin = ():Type.useLogin  => {

    const [loginInfo, setLoginInfo] = useState<Type.User>({
        email: "",
        password: ""
    })

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target
        setLoginInfo({ ...loginInfo, [name]: value })
    }

    const [onpostLoginRTK, { isLoading, isSuccess, data, isError, error }] = usePostLoginMutation()

    const onSubmitLogin = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        onpostLoginRTK(loginInfo)
    }

    const onSnsLogin = (sns: string) => () => {
        switch (sns) {
            case "kakao":
                window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API}&redirect_uri=${process.env.REACT_APP__KAKAO_REDIRECT_URL}&response_type=code`
                break
            case "google":
                window.location.href = `https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=241187094315-9h1rc47r7k69fr03uldk4dggtq8l739v.apps.googleusercontent.com&redirect_uri=https://localhost:3000/api/auth/login/google&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&service=lso&o2v=1&flowName=GeneralOAuthFlow`
                break
            case "naver":
                window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=unQLi7LeZUDuiJZokZX7&state=STATE_STRING&redirect_uri=http://localhost:3000/api/auth/login/naver`
                break    
            default:
                break
        }
    }

    return { loginInfo, isLoading, isSuccess, data, isError, error, onChangeInput, onSubmitLogin, onSnsLogin }
}