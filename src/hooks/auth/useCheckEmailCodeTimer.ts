import { useEffect, useState } from "react";
import * as Type from "../../types";

export const useCheckEmailCodeTimer = (
  state: boolean
): Type.UseCheckEmailCodeTimer => {
  const [time, setTime] = useState<number>(20);

  const decreaseTime = () => {
    setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
  };

  useEffect(() => {
    const id: any = decreaseTime();
    if (time < 0 || state) {
      return () => clearInterval(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sec =
    String(time % 60).length === 1
      ? "0" + String(time % 60)
      : String(time % 60);
  const min = Math.floor(time / 60);

  return { time, sec, min };
};
