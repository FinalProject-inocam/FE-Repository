import { ChangeEvent, FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import * as RTK from "../../redux";
import { Socket, io } from "socket.io-client";
import dayjs from "dayjs";

export const useMychat = ():any => {
  const socketRef = useRef<Socket>();
	const { nickname } = RTK.useAppSelector(RTK.selectDecode)
	const [openChat, setOpenChat] = useState<boolean>(false)
	const scrollRef = useRef<HTMLDivElement | null>(null);
	const room = nickname && `E001!${nickname}`
	const [sendMsg, setSendMsg] = useState<string>("")
	const dispatch = RTK.useAppDispatch()
	const getChatMsg = RTK.useAppSelector(RTK.selectchatMsg)


  const [settingBox, setSettingBox] = useState<boolean>(false) // 하단 설정박스 
	const onSettingBtn = () => {
    setSettingBox(pre => !pre)
  }

	const scrollToBottom = () => {
    scrollRef.current && (scrollRef.current.scrollTop = scrollRef.current.scrollHeight)
  };

	const onOpenChatToggle = () => {
		setOpenChat(pre => !pre)
    setShowWebRTC(false)
	}

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSendMsg(e.target.value)
  }

	const onSendMsg = (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLDivElement>) => {
		e.preventDefault()
		if (sendMsg) {
      const newChat = [{
        content: sendMsg,
        createdDateTime: Date.now(),
        id: Date.now(),
        room,
        username: nickname
      }]
      dispatch(RTK.setChatMsg([...newChat]))
      socketRef.current && socketRef.current.emit("sendMsg", {
        content: sendMsg,
        room,
        username: nickname
      })
      setSendMsg("")
    }
	}

	const onSocketDate = (data: number, format: string) => {
    return dayjs(data).format(format)
  }
	
	useEffect(()=>{
		socketRef.current = io(`${process.env.REACT_APP_SERVER_API}`, {
      reconnectionAttempts: 5,
      reconnectionDelay: 500
    })

		if (openChat && socketRef.current && nickname) {
      socketRef.current.emit("joinRoom", {
        username: nickname, room
      })}

			socketRef.current.on("previousMsg", (data) => {
				dispatch(RTK.setChatMsg(data))
      })

			socketRef.current.on("readMsg", (data) => {
        dispatch(RTK.setChatMsg([data]))
      })

			!openChat && socketRef.current.disconnect()

	},[nickname, openChat, dispatch, room])

	useEffect(() => {
    scrollToBottom();
  }, [getChatMsg]);


  // WebRTC 관련 
  const [showWebRTC, setShowWebRTC] = useState<boolean>(false)
  const peerAVideoRef = useRef<HTMLVideoElement>(null);
  const peerBVideoRef = useRef<HTMLVideoElement>(null);
  const [peerStream, getPeerStream] = useState<boolean>(false)
  const peerRef = useRef<RTCPeerConnection>();
  const streamRef = useRef<MediaStream | null>(null)
  const [mute, setMute] = useState<boolean>(false)
  const [camera, setCamara] = useState<boolean>(false)

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

  const makeConnection = async () => {
    peerRef.current = await new RTCPeerConnection();

    if (peerRef.current) {
      peerRef.current.onicecandidate = (e: any) => {
        socketRef.current && socketRef.current.emit("candidate", { candidate: e.candidate, room });
      };

      peerRef.current.ontrack = (e) => {
        getPeerStream(true)
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

  const stopMedia = () => {
    if (streamRef.current) {
      getPeerStream(false)
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }

  const onToggleWebRTC = () => {
    setShowWebRTC(pre => !pre)
    
    setMute(false)
    setCamara(false)
    setSettingBox(false)
    getPeerStream(false)
  }

  const onLeaveRoom = () => {
    dispatch(RTK.deleteChatMsg())
    setOpenChat(pre => !pre)
    setShowWebRTC(false)
    setSettingBox(false)
    setMute(false)
    setCamara(false)
    socketRef.current && socketRef.current.disconnect()
  }

  const onEndRoom = () => {
    socketRef.current && socketRef.current.emit("leaveRoom", {
      room,
      username: nickname
    })
    dispatch(RTK.deleteChatMsg())
    setOpenChat(pre => !pre)
    setShowWebRTC(false)
    setSettingBox(false)
    setMute(false)
    setCamara(false)
    socketRef.current && socketRef.current.disconnect()
  }

  useEffect(() => {
    if (showWebRTC) {
      getMedia()
      makeConnection()

      if (socketRef.current) {
        socketRef.current.emit("joinRTC", { room, username: nickname })

        socketRef.current.on("joinedRTC", async () => {
          setTimeout(() => {
            streamRef.current && createOffer()
          }, 4000)
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
    // 채팅관련
    nickname,
    openChat,
    scrollRef,
    sendMsg,
    getChatMsg,
    settingBox,
    onOpenChatToggle,
    onChangeInput,
    onSendMsg,
    onSocketDate,
    onSettingBtn,

    //WebRTC 관련 
     // WecRTC 부분
    showWebRTC,
    peerAVideoRef,
    peerBVideoRef,
    peerStream,

    mute,
    camera,

    onMute,
    onCamera,

    onToggleWebRTC,
    onLeaveRoom,
    onEndRoom
  }
}