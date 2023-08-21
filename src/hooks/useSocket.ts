import { useEffect, useRef } from "react";
import { ManagerOptions, SocketOptions, io } from "socket.io-client";
import { setChatMsg, useAppDispatch } from "../redux";

export const useSocket = (url: string, opts?: Partial<ManagerOptions & SocketOptions> | undefined) => {
	const { current: socket } = useRef(io(url, opts));
	const dispatch = useAppDispatch()

	useEffect(() => {
		socket.connect()

		socket.on("previousM", data => {
      console.log("previousM", data)
    } )

    socket.on("read_message", data => {
      // console.log("read_message", data)
			dispatch(setChatMsg(data))
    })

		return () => {
			if (socket) socket.close(); // socket.disconnect() 이 두개는 같은 명령어
		};

	}, [socket, dispatch]);

	return socket;
};



// emit("이벤트이름", data)
// on("이벤트이름", data)