import { FC, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSocket } from '../../hooks/useSocket';
import { selectchatMsg, setChatMsg, useAppDispatch, useAppSelector } from '../../redux';

export const ChatRoom:FC =() => {
  const {id:getId} = useParams();
  const [sendM, setSendM] = useState<string>("")
  const dispatch = useAppDispatch()

  console.log(getId)
  const socket = useSocket(`${process.env.REACT_APP_SOCKET_API}?room=${getId}&username=${getId?.split('&')[1]}}`, {
    reconnectionAttempts: 1,
    reconnectionDelay: 1000,
    autoConnect: false,
  })

  const onBlurSendM = () => {
    socket.emit("send_message", {
      content: sendM,
      username: getId?.split('&')[1],
      messageType: "CLIENT",
      room: getId
    })
    dispatch(setChatMsg({
      content: sendM,
      username: getId?.split('&')[1],
      messageType: "CLIENT",
      room: getId
    }))
    setSendM("")
  }

  const getchatMsg = useAppSelector(selectchatMsg)
  console.log(getchatMsg)


  return (
    <div>
      <h1>ChatRoom : emit</h1>
      <input value={sendM} onChange={(e)=> setSendM(e.target.value)} onBlur={onBlurSendM}/>
      <h1>ChatRoom : on</h1>
      {getchatMsg.map((msg:any, idx:number) => msg.content &&  <div key={idx}>{msg.content}</div>)}
    </div>
  )
}
