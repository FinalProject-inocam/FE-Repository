import * as RD from "../../redux";

export const useLogout = (setState?:any):any => {
  const dispatch = RD.useAppDispatch()
  const {sub} = RD.useAppSelector(RD.selectDecode)
  const onLogout = () => {
    document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    dispatch(RD.deleteToken())
    setState && setState((pre:boolean) => !pre)
  }
  return {sub, onLogout}
}