import { FC } from "react";
import * as SC from "../css";
import * as ASS from "../../assets";
import { useMychat } from "../../hooks";
import { FigureObjectFitImg } from "../atom";

export const MyChatRoomArea:FC = () => {

  const {
    // 채팅관련
    nickname,
    openChat,
    scrollRef,
		settingBox,
    sendMsg,
    getChatMsg,
    onOpenChatToggle,
    onChangeInput,
    onSendMsg,
    onSocketDate,
		onSettingBtn,

    //WebRTC 관련 
		showWebRTC,
		peerAVideoRef,
		peerStream,
    peerBVideoRef,
		onToggleWebRTC,
		onLeaveRoom,
		onEndRoom,
    mute,
    camera,
    onMute,
    onCamera,
  } = useMychat()


  return (
    <SC.MyChatRoom>
			<img src={ASS.mychat} alt="MyChatRoom" onClick={onOpenChatToggle}/>
			{openChat && (
				<SC.MyChatLayout $gtc={showWebRTC ? "320px 1fr" : "1fr"}>
					{showWebRTC && 
					<SC.MyChatVideoInner $fd="column">
							<div style={{ position: "relative", overflow: "hidden" }}>
              {!peerStream && <SC.MyChatLoadingImg src={ASS.loadingInnoLogo} alt="chattingLoading" />}
              <SC.MyChatVideo ref={peerBVideoRef} autoPlay $types="peerB" />
            </div>
						<SC.MyChatVideo ref={peerAVideoRef} autoPlay style={{backgroundColor:"black"}} />
						<SC.FlexBox style={{ position: "absolute", bottom: "10px", left: "10px" }} $gap={10}>
              <SC.WebRTCStateBTN
                onClick={onMute}
                children={<img
                  alt="mikeState" src={!mute ? ASS.mikeOn : ASS.mikeOff} />} />
              <SC.WebRTCStateBTN
                onClick={onCamera}
                children={<img
                  alt="cameraState" src={!camera ? ASS.cameraOn : ASS.cameraOff} />} />
            </SC.FlexBox>

						</SC.MyChatVideoInner>
					}
					<SC.MyChatInner $gtc="1fr" $gtr="1fr 40px" >

						<SC.MyChatContent ref={scrollRef}>

						{getChatMsg.map((chat: any) =>
            chat.username === "date"
              ? <SC.DateLine key={chat.id} style={{ margin: "20px 0" }} children={chat.content} />
              : chat.username === nickname
                ? <SC.FlexBox key={chat.id} $gap={5} $ai="flex-end" $jc="flex-end" style={{ width: "95%" }}>
                  <SC.ChattingDate>{onSocketDate(chat.createdAt, "a hh:mm")}</SC.ChattingDate>
                  <SC.ChattingMsg $types="admin">{chat.content}</SC.ChattingMsg>
                </SC.FlexBox>
                : <SC.FlexBox key={chat.id} $gap={5} $ai="flex-end" $jc="flex-start" style={{ width: "95%" }}>
                  <SC.ChattingMsg>{chat.content}</SC.ChattingMsg>
                  <SC.ChattingDate>{onSocketDate(chat.createdAt, "a hh:mm")}</SC.ChattingDate>
                </SC.FlexBox>
          )}

						</SC.MyChatContent>
						<SC.ChattingBottomBox $gtc="40px 1fr 60px">
						{settingBox && (<SC.ChattingBtnBox>
            <SC.ChattingBtn $bColor="blue" $fd="column" $gap={3} onClick={onToggleWebRTC}>
              <FigureObjectFitImg
                width="35%"
                height="35%"
                src={ASS.webRTCBtc}
                alt="webRTCBtc"
              />
              <SC.CustomH3 $size={0.75} $color="white" children="화상채팅" />
            </SC.ChattingBtn>

            <SC.ChattingBtn $bColor="textColorSub" $fd="column" $gap={3} onClick={onLeaveRoom}>
              <FigureObjectFitImg
                width="35%"
                height="35%"
                src={ASS.exited}
                alt="exited"
              />
              <SC.CustomH3 $size={0.75} $color="white" children="나가기" />
            </SC.ChattingBtn>

            <SC.ChattingBtn $bColor="red3" $fd="column" $gap={3} onClick={onEndRoom}>
              <FigureObjectFitImg
                width="35%"
                height="35%"
                src={ASS.exited}
                alt="exited"
              />
              <SC.CustomH3 $size={0.75} $color="white" children="종료" />
            </SC.ChattingBtn>

          </SC.ChattingBtnBox>)}

						<SC.ChattingSettingBtn
						onClick={onSettingBtn}
            $bColor="textColorSub"
            $width="40px" children={<img src={ASS.adminPlus} alt="adminPlus" />} />
          <form onSubmit={onSendMsg}>
            <SC.ChatInput value={sendMsg} onChange={onChangeInput}/>
          </form>
          <SC.ChattingBtn onClick={onSendMsg} $bColor="blue" $types="sendBtn" children={<img src={ASS.sendBtn} alt="sendBtn" />} />
						</SC.ChattingBottomBox>
					</SC.MyChatInner>

				</SC.MyChatLayout>
			)}
		</SC.MyChatRoom>
  )
}