import { ChangeEvent, useEffect, useState } from "react"
import { useSocket } from "../../hooks/useSocket"

export const Chat: React.FC = () => {
  const [chatMsg, setChatMsg] = useState<string>("")
  const [receiveData, setReceiveData] = useState<{ id: string, chatMsg: string }[]>([])

  const onChangeChatMsg = (e: ChangeEvent<HTMLInputElement>) => {
    setChatMsg(e.target.value)
  }


  const onBlurChat = () => {
    chatMsg && socket.emit('send_message', {
      content: chatMsg,
      username: "edwin",
      nickname: 'YOUR_USERNAME',
      messageType: "CLIENT",
      room: "adminedwin"
    })
    chatMsg && setReceiveData((prevReceive) => [...prevReceive, { id: "나요", chatMsg }]);
    setChatMsg("")
  }

  const socket = useSocket(`${process.env.REACT_APP_SOCKET_API}?room=adminedwin&username=edwin`, {
    reconnectionAttempts: 1,
    reconnectionDelay: 1000,
    autoConnect: false,
  })

  useEffect(() => {
    /* Connect to the Web Socket */
    socket.connect();

    socket.on("read_message", (data) => {
      console.log(data)
    });
  }, [socket])


  return (
    <div>
      메시지 보내기 : <input type="text" value={chatMsg} onChange={onChangeChatMsg} onBlur={onBlurChat} /><br />
      {receiveData && receiveData.map(({ id, chatMsg }, index) => (
        <div style={{ textAlign: id === "나요" ? "end" : "start" }} key={index}>
          <p>아이디 : {id}</p>
          <p>{chatMsg}</p>
          <hr />
        </div>
      ))}
    </div>
  )
}

/*
  일반적인 웹소켓 연결 과정은 다음과 같습니다:
  클라이언트는 HTTP를 통해 웹 서버에 요청을 보냅니다. 일반적으로 "http://localhost:3001"과 같이 요청을 보냅니다.
  웹 서버는 HTTP 요청을 받고, 클라이언트에게 필요한 HTML, CSS, JavaScript 파일 등을 응답합니다.
  클라이언트가 JavaScript를 통해 웹소켓을 생성하고 서버와 웹소켓 연결을 시도합니다. 이때 "ws://localhost:3001"과 같은 주소를 사용합니다.
  웹소켓 연결이 성공하면, 이후 데이터를 웹소켓을 통해 실시간으로 주고받을 수 있게 됩니다.
  따라서 최초 연결은 일반적으로 HTTP를 통해 이루어집니다. 이후 웹소켓을 사용하여 실시간 통신이 가능하도록 됩니다. 웹소켓은 기존의 HTTP와는 다르게 지속적인 연결을 유지하므로, 실시간 기능이 필요한 경우에 효과적으로 사용됩니다.
*/