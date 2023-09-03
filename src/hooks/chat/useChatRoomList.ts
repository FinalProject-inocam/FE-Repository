import { useEffect, useRef, useState } from "react"
import { selectDecode, setDecodeToken, useAppDispatch, useAppSelector } from "../../redux"
import { useRouter } from "../useRouter"
import { Socket, io } from "socket.io-client"

export const useChatRoomList = () => {
  const { onNavigate } = useRouter()
  const dispatch = useAppDispatch()
  const { nickname } = useAppSelector(selectDecode)

  /*
    01 socketRef 소켓 관련 Ref
    02 socekt 통신에 대한 에러 제어 
    03 roomList 소켓으로 받아온 RoomList state
    04 chatListHeight 사용자반응에 따른 RoomList 높이조절
  */ 
  const socketRef = useRef<Socket>();
  const [roomList, setRoomList] = useState<any>([])
  const [socektErr, setSocketErr] = useState<boolean>(false)
  const [chatListHeight, setChatListHeight] = useState<number>(650)
  const refreshToken =
    document.cookie &&
    document.cookie
      .split(';')
      .filter((cookies) => cookies.includes('refreshToken'))[0]
      ?.split('=')[1];

  /* useEffect [1] 사용자정보 세팅, 라우터변경에 따른 Token 세팅 -------------  */     
  useEffect(() => {
    dispatch(setDecodeToken(refreshToken))

  }, [dispatch, refreshToken])

  /* useEffect [2] 소켓연결관련 부분 ------------------------------------  */ 

  useEffect(() => {
    socketRef.current = io(`${process.env.REACT_APP_SERVER_API}`)
    socketRef.current.on('connect_error', () => {
      setSocketErr(true)
    });

    if (socketRef.current) {
      setSocketErr(false)
      // 01-01 접속후, 소켓이 연결되면, 사용자이름 보내기
      nickname && socketRef.current.emit("connection", {username:nickname})

       // 01-02 사용자이름 전송의 결과로, 룸리스트 
      socketRef.current.on("connected", room => {
        setRoomList(room)
      })
    }
  }, [nickname])

  /* 
    useEffect [3] --------------------------------------------------  
    사용자의 창조절에 따른, ChatRoomList 높이조절   
    150은 그리드 첫 요소, 20은 사이 마진값 
  */ 

  useEffect(() => {
    const onChangeChatListHeight = () => {
      setChatListHeight(window.innerHeight - 150 - 40)
    }
    onChangeChatListHeight()
    window.addEventListener("resize", onChangeChatListHeight)
    return () => {
      window.removeEventListener("resize", onChangeChatListHeight)
    }
  }, [])

  return { nickname, roomList, socektErr,onNavigate, chatListHeight }
}