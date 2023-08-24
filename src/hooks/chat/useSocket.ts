import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { Socket, io } from "socket.io-client"
import { useRouter } from "../useRouter"

export const useSocket = () => {
  const { onNavigate } = useRouter();
  const { id } = useParams();

  /*
    채팅관련 부분 ------------------------------------------------------------------------  //
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
    WecRTC 관련 상태관련부분 ------------------------------------------------------------------------  //
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
    WecRTC 관련 상태관련부분 ------------------------------------------------------------------------  //
      01 showWebRTC : WebRTC 화면을 제어하는 상태
      02 mute : 카메라 음향조절 상태
      03 camara : 카메라 영상조절 상태
      04 audioList : 카메라 마이크조절 상태 
      05 peerAVideoRef : PeerA Video 태그
      06 peerBVideoRef : PeerB Video 태그
      07 peerRef : RTCPeerConnection 상태
      08 streamRef : getUserMedia 사용자로부터 받아온 영상정보 상태 
  */

  const [showWebRTC, setShowWebRTC] = useState<boolean>(false)
  const [mute, setMute] = useState<boolean>(false)
  const [camara, setCamara] = useState<boolean>(false)
  const [audioList, setAudioList] = useState<any>([])
  const peerAVideoRef = useRef<HTMLVideoElement>(null);
  const peerBVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<RTCPeerConnection>();
  const streamRef = useRef<MediaStream | null>(null)

  /*
    WecRTC 설정관련 함수 ------------------------------------------------------------------------  //
      01 onToggleWebRTC : WebRTC 화면을 onOff 하는 함수, 상태01 showWebRTC
      02 onMute : 카메라의 음향 onOff 하는 함수, 상태02 mute
      03 onCamera : 카메라의 영상 onOff 하는 함수, 상태03 camara
      04 getAudio : 카메라의 카메라 마이크 재원변경 구하는 함수, 상태04 audioList
      05 onChangeAudio : 카메라 마이크 재원변경 함수, 구현 준비 중... 
      06 getMedia : getUserMedia을 통해 영상 정보 취득, RTCPeerConnection getTracks에 취득정보 등록 
      07 stopMedia : 상태01 showWebRTC 변경 또는 언마운트 시, WebRTC 종료하는 함수 
      08 makeConnection : 상태07 peerRef : RTCPeerConnection을 실행하는 함수 
      09 Signaling (1) createOffer
        - PeerA와 PeerB의 접속을 확인하고, PeerA에서 초대장을 만들어, PeerB에게 emit 하는 함수 
        - PeerA에 대한 정보(누구인지, 어디에있는지 등)
        - Signaling의 시작
      10 Signaling (2) createAnswer
        - PeerA의 초대장을 받은, PeerB가 응답서신에 해당되는 패킷을 PeerA에게 emit 하는 함수 
        - PeerB에 대한 정보(누구인지, 어디에있는지 등)
      11 makeConnection 추가 : peerRef.current.onicecandidate 
  */

  const onToggleWebRTC = () => {
    setShowWebRTC(pre => !pre)
  }

  const onMute = () => {
    streamRef.current && streamRef.current.getAudioTracks().forEach(track => track.enabled = !track.enabled)
    setMute(pre => !pre)
    console.log(streamRef.current)
    console.log(streamRef.current?.getAudioTracks())
  }
  const onCamera = () => {
    streamRef.current && streamRef.current.getVideoTracks().forEach(track => track.enabled = !track.enabled)
    setCamara(pre => !pre)
    console.log(streamRef.current)
    console.log(streamRef.current?.getVideoTracks())
  }


  const getAudio = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const audios = devices.filter(device => device.kind === "audioinput");
      setAudioList(audios)
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeAudio = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
  }

  const getMedia = async () => {
    try {
      streamRef.current = await navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
      peerAVideoRef.current
        && (peerAVideoRef.current.srcObject = streamRef.current)

      await getAudio()
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
    console.log("makeConnection", streamRef.current?.getTracks())

    if (peerRef.current) {
      console.log(peerRef.current.iceConnectionState)
      peerRef.current.onicecandidate = (e: any) => {
        console.log("ICE 후보자: 등록하자... ", e, e.candidate);
        socketRef.current && socketRef.current.emit("candidate", {candidate:e.candidate, room});
      };

      peerRef.current.ontrack = (e) => {
        console.log("상대 영상정보", e.streams)
        console.log("나의 영상정보", streamRef.current)
        peerBVideoRef.current && (peerBVideoRef.current.srcObject = e.streams[0]) // 여기가 의문점
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
    console.log("createOffer", offer);
    peerRef.current && peerRef.current.setLocalDescription(offer);
    socketRef.current && socketRef.current.emit("offer", { offer, room });
  };

  const createAnswer = async (getoffer: RTCSessionDescription) => {
    if (peerRef.current) {
      console.log("createAnswer", getoffer)
      await peerRef.current.setRemoteDescription(getoffer);
      const answer = await peerRef.current.createAnswer();
      console.log(answer)
      peerRef.current.setLocalDescription(answer);
      socketRef.current && socketRef.current.emit("answer", { answer, room });
    }
  };

  /* 
    useEffect 01 : Chatting 관련 useEffect 부분 ----------------------------------------------------------------------
      01 소켓연결하기 : socketRef.current = io
      02 룸연견하기 : emit("joinRoom")
      03 이전 대화내용 불러오기 : on("previousMsg")
      04 상대메시지 확인하기 : on("readMsg")
      05 상대의 채팅방 종료메시지 : on("peerOut")
  */

  useEffect(() => {
    socketRef.current = io(`${process.env.REACT_APP_SERVER_API}`, {
      reconnectionAttempts :2,
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
    useEffect 02 : WebRTC 관련 useEffect 부분 ----------------------------------------------------------------------
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

        socketRef.current.on("joinedRTC", async (data) => {
          console.log("Signaling - (1), 먼저 온 PeerA B의 입장소식을 듣고, offer(초대장 보냄)", data)
          streamRef.current && createOffer()  
        })

        socketRef.current.on("getOffer", getoffer => {
          console.log("Signaling - (2), offer(초대장)을 받은 PeerB가 Answer(응답소식)를 보냄", getoffer)
          createAnswer(getoffer)
        })

        socketRef.current.on("getAnswer", getanswer => {
          console.log("Signaling - (3), Answer(응답소식)를 PeerA가 받음", getanswer)
          peerRef.current && peerRef.current.setRemoteDescription(getanswer);
        })

        socketRef.current.on("getCandidate", getcandidata => {
          console.log("Signaling - (4), Candidate(응답소식)를 PeerA-PeerB가 서로 주고받음", getcandidata)
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
    getAudio,
    audioList,
    onChangeAudio
  }
}

/*
먼저 PeerA는
  1 브라우저에서 미디어 스트림을 받습니다.(getUserMedia)
  2 stream을 등록합니다(addStream x,  addTrack)
  3 createOffer 후에 local sdp를 설정합니다. (createOffer => setLocalDescription)
  4 PeerB에 offer을 전달합니다. (send offer)

PeerB에서는 offer을 받으면
  1 PeerA에게서 받은 offer(sdp)로 remote sdp를 설정한다. (setRemoteDescription)
  2 브라우저 미디어 스트림을 받습니다. (getUserMedia)
  3 createAnswer후 local sdp 설정합니다. (createAnswer => setLocalDescription)
  4 PeerA에게 answer을 보냅니다. (send answer)
  5 PeerA에서는 answer를 전달받고 remote sdp를 설정합니다. (setRemoteDescription)

create-answer 과정이 끝나면 icecandidate로 네트워크 정보를 교환합니다.
  1 요청자에서 candidate를 보냅니다. (send candidate)
  2 연결할 peer에서 받은 정보를 저장하고 자신의 candidate를 보내고 (send candidate)
  3 받는 쪽에서 해당 candidate를 저장합니다. (addICECandidate)
    ---- 여기가 미묘한데... 상대방의 영상정보가 오면 끝...
  4 이렇게 해서 두 피어간의 연결이 완료되게 됩니다.

ICE 후보를 등록하고 소켓 통신을 보내려면, 수집상태가 "complete"에 도달해야 한다. 그때 onicecandidate 가 동작한다.
  1 "new"란 ICE 수집 프로세스가 시작되지 않았음을 나타낸다. 즉 후보자가 없다는 것을 의미한다.
  2 "gathering"은 ICE가 진행 중이라는 덧을 뜻한다.
  3 "complete"는 ICE 수집이 완료되었으며, 가능한 모든 ICE 후보가 검색되었음을 나타낸다. 이 상태에서 onicecandidate를 설정하면 된다.
    - console.log("ICE 수집 상태:", peerRef.current?.iceGatheringState); // complete 가 되어야 한다.
    - addIceCandidate(candidate) 후보자 등록이 되어야 해당 정보가 complete 가 될 되겠어...


https://6258-211-38-109-128.ngrok-free.app
1. connectionState: "failed" 부분을 확인하기 위해서 스트림 정보가 peerConnection에 제대로 등록처리 되는지 확인해주세요.
2. iceServers 설정이 제대로 되어있는지 다시 한번 확인해주세요
3. 로컬pc 방화벽에 대한 설정도 검토해주세요
4. 로직상으론 소켓연결 및 peer 생성, 스트림정보 등록, sdp 공유, 소켓 통신을 통한 candidate 등의 로직은 존재하는것 같습니다.
5. 추가적으로 궁금한 점은 peerA가 방장일텐데, B가 연결이 정상적으로 된거면 connection failed가 나오는게 이상하다고 생각이 듭니다. 현재 상황이 연결자체가 안되는건가요? 아니면 방장의 미디어 스트림이 연결되지 않은건가요?

*/

// import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
// import { useParams } from "react-router-dom"
// import { Socket, io } from "socket.io-client"
// import { useRouter } from "../useRouter"

// export const useSocket = () => {
//   const { onNavigate } = useRouter()
//   const { id } = useParams()
//   const room = id
//   const username = id?.split('!')[1]

//   // 채팅관련 부분 ------------------------------------------------------------------------  //
//   const socketRef = useRef<Socket>();

//   const [sendMsg, setSendMsg] = useState<string>("")
//   const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
//     setSendMsg(e.target.value)
//   }

//   const onSendMsg = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     socketRef.current && socketRef.current.emit("sendMsg", {
//       content: sendMsg,
//       room,
//       username
//     })
//     setSendMsg("")
//   }

//   const onLeaveRoom = () => {
//     socketRef.current && socketRef.current.emit("leaveRoom", {
//       room,
//       username
//     })
//     onNavigate({ url: '/chat' })()
//   }

//   // 02 WecRTC 부분 ------------------------------------------------------------------------  //
//   const [showWebRTC, setShowWebRTC] = useState<boolean>(false) // WebRTC 실행 관련 상태 
//   const peerAVideoRef = useRef<HTMLVideoElement>(null); // 자신의 비디오 // useEffect 01 // 
//   const peerBVideoRef = useRef<HTMLVideoElement>(null); // 다른사람의 비디오
//   const peerRef = useRef<RTCPeerConnection>(); // peerConnection // useEffect 02 // 


//   const [mute, setMute] = useState<boolean>(false)
//   const [camara, setCamara] = useState<boolean>(false)


//   // 02-01 화상 OnOff Toggle Switch
//   const onToggleWebRTC = () => {
//     setShowWebRTC(pre => !pre)
//   }


//   // 02-02 Fn : getMedia - 02-05 stopMedia
//   let stream: MediaStream | null = null
//   const getMedia = async () => {

//     try {
//       // 02-02-01 자신의 스트림정보 가져오기      
//       stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       peerAVideoRef.current && (peerAVideoRef.current.srcObject = stream)

//       // 02-02-02 스트림정보를 peerConnection에 등록
//       stream.getTracks().forEach((track) => { stream && peerRef.current && peerRef.current.addTrack(track, stream) });

//       // 02-02-03 등록된 peerConnection정보에 대해서 iceCandidate 이벤트 발생시키기 
//       console.log("ICE 수집 상태:", peerRef.current?.iceGatheringState) // complete x , new o
//       peerRef.current && (peerRef.current.onicecandidate = (e: any) => {
//         console.log("ICE 후보자: 등록하자... ", e.candidate);
//         e.candidate && socketRef.current && socketRef.current.emit("candidate", e.candidate, room);
//       });

//       // 02-02-04 RTCPeerConnection 객체에서 상대 피어로부터 비디오가 수신되면 트리거 되며, 미디어를 재생
//       peerRef.current && (peerRef.current.ontrack = (e) => {
//         peerBVideoRef.current && (peerBVideoRef.current.srcObject = e.streams[0]);
//       });

//     } catch (e) {
//       console.error(e);
//     }
//   }

//   // 02-02-01 Fn : 카메라 제어하기 
//   const onMute = () => {
//     stream && stream.getAudioTracks().forEach(track => track.enabled = !track.enabled)
//     setMute(pre => !pre)
//     console.log(stream?.getAudioTracks())
//   }
//   const onCamera = () => {
//     stream && stream.getVideoTracks().forEach(track => track.enabled = !track.enabled)
//     setCamara(pre => !pre)
//     console.log(stream?.getVideoTracks())
//   }

//   // 02-03 Fn : createOffer
//   const createOffer = async () => {
//     console.log("create Offer");
//     if (!(peerRef.current && socketRef.current)) {
//       return;
//     }
//     try {
//       // offer 생성
//       const sdp = await peerRef.current.createOffer();
//       // 자신의 sdp로 LocalDescription 설정
//       peerRef.current.setLocalDescription(sdp);
//       console.log("sent the offer : ", sdp);
//       // offer 전달
//       socketRef.current.emit("offer", sdp);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   // 02-04 Fn : createAnswer
//   const createAnswer = async (sdp: RTCSessionDescription) => {
//     console.log("createAnswer");
//     if (!(peerRef.current && socketRef.current)) {
//       return;
//     }

//     try {
//       // PeerA가 전달해준 offer를 RemoteDescription에 등록해 줍시다.
//       peerRef.current.setRemoteDescription(sdp);

//       // answer생성해주고
//       const answerSdp = await peerRef.current.createAnswer();

//       // answer를 LocalDescription에 등록해 줍니다. (PeerB 기준)
//       peerRef.current.setLocalDescription(answerSdp);
//       console.log("sent the answer", answerSdp);
//       socketRef.current.emit("answer", answerSdp);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   // 02-05 Fn : stopMedia - 02-02 : getMedia
//   const stopMedia = () => {
//     if (stream) {
//       stream.getTracks().forEach(track => track.stop());
//       stream = null;
//     }
//   }

//   // 채팅부분 useEffect 부분 ------------------------------------------------------------------------  //
//   /* useEffect 01 */
//   useEffect(() => {
//     // 01 소켓연결하기 
//     socketRef.current = io(`${process.env.REACT_APP_SOCKET_API}`)
//     if (socketRef.current) {
//       // 01-01 룸연견하기  
//       socketRef.current.emit("joinRoom", {
//         username, room
//       })
//       // 01-02 이전의 대화내용 불러오기
//       socketRef.current.on("previousMsg", data => {
//         console.log(data)
//       })
//       // 01-03 상대가 보낸 메시지 확인하기 
//       socketRef.current.on("readMsg", data => {
//         console.log(data)
//       })
//       // 01-04 상대가 채팅방을 떠났을 때, 관련 정보 받기 
//       socketRef.current.on("peerOut", data => {
//         console.log(data)
//       })
//     }

//   }, [username, room])


//   /* useEffect 02 */
//   useEffect(() => {
//     // showWebRTC 상태에 따른 조건부 실행 
//     if (showWebRTC) {
//       // 02-01 RTCPeerConnection 선언하기 
//       peerRef.current = new RTCPeerConnection({
//         iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
//       });

//       // 02-02 createOffer : PeerA 정보 보내기 
//       createOffer();

//       if (socketRef.current) {
//         // 02-03 getOffer : PeerA 정보가 확인되면, createAnswer 실행하기 
//         socketRef.current.on("getOffer", (sdp: RTCSessionDescription) => {
//           console.log("recv Offer");
//           createAnswer(sdp);
//           peerRef.current && console.log("setLocalDescription", sdp)
//         });

//         // 02-04 getAnswer : PeerB 정보를 확인하면, RTCSessionDescription 등록하고 
//         socketRef.current.on("getAnswer", (sdp: RTCSessionDescription) => {
//           console.log("recv Answer");
//           peerRef.current && peerRef.current.setRemoteDescription(sdp);
//           peerRef.current && console.log("setRemoteDescription", sdp)
//         });

//         // 02-05 getCandidate : 후보자를 등록하기  
//         socketRef.current.on("getCandidate", async (candidate: RTCIceCandidate) => {
//           peerRef.current && await peerRef.current.addIceCandidate(candidate);
//         });
//       }
//       // 02-06 getMedia : 후보자가 등록되었기에, 영상정보 송출하기 
//       getMedia()
//     }

//     return () => {
//       // 02-07 stopMedia 영상정보 종료하기 
//       stopMedia()
//       peerRef.current && peerRef.current.close();
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [showWebRTC])


//   // 반환문 ------------------------------------------------------------------------  //
//   return {
//     // 채팅부분
//     sendMsg, onChangeInput, onSendMsg, onLeaveRoom,
//     // WecRTC 부분
//     showWebRTC,
//     peerAVideoRef,
//     peerBVideoRef,
//     onToggleWebRTC,
//     onMute,
//     mute,
//     onCamera,
//     camara
//   }
// }