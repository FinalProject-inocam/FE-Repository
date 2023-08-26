import { FC } from 'react'
import * as Hook from '../../hooks'
import { styled } from 'styled-components'


export const ChatRoom: FC = () => {
  const {
    // 채팅부분
    sendMsg,
    onChangeInput,
    onSendMsg,
    onLeaveRoom,
    // WecRTC 부분
    showWebRTC,
    peerAVideoRef,
    peerBVideoRef,
    mute,
    camara,
    onToggleWebRTC,
    onMute,
    onCamera,
  } = Hook.useSocketRoom()

  return (
    <div>
      <form onSubmit={onSendMsg}>
        <input value={sendMsg} onChange={onChangeInput} style={{ border: "1px solid black" }} />
      </form>
      <button onClick={onLeaveRoom}>채팅방 나가기</button>
      <h1>ChatRoom : emit</h1>
      <h1>ChatRoom : on</h1>
      <hr />
      <button onClick={onToggleWebRTC}>화상연결하기</button>
      {showWebRTC && <div>
        <h1>WebRTC</h1>
        <button onClick={onCamera}>카메라 {!camara ? "끄기" : "켜기"}</button>
        <button onClick={onMute}>음소거 {!mute ? "하기" : "끄기"}</button>
        <Video ref={peerAVideoRef} autoPlay />
        <hr />
        <Video ref={peerBVideoRef} autoPlay />
      </div>}
    </div>
  )
}

const Video = styled.video`
  width: 1000;
  height: 800;
  background-color: black;
  transform: scaleX(-1);
`
