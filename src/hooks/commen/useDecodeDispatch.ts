import { useEffect } from "react";
import * as RD from "../../redux";

export const useDecodeDispatch = () => {
  const refreshToken = document.cookie.split(';').filter((cookies) => cookies.includes('refreshToken'))[0]?.split('=')[1];
  const dispatch = RD.useAppDispatch()
  useEffect(()=> {
    refreshToken && dispatch(RD.setDecodeToken(refreshToken))
  }, [refreshToken, dispatch])
}