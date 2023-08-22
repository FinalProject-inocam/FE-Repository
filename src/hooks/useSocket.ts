import { ChangeEvent, useEffect, useState, useRef } from "react"; 
import { io } from "socket.io-client";
import * as RTK from "../redux";
import { useParams } from "react-router-dom";

export const useSocket = () => {
	const {id:getId} = useParams();
	const dispatch = RTK.useAppDispatch()
	const [sendM, setSendM] = useState<string>("")
	// const refreshToken =
	// document.cookie &&
	// document.cookie
	// 	.split(';')
	// 	.filter((cookies) => cookies.includes('refreshToken'))[0]
	// 	?.split('=')[1];
	const { current: socket } = useRef(io(`${process.env.REACT_APP_SOCKET_API}?room=${getId}&username=${getId?.split('!')[1]}}`, {
		// query : {
		// 	username:getId?.split('!')[1],
		// 	autholization : refreshToken
		// }
	}));
 

	
	// Client InputMsg
	const onChangeMsg = (e:ChangeEvent<HTMLInputElement>) => {
		setSendM(e.target.value)
	}

	// Client 메시지 보내기, socket.emit("sendMsg")
  const onSendMsg = () => {
    socket.emit("sendMsg", {
      content: "테스트",
      username: getId?.split('!')[1],
      room: getId
    })
    dispatch(RTK.setChatMsg({
      content: sendM,
      username: getId?.split('!')[1],
      room: getId
    }))
    setSendM("")
  }

	useEffect(()=> {
		socket.connect()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	useEffect(() => {
		// previousMsg 받아오기 
		socket.on("previousMsg", data => {
      console.log("previousMsg", data)
			// dispatch(RTK.setChatMsg(data))
    })

		// // previousMsg 이후, socket.on("readMsg") 상대가 전달하는 메시지 받아오기  
    socket.on("readMsg", data => {
			console.log(data)
			// dispatch(RTK.setChatMsg(data))
    })
		socket.on("error", data => {
			console.log(data)
			// dispatch(RTK.setChatMsg(data))
    })

		return () => {
			if (socket) socket.close(); 
		};

	}, [socket, dispatch]);

	return {sendM, onChangeMsg, onSendMsg};
};

// const opts = {
// 	reconnectionAttempts: 1,
// 	reconnectionDelay: 1000,
// 	autoConnect: false,
// }
