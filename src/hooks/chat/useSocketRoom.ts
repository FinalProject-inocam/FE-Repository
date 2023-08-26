import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { Socket, io } from "socket.io-client"
import { useRouter } from "../useRouter"

export const useSocketRoom = () => {
  const { onNavigate } = useRouter();
  const { id } = useParams();

  /*
    Chatting 관련 상태부 ------------------------------------------------------------------------  //
      01 room : useParams에서 받아온, room 정보
      02 username : useParams에서 받아온, username 정보
      03 socketRef : socketRef이 담겨질 상태, useEffect 01-01 소켓연결하기
      04 sendMsg : 채팅메시지 관련 상태 
  */

  const room = id;
  const username = id?.split('!')[1];
  const socketRef = useRef<Socket>();
  const [sendMsg, setSendMsg] = useState<string>("")

  /*
    WecRTC 관련 상태부 ------------------------------------------------------------------------  //
      01 showWebRTC : WebRTC 화면을 제어하는 상태
      02 mute : 카메라 음향조절 상태
      03 camara : 카메라 영상조절 상태
      04 peerAVideoRef : PeerA Video 태그
      05 peerBVideoRef : PeerB Video 태그
      06 peerRef : RTCPeerConnection 상태
      07 streamRef : getUserMedia 사용자로부터 받아온 영상정보 상태 
  */

  const [showWebRTC, setShowWebRTC] = useState<boolean>(false)
  const [mute, setMute] = useState<boolean>(false)
  const [camara, setCamara] = useState<boolean>(false)
  const peerAVideoRef = useRef<HTMLVideoElement>(null);
  const peerBVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<RTCPeerConnection>();
  const streamRef = useRef<MediaStream | null>(null)


  /*
    Chatting 관련 함수부 ------------------------------------------------------------------------  //
      01 onChangeInput : 채팅메시지 input, 상태04 sendMsg
      02 onSendMsg : 채팅메시지 전송, 상태04 sendMsg
      03 onLeaveRoom : 채팅방 나가기
  */

      const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSendMsg(e.target.value)
      }
    
      const onSendMsg = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        socketRef.current && socketRef.current.emit("sendMsg", {
          content: sendMsg,
          room,
          username
        })
        setSendMsg("")
      }
    
      const onLeaveRoom = () => {
        socketRef.current && socketRef.current.emit("leaveRoom", {
          room,
          username
        })
        onNavigate({ url: '/chat' })()
      }

  /*
    WebRTC 관련 함수부 ------------------------------------------------------------------------  //
      01 onToggleWebRTC : WebRTC 화면을 onOff 하는 함수, 상태01 showWebRTC
      02 onMute : 카메라의 음향 onOff 하는 함수, 상태02 mute
      03 onCamera : 카메라의 영상 onOff 하는 함수, 상태03 camara
      04 getMedia : getUserMedia을 통해 영상 정보 취득, RTCPeerConnection getTracks에 취득정보 등록 
      05 stopMedia : 상태01 showWebRTC 변경 또는 언마운트 시, WebRTC 종료하는 함수 
      06 makeConnection : 상태07 peerRef : RTCPeerConnection을 실행하는 함수 
      07 Signaling (1) createOffer
        - PeerA와 PeerB의 접속을 확인하고, PeerA에서 초대장을 만들어, PeerB에게 emit 하는 함수 
        - PeerA에 대한 정보(누구인지, 어디에있는지 등)
        - Signaling의 시작
      08 Signaling (2) createAnswer
        - PeerA의 초대장을 받은, PeerB가 응답서신에 해당되는 패킷을 PeerA에게 emit 하는 함수 
        - PeerB에 대한 정보(누구인지, 어디에있는지 등)
      09 makeConnection 추가 : peerRef.current.onicecandidate 후보자 정보를 생성하고, emit("candidate") PeerA-PeerB 서로 전달하고 
      10 makeConnection 추가 : peerRef.current.ontrack 전달받은 정보를 peerBVideoRef에 등록하여 영상 송출하기 
  */

  const onToggleWebRTC = () => {
    setShowWebRTC(pre => !pre)
  }

  const onMute = () => {
    streamRef.current && streamRef.current.getAudioTracks().forEach(track => track.enabled = !track.enabled)
    setMute(pre => !pre)
  }
  const onCamera = () => {
    streamRef.current && streamRef.current.getVideoTracks().forEach(track => track.enabled = !track.enabled)
    setCamara(pre => !pre)
  }

  const getMedia = async () => {
    try {
      streamRef.current = await navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
      peerAVideoRef.current
        && (peerAVideoRef.current.srcObject = streamRef.current)
      streamRef.current
        .getTracks().forEach((track) => {
          streamRef.current !== null
            && peerRef.current
            && peerRef.current
              .addTrack(track, streamRef.current)
        });
    } catch (e) {
      console.error(e);
    }
  }

  const stopMedia = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }

  const makeConnection = async () => {
    peerRef.current = new RTCPeerConnection();

    if (peerRef.current) {
      peerRef.current.onicecandidate = (e: any) => {
        socketRef.current && socketRef.current.emit("candidate", { candidate: e.candidate, room });
      };

      peerRef.current.ontrack = (e) => {
        peerBVideoRef.current && (peerBVideoRef.current.srcObject = e.streams[0]) 
      }
    }

    streamRef.current
      && await streamRef.current
        .getTracks().forEach((track) => {
          streamRef.current && peerRef.current && peerRef.current
            .addTrack(track, streamRef.current)
        });
  }

  const createOffer = async () => {
    const offer = peerRef.current && await peerRef.current.createOffer();
    peerRef.current && peerRef.current.setLocalDescription(offer);
    socketRef.current && socketRef.current.emit("offer", { offer, room });
  };

  const createAnswer = async (getoffer: RTCSessionDescription) => {
    if (peerRef.current) {
      await peerRef.current.setRemoteDescription(getoffer);
      const answer = await peerRef.current.createAnswer();
      peerRef.current.setLocalDescription(answer);
      socketRef.current && socketRef.current.emit("answer", { answer, room });
    }
  };

  /* 
    Chatting 관련 useEffect 부 (1) ----------------------------------------------------------------------
      01 소켓연결하기 : socketRef.current = io
      02 룸연견하기 : emit("joinRoom")
      03 이전 대화내용 불러오기 : on("previousMsg")
      04 상대메시지 확인하기 : on("readMsg")
      05 상대의 채팅방 종료메시지 : on("peerOut")
  */

  useEffect(() => {
    socketRef.current = io(`${process.env.REACT_APP_SERVER_API}`, {
      reconnectionAttempts: 2,
      reconnectionDelay: 500
    })
    if (socketRef.current) {

      socketRef.current.emit("joinRoom", {
        username, room
      })

      socketRef.current.on("previousMsg", () => {
        // console.log(data)
      })

      socketRef.current.on("readMsg", () => {
        // console.log(data)
      })

      socketRef.current.on("peerOut", () => {
        // console.log(data)
      })
    }

  }, [username, room])

  /* 
    WebRTC 관련 useEffect 부 (2) ----------------------------------------------------------------------
      01 WebRTC 연결하기 : emit("joinRTC" -> room, username, state:true)
          - PeerA!PeerB => conat arr = {PeerA:false, PeerB: false}
          - PeerA - state true => {PeerA:true, PeerB: false}
          - PeerB - state true => {PeerA:true, PeerB: true} => B가 준비가 되었을 때 
          - PeerA.state && PeerB.state && emit => A한테 전달
      02 Signaling (1, PeerA) : on("joinedRTC") -> 함수09 createOffer 실행, PeerA setLocalDescription
      03 Signaling (2, PeerB) : on("getOffer") -> 함수10 createAnswer 실행, peerB setRemoteDescription, setLocalDescription
      04 Signaling (3, PeerA) : on("getAnswer" -> PeerA setRemoteDescription
      ---- Peer To Peer 생성, addICECandidate 준비상태 : 브라우저가 서로 소통할 수 있게 하는 방법(WebRTC 프로토콜)
  */

  useEffect(() => {
    if (showWebRTC) {
      getMedia()
      makeConnection()
      if (socketRef.current) {
        socketRef.current.emit("joinRTC", { room, username })

        socketRef.current.on("joinedRTC", async () => {
          streamRef.current && createOffer()
        })

        socketRef.current.on("getOffer", getoffer => {
          createAnswer(getoffer)
        })

        socketRef.current.on("getAnswer", getanswer => {
          peerRef.current && peerRef.current.setRemoteDescription(getanswer);
        })

        socketRef.current.on("getCandidate", getcandidata => {
          peerRef.current && peerRef.current.addIceCandidate(getcandidata);
        })
      }
    }

    !showWebRTC && stopMedia()

    return () => {
      stopMedia()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showWebRTC])

  return {
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
  }
}