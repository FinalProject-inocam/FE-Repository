import { ChangeEvent, FormEvent, useState } from 'react';
import { usePostLoginMutation } from '../../redux';
import * as Type from '../../types';

export const useLogin = () => {

    const [loginInfo, setLoginInfo] = useState<Type.User>({
        email: "",
        password: ""
    })

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target
        setLoginInfo({ ...loginInfo, [name]: value })
    }

    const [onpostLoginRTK, {isSuccess, data, isError, error }] = usePostLoginMutation()

    const onSubmitLogin = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        onpostLoginRTK(loginInfo)
    }

    return {loginInfo, onChangeInput, onSubmitLogin, isSuccess, data, isError, error}
}