import { MouseEvent, useState } from "react";

export const useDebounce = () => {
  const [timerId, setTimerId] = useState< NodeJS.Timeout | null>(null);
  const handleDebounce = (callback:any, postId:number) => { 
    if (timerId) clearTimeout(timerId)
    const newTimerId = setTimeout(() => {
      callback({postId})
    }, 500);
    setTimerId(newTimerId);
  };

  const onDebounce = (callback:any, postId:number) => (e:MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    handleDebounce(callback, postId)
  }
  return onDebounce
}