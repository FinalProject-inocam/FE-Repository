import { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { Socket, io } from "socket.io-client"

export const useSocket = () => {
  const { id } = useParams()
  const room = id
  const username = id?.split('!')[1]

  const socketRef = useRef<Socket>();

  const onSendMsg = () => {
    socketRef.current && socketRef.current.emit("sendMsg", {
      content:"테스트",
      room,
      username
    })
  }

  useEffect(() => {
    socketRef.current = io(`${process.env.REACT_APP_SOCKET_API}`)
    if(socketRef.current) {
      // 소켓 연결과 동시에, joinRoom 정보 보내기 
      socketRef.current.emit("joinRoom", {
        username, room
      })

      socketRef.current.on("previousMsg", data => {
        console.log(data)
      })

      socketRef.current.on("readMsg", data => {
        console.log(data)
      })
    }
    
  }, [username, room])

  return onSendMsg
}