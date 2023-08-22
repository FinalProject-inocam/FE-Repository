import { useEffect, useState } from "react";
import * as RD from "../../redux";
import * as Hooks from "./useDecodeDispatch";

export const useProtectiveRouter = ():{decodeLoaded:boolean, sub:string} => {
    Hooks.useDecodeDispatch();
  const [decodeLoaded, setDecodeLoaded] = useState(false);
  const { sub } = RD.useAppSelector(RD.selectDecode)

  useEffect(() => {
    setDecodeLoaded(true);
  }, []);

  return {decodeLoaded, sub}
}