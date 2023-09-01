import React, { useEffect, useRef } from "react";

export const Error: React.FC = () => {
	const errRef = useRef<HTMLDivElement | null>(null);

  useEffect(()=> {
    if(errRef.current) {
      const style = errRef.current.style;
      style.height = `${window.innerHeight}px`;
      style.width = `${window.innerWidth}px`;
      style.position = "fixed";
      style.top = "0";
      style.left = "0";
      style.backgroundColor = "black"
    }
    // Three.js 관련 다른 라우터에서 새로고침후, 홈으로 이동했을 때 useGlft 로드 문제
    window.location.pathname === '/' && window.location.reload()
  },[])
  return <div ref={errRef} />
};
