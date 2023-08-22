import { FC } from 'react'
import { useSocket } from '../../hooks'


export const ChatRoom: FC = () => {
  const onSendMsg = useSocket()

  return (
    <div>
      <button onClick={onSendMsg}>onSendMsg 테스</button>
      <h1>ChatRoom : emit</h1>
      <h1>ChatRoom : on</h1>
    </div>
  )
}
