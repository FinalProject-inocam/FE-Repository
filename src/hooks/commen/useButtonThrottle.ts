import { useCallback } from "react";

export const useButtonThrottle = (setState:any, delay:number) => {
  const handleThrottle = (callback: () => void, delay: number) => {
    let timeId: NodeJS.Timeout | null = null;
    
    return () => {
      if (timeId) return;
      callback();
      timeId = setTimeout(() => {
        timeId = null;
      }, delay);
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onThrottle = useCallback(
    handleThrottle(() => {
      setState((pre:boolean) => !pre);
    }, delay),
    []
  );
  return onThrottle
}