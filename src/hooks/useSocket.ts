import { useEffect, useRef } from "react";
import { ManagerOptions, SocketOptions, io } from "socket.io-client";

export const useSocket = (
  url:string,
  opts?:Partial<ManagerOptions & SocketOptions> | undefined
) => {
  const {current: socket} = useRef(io(url, opts))
  useEffect(()=> {
    return () => {
      // // socket.close 열려있는 헤당 연결을 종료하는 메소드 
      if(socket) socket.close(); // socket.disconnect() 이 두개는 같은 명령어
    }
  }, [socket])
  return socket
}

