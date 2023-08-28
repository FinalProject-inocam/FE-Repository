import { useState, MouseEvent } from "react";

export const useDebounce = (callback:any, postId?:number) => {
  const [timerId, setTimerId] = useState< NodeJS.Timeout | null>(null);
  const handleDebounce = () => { 
    if (timerId) clearTimeout(timerId)
    const newTimerId = setTimeout(() => {
      console.log("디바운스 동작하지롱");
      callback({postId})
    }, 500);
    setTimerId(newTimerId);
  };

  const onDebounce = (e:MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    handleDebounce()
  }
  return onDebounce
}