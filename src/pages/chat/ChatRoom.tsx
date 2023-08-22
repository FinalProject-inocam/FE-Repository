import { FC } from 'react'
import { useSocket } from '../../hooks/useSocket';
import * as RTK from '../../redux';
import { styled } from 'styled-components';

export const ChatRoom:FC =() => {
  const getchatMsg = RTK.useAppSelector(RTK.selectchatMsg)
  const {sendM, onChangeMsg, onSendMsg} = useSocket()

  return (
    <div>
      <h1>ChatRoom : emit</h1>
      <input value={sendM} onChange={onChangeMsg}/>
      <input type="button" onClick={onSendMsg} value="보내기" />
      
      <h1>ChatRoom : on</h1>
      <CustromP>{`asd\nasdf`}</CustromP>
      {getchatMsg.map((msg:any, idx:number) => msg.content &&  <div key={idx}>{msg.content}</div>)}
    </div>
  )
}


const CustromP = styled.p`
  white-space: pre-wrap;
`
