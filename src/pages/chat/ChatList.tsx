import { FC, useEffect, useRef } from 'react'
import { useRouter } from '../../hooks'
import { selectDecode, setDecodeToken, useAppDispatch, useAppSelector } from '../../redux'
import { Socket, io } from 'socket.io-client'

export const ChatList:FC =() => {
  const {onNavigate} = useRouter()
  const dispatch = useAppDispatch()
  const {nickname} = useAppSelector(selectDecode)

  const refreshToken =
  document.cookie &&
  document.cookie
    .split(';')
    .filter((cookies) => cookies.includes('refreshToken'))[0]
    ?.split('=')[1];

  useEffect(()=>{
    dispatch(setDecodeToken(refreshToken))

  }, [dispatch, refreshToken])

  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io(`${process.env.REACT_APP_SOCKET_API}`)
    if(socketRef.current) {
      
      nickname && socketRef.current.emit("username", {nickname})

      socketRef.current.on("connected", data => {
        console.log(data)
      })
    }
    
  }, [nickname])


  return (
    <div>
      <h1>채팅 테스트</h1>
      <div>
        <h2>관리자와의 통신</h2>
        <button onClick={onNavigate({url:`admin!${nickname}`})}>관리자통신</button>
      </div>
      <div>
        <h2>유저검색</h2>
        <button onClick={onNavigate({url:`user1!${nickname}`})}>user1</button>
        <button onClick={onNavigate({url:`user2!${nickname}`})}>user2</button>
      </div>

    </div>
  )
}
