import { useEffect } from "react"
import { selectDecode, setDecodeToken, useAppDispatch, useAppSelector } from "../../redux";

export const useDecodeToken = () => {
  const dispatch = useAppDispatch()
  const decodeToken = useAppSelector(selectDecode)
  useEffect(() => {
    const token =  document.cookie &&
    document.cookie
      .split(';')
      .filter((cookies) => cookies.includes('refreshToken'))[0]
      ?.split('=')[1];
      token && dispatch(setDecodeToken(token))
  }, [dispatch])

  return decodeToken
}