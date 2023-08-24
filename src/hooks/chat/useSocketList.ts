import { useEffect, useRef, useState } from "react"
import { selectDecode, setDecodeToken, useAppDispatch, useAppSelector } from "../../redux"
import { useRouter } from "../useRouter"
import { Socket, io } from "socket.io-client"

export const useSocketList = () => {
  const { onNavigate } = useRouter()
  const dispatch = useAppDispatch()
  const { nickname } = useAppSelector(selectDecode)
  const [roomList, setRoomList] = useState<string[]>([])
  const [socektErr, setSocketErr] = useState<boolean>(true)

  const refreshToken =
    document.cookie &&
    document.cookie
      .split(';')
      .filter((cookies) => cookies.includes('refreshToken'))[0]
      ?.split('=')[1];

  useEffect(() => {
    dispatch(setDecodeToken(refreshToken))

  }, [dispatch, refreshToken])

  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io(`${process.env.REACT_APP_SOCKET_API}`)
    socketRef.current.on('connect_error', () => {
      setSocketErr(false)
    });

    if (socketRef.current) {
      setSocketErr(true)
      // 01-01 접속후, 소켓이 연결되면, 사용자이름 보내기
      nickname && socketRef.current.emit("connection", {username:nickname})

       // 01-02 사용자이름 전송의 결과로, 룸리스트 
      socketRef.current.on("connected", room => {
        setRoomList(room)
      })
    }

  }, [nickname])

  return { nickname, roomList, socektErr,onNavigate }
}