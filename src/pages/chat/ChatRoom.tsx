import { FC } from 'react'
import { useSocket } from '../../hooks'


export const ChatRoom: FC = () => {
  const{
    // 채팅부분
    sendMsg, onChangeInput, onSendMsg, onLeaveRoom,
    // WecRTC 부분
    showWebRTC,
    peerAVideoRef,
    peerBVideoRef,
    onToggleWebRTC,
    onMute, 
    mute,
    onCamera,
    camara,
    audioList,
    onChangeAudio
  } = useSocket()

  // console.log(audioList)

  /*
  Record<string, string>
  audioList
  deviceId: "54D9354A71B935C33CDF4848B383E281077342EB"  
  groupId: "25560712DC2F13C5CF3BF5EC5F3EB586FDB2183A"
  kind: "audioinput"
  label: "MacBook Air 마이크"
  */

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
        <select onChange={onChangeAudio}>
          {audioList.map(({deviceId, label}:Record<string, string>) => <option key={deviceId} value={deviceId} children={label}/>)}
        </select>
        <video ref={peerAVideoRef} style={{
        width: 1000,
        height: 800,
        backgroundColor: "black",
        transform: "scaleX(-1)"
      }}
        autoPlay />
        <hr/>
        <video ref={peerBVideoRef} style={{
        width: 1000,
        height: 800,
        backgroundColor: "black",
        transform: "scaleX(-1)"
      }}
        autoPlay />
      </div>}
    </div>
  )
}
