import { FC } from "react"
import { useRouter, useSocketRoom } from "../../hooks"
import * as SC from "../../components"
import { adminChatArrow, adminPlus, cameraOff, cameraOn, closeBTN, exited, mikeOff, mikeOn, sendBtn, webRTCBtc,  } from "../../assets" // exited, sendBtn, webRTCBtc, cameraOn, cameraOff, mikeOn, mikeOff
import { css, styled } from "styled-components"
import * as Type from "../../types"

export const AdminChatting: FC = () => {
  const { getChatRoom } = useRouter()
  const {
    // 채팅부분
    scrollRef,
    chatListHeight,
    sendMsg,
    getChatMsg,
    userInfoState,
    onChangeTextArea,
    onBlurTextArea,
    onChangeInput,
    onSendMsg,
    onLeaveRoom,
    onEndRoom,
    // // WecRTC 부분
    showWebRTC,
    peerAVideoRef,
    peerBVideoRef,
    mute,
    camera,
    onToggleWebRTC,
    onMute,
    onCamera,

    // 설정박스 부분
    infoShow,
    settingBox,
    onInfoShow,
    onSettingBtn,
    onSocketDate
  } = useSocketRoom()

  // const [infoShow, setInfoShow] = useState<boolean>(false) // 사용자 Info
  // const onInfoShow = () => { 
  //   setInfoShow(pre => !pre)
  // }

  // const [settingBox, setSettingBox] = useState<boolean>(false) // 하단 설정박스 
  // const onSettingBtn = () => {
  //   setSettingBox(pre => !pre)
  // }


  // const onSocketDate = (data:number) => {
  //   return dayjs(data).format("a hh:mm")
  // }

  // useEffect (() => {
  //   setInfoShow(false)
  //   setSettingBox(false)
  //   setShowWebRTC(false)
  // }, [getChatRoom])


  if (!getChatRoom) return <div>채팅방 대기</div>
  else return (
    <SC.GridBox $gtc={infoShow ? "minmax(500px, 1fr) 330px" : "minmax(500px, 1fr)"} $gtr="1fr">
      <ChattingLayout $gtc="1fr" $gtr={showWebRTC ? "200px 1fr 40px" : "1fr 40px"}>
        {showWebRTC && 
          <SC.GridBox $gtc="1fr 2fr" $gtr="1fr" style={{position:"relative"}}>
          <Video ref={peerAVideoRef} autoPlay/>
          {peerBVideoRef.current && peerBVideoRef.current.srcObject 
          ? <Video ref={peerBVideoRef} autoPlay/>
          : <div style={{backgroundColor:"#fff"}} >접속 중...</div>
          }
          <SC.FlexBox style={{position:"absolute", bottom:"10px", left:"10px"}} $gap={10}>
            <WebRTCStateBTN 
              onClick={onMute} 
              children={<img 
                alt="mikeState" src={!mute ? mikeOn : mikeOff} />} />
            <WebRTCStateBTN 
              onClick={onCamera} 
              children={<img 
                alt="cameraState" src={!camera ? cameraOn : cameraOff} />} />
          </SC.FlexBox>
          <WebRTCStateBTN 
              $types="closeBTN"
              style={{position:"absolute", top:"10px", right:"10px"}} 
              onClick={onMute} 
              children={<img 
                alt="closeBTN" src={closeBTN} />} />
          </SC.GridBox>}
        {/* 채팅공간 */}
        <ChattingArea ref={scrollRef} $height={showWebRTC ? `${chatListHeight-200}px` : `${chatListHeight}px`}>
          {getChatMsg.map((chat:any) => 
          chat.username === "date"
          ? <DateLine key={chat.id} style={{margin:"20px 0"}} children={chat.content} />
          : chat.username === "admin"
            ? <SC.FlexBox key={chat.id} $gap={5} $ai="flex-end" $jc="flex-end" style={{ width:"95%"}}>
            <ChattingDate>{onSocketDate(chat.createdAt)}</ChattingDate>
            <ChattingMsg $types="admin">{chat.content}</ChattingMsg>
          </SC.FlexBox>
            : <SC.FlexBox key={chat.id} $gap={5} $ai="flex-end" $jc="flex-start" style={{  width:"95%"}}>
            <ChattingMsg>{chat.content}</ChattingMsg>
            <ChattingDate>{onSocketDate(chat.createdAt)}</ChattingDate>
          </SC.FlexBox>
          )}
        </ChattingArea>

        {/* 채팅 하단 설정박스 */}
        <ChattingBottomBox $gtc="40px 1fr 60px">
          {settingBox && (<ChattingBtnBox>
            <ChattingBtn $bColor="blue" $fd="column" $gap={3} onClick={onToggleWebRTC}>
              <SC.FigureObjectFitImg
                width="35%"
                height="35%"
                src={webRTCBtc}
                alt="webRTCBtc"
              />
              <SC.CustomH3 $size={0.75} $color="white" children="화상채팅" />
            </ChattingBtn>

            <ChattingBtn $bColor="textColorSub" $fd="column" $gap={3} onClick={onLeaveRoom}>
              <SC.FigureObjectFitImg
                width="35%"
                height="35%"
                src={exited}
                alt="exited"
              />
              <SC.CustomH3 $size={0.75} $color="white" children="나가기" />
            </ChattingBtn>

            <ChattingBtn $bColor="red3" $fd="column" $gap={3} onClick={onEndRoom}>
              <SC.FigureObjectFitImg
                width="35%"
                height="35%"
                src={exited}
                alt="exited"
              />
              <SC.CustomH3 $size={0.75} $color="white" children="종료" />
            </ChattingBtn>

          </ChattingBtnBox>)}

          {/* 설정박스들 열기 */}
          <ChattingSettingBtn
            onClick={onSettingBtn} $bColor="textColorSub"
            $width="40px" children={<img src={adminPlus} alt="adminPlus" />} />
          <form onSubmit={onSendMsg}>
            <ChatInput value={sendMsg} onChange={onChangeInput} />
          </form>

          <ChattingBtn onClick={onSendMsg} $bColor="blue" $width="40px" children={<img src={sendBtn} alt="sendBtn" />} />

        </ChattingBottomBox>
        {/* 상담관련 기록공간 Toggle */}
        <InfoShowBTN
          $top={showWebRTC ? 230 : 30}
          children={<SC.FigureObjectFitImg
            width="30px"
            height="50px"
            src={adminChatArrow}
            alt="adminChatArrow"
            onClick={onInfoShow} />} />
      </ChattingLayout>


      {/* 상담관련 기록공간 */}
      {infoShow &&  (
        <UserInfoGrid $gtc="1fr" $gtr="repeat(2, 237px) 1fr" $rgap={10}>
          <UserInfoInner>
            <SC.CustomH1>기본정보</SC.CustomH1>
            <UserInfoInnerBox $gtc="100px 1fr" $rgap={10}>
              <h3>닉네임</h3>
              <div>{userInfoState && userInfoState.userInfo.nickname}</div>
              <h3>이메일</h3>
              <div>exam@exam.com</div>
              <h3>생년월일/성별</h3>
              <div>{userInfoState && userInfoState.userInfo.birthYear}, {userInfoState && userInfoState.userInfo.gender}</div>
              <h3>연락처</h3>
              <div>{userInfoState && userInfoState.userInfo.phoneNumber}</div>
            </UserInfoInnerBox>
          </UserInfoInner>
          <UserInfoInner>
            <SC.CustomH1>신청정보</SC.CustomH1>
            <UserInfoInnerBox $gtc="100px 1fr" $rgap={10}>
              <h3>브랜드</h3>
              <div>브랜드</div>
              <h3>차종</h3>
              <div>모델3/전기</div>
              <h3>옵션</h3>
              <div>색상 W</div>
              <h3>특이사항</h3>
              <div>....</div>
            </UserInfoInnerBox>
          </UserInfoInner>
          <UserInfoInner>
            <SC.CustomH1>메모</SC.CustomH1>
            <TextArea
              value={userInfoState && userInfoState.userInfoMemo}
              onChange={onChangeTextArea}
              onBlur={onBlurTextArea}
              placeholder="메모는 여기에 입력해주세요." />
          </UserInfoInner>
        </UserInfoGrid>
      )}
    </SC.GridBox>
  )
}

const Video = styled.video`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-color: black;
  transform: scaleX(-1);
`

const UserInfoGrid = styled.div<Partial<Type.Styled>>`
  ${SC.Grid} 
  width:100%;
  height: 100%;
`

const UserInfoInner = styled.section<Partial<Type.Styled>>`
  ${SC.Flex}
  flex-direction: column;
  gap: 10px;
  padding: 30px 20px;
  background-color: white;

  h1 {
    width: 100%;
  }
`

const UserInfoInnerBox = styled.div<Partial<Type.Styled>>`
    ${SC.Grid}
    width: 100%;
    height: 100%;
    border-radius: 5px;
    padding: 20px;
    border: 1px solid #DEDEE0;
    background: #F3F3F8;

    div, h3 {
      font-size: 0.875rem;
    }
`
const TextArea = styled.textarea`
  display: block;
  width: 100%;
  height: 100%;
  resize: none;
  font-size: 0.875rem;
  padding: 9px 20px;
  border-radius: 5px;
  border: 1px solid #DEDEE0;
`

const InfoShowBTN = styled.div<Partial<Type.Styled>>`
  position: absolute;
  top: ${({$top}) => `${$top}px`};
  right: 0;
`

const ChattingLayout = styled.div<Partial<Type.Styled>>`
  ${SC.Grid}
  position : relative;
`

const ChattingBottomBox = styled.div<Partial<Type.Styled>>`
  ${SC.Grid}
  position: relative;
`

const ChattingSettingBtn = styled.div<Partial<Type.Styled>>`
  ${SC.Flex}
  ${SC.cursor}
  width: ${({ $width }) => `${$width}px`};
  height: ${({ $width, $height }) => $height ? $height : $width};
  background-color : ${({ $bColor, theme }) => $bColor && theme.color[$bColor]};
`

const ChattingBtnBox = styled.div`
  ${SC.Flex}
  position: absolute;
  height: 50px;
  top: -50px;
`

const ChattingBtn = styled.div<Partial<Type.Styled>>`
  ${SC.Flex}
  ${SC.cursor}
  width: 60px;
  height: 40px;
  background-color : ${({ $bColor, theme }) => $bColor && theme.color[$bColor]};
`


const ChatInput = styled.input`
  display: block;
  padding: 9px 20px;
  width: 100%;
  height: 40px;
  border-top : 1px solid #C7C7CB;
  border-bottom : 1px solid #C7C7CB;
`

const ChattingArea = styled.section<Partial<Type.Styled>>`
  ${SC.Flex}
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  grid-template-columns: 1fr;
  position: relative;
  height: ${({ $height }) => $height};
  overflow: auto;
  padding-bottom: 30px;
  &::-webkit-scrollbar {
     /* Chrome에서 스크롤바 숨기기 */
    /* display: none; */
  }
`

const ChattingMsg = styled.p<Partial<Type.Styled>>`
  ${SC.Flex}
  max-width:77%;
  padding: 6px 20px;
  border-radius: 30px;
  

  ${({$types}) => $types === "admin"
    ? css`
      border: 1px solid #C7C7CB;
      background: #FBFBFD;  
    `
    : css`
      background:  #4C4CFF;
      color: white;
    `
  }
`
const ChattingDate = styled.p`
  color:  #828295;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.154px;
`

const DateLine = styled.div<Partial<Type.Styled>>`
${SC.Flex}
font-size: 0.75rem;
margin: 20px 0;
padding: 5px 15px;
border-radius: 12px;
background: #E4E4F5;
color:#4C4CFF;
`

const WebRTCStateBTN = styled.div<Partial<Type.Styled>>`
  ${SC.Flex}
  ${SC.cursor}
  background-color: #fff;
  width: 30px;
  height: 30px;
  border-radius: 50px;
  &:hover {
    background-color: darkgray;
  }

  ${({$types}) => $types === "closeBTN" && css`
    background-color: rgba(0, 0, 0, 0.50);
    &:hover {
    background-color:rgba(0, 0, 0, 0.30);
  }
  `}
`

/*
   // WebRTC 
   <div style={{ position: "relative" }}>
   {showWebRTC && <div>
     <h1>WebRTC</h1>
     <button onClick={onCamera}>카메라 {!camara ? "끄기" : "켜기"}</button>
     <button onClick={onMute}>음소거 {!mute ? "하기" : "끄기"}</button>
     <Video ref={peerAVideoRef} autoPlay />
     <hr />
     <Video ref={peerBVideoRef} autoPlay />
   </div>}


   //* 채팅내용 기록공간 
   <div style={{ backgroundColor: "yellow" }}>getId : {getChatRoom}</div>
   <div ref={scrollRef} style={{ height: "200px", overflow: "auto" }}>
     {getPreChatMsg.map((chat: any) => <div key={chat.id}>{chat.username} <span style={{ fontSize: "0.3rem" }}>{dayjs(chat.createdDateTime).format("MM월DD일 a hh:mm")}</span> : {chat.content}<hr /></div>)}
   </div>

   //* 화상연결하기 버튼, 나가기, 종료하기
   <GridBox $gtc="40px 40px 40px 1fr 60px">
     <SettingBtn onClick={onToggleWebRTC} $bColor="blue" $width="40px" children={<img src={webRTCBtc} alt="webRTCBtc" />} />
     <SettingBtn onClick={onLeaveRoom} $bColor="chartRed" $width="40px" children={<img src={exited} alt="exited" />} />
     <SettingBtn onClick={onEndRoom} $bColor="darkGray" $width="40px" children={<img src={exited} alt="exited" />} />
     <form onSubmit={onSendMsg}>
       <ChatInput value={sendMsg} onChange={onChangeInput} />
     </form>
     <SettingBtn onClick={onSendMsg} $bColor="blue" $width="40px" children={<img src={sendBtn} alt="sendBtn" />} />
   </GridBox>

   //* 하단 버튼 
   <div style={{ position: "absolute", top: "30px", right: "0" }}><FigureObjectFitImg width="30px" height="50px" src={adminChatArrow} alt="adminChatArrow" onClick={onInfoShow} /></div>
 </div>
 {infoShow && (
   <UserInfoGrid $gtc="1fr" $gtr="repeat(2, 237px) 1fr" $rgap={10}>
     <UserInfoInner>
       <CustomH1>기본정보</CustomH1>
       <UserInfoInnerBox $gtc="100px 1fr" $rgap={10}>
         <h3>닉네임</h3>
         <div>김영광</div>
         <h3>이메일</h3>
         <div>exam@exam.com</div>
         <h3>생년월일/성별</h3>
         <div>1990</div>
         <h3>연락처</h3>
         <div>010-1111-1111</div>
       </UserInfoInnerBox>
     </UserInfoInner>
     <UserInfoInner>
       <CustomH1>신청정보</CustomH1>
       <UserInfoInnerBox $gtc="100px 1fr" $rgap={10}>
         <h3>브랜드</h3>
         <div>브랜드</div>
         <h3>차종</h3>
         <div>모델3/전기</div>
         <h3>옵션</h3>
         <div>색상 W</div>
         <h3>특이사항</h3>
         <div>....</div>
       </UserInfoInnerBox>
     </UserInfoInner>
     <UserInfoInner>
       <CustomH1>메모</CustomH1>
       <TextArea
         value={userInfoMemo}
         onChange={onChangeTextArea}
         onBlur={onBlurTextArea}
         placeholder="메모는 여기에 입력해주세요."></TextArea>
     </UserInfoInner>
   </UserInfoGrid>
 )}
*/