import { FC, useState } from "react"
import { useRouter, useSocketRoom } from "../../hooks"
import * as SC from "../../components"
import * as ASS from "../../assets" // exited, sendBtn, webRTCBtc, cameraOn, cameraOff, mikeOn, mikeOff


export const AdminChatting: FC = () => {
  const { state } = useRouter()
  const [purchaseList, setPurchaseList] = useState<number>(0)
  const {
    // 채팅부분
    scrollRef,
    chatListHeight,
    sendMsg,
    getChatMsg,
    userInfoState,
    userInfoMemo,
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
    peerStream,
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

  const onBeforePurchase = () => {
    purchaseList > 0 && setPurchaseList(purchaseList-1)
  }

  const onNextPurchase = () => {
    userInfoState.userPurchaseList.length-1 > purchaseList && setPurchaseList(purchaseList+1)
  }


  if (!state) return <SC.FlexBox children={<img width="50%" style={{opacity:"0.3"}} src={ASS.innoLogo} alt="innoLogo" />} />
  else return (
    <SC.GridBox $gtc={infoShow ? "minmax(500px, 1fr) 330px" : "minmax(500px, 1fr)"} $gtr="1fr">
      <SC.ChattingLayout $gtc="1fr" $gtr={showWebRTC ? "300px 1fr 40px" : "1fr 40px"}>
        {showWebRTC &&
          <SC.GridBox $gtc="1fr 2fr" $gtr="1fr" style={{ position: "relative" }}>
            <SC.Video ref={peerAVideoRef} autoPlay />
            <div style={{ position: "relative", overflow: "hidden" }}>
              {!peerStream && <SC.LoadingImg src={ASS.loadingInnoLogo} alt="chattingLoading" />}
              <SC.Video ref={peerBVideoRef} autoPlay />
            </div>


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
            <SC.WebRTCStateBTN
              $types="closeBTN"
              style={{ position: "absolute", top: "10px", right: "10px" }}
              onClick={onToggleWebRTC}
              children={<img
                alt="closeBTN" src={ASS.closeBTN} />} />
          </SC.GridBox>}
        {/* 채팅공간 */}
        <SC.ChattingArea ref={scrollRef} $height={showWebRTC ? `${chatListHeight - 300}px` : `${chatListHeight}px`}>
          {getChatMsg.map((chat: any) =>
            chat.username === "date"
              ? <SC.DateLine key={chat.id} style={{ margin: "20px 0" }} children={chat.content} />
              : chat.username === "E001"
                ? <SC.FlexBox key={chat.id} $gap={5} $ai="flex-end" $jc="flex-end" style={{ width: "95%" }}>
                  <SC.ChattingDate>{onSocketDate(chat.createdAt, "a hh:mm")}</SC.ChattingDate>
                  <SC.ChattingMsg $types="admin">{chat.content}</SC.ChattingMsg>
                </SC.FlexBox>
                : <SC.FlexBox key={chat.id} $gap={5} $ai="flex-end" $jc="flex-start" style={{ width: "95%" }}>
                  <SC.ChattingMsg>{chat.content}</SC.ChattingMsg>
                  <SC.ChattingDate>{onSocketDate(chat.createdAt, "a hh:mm")}</SC.ChattingDate>
                </SC.FlexBox>
          )}
        </SC.ChattingArea>

        {/* 채팅 하단 설정박스 */}
        <SC.ChattingBottomBox $gtc="40px 1fr 60px">
          {settingBox && (<SC.ChattingBtnBox>
            <SC.ChattingBtn $bColor="blue" $fd="column" $gap={3} onClick={onToggleWebRTC}>
              <SC.FigureObjectFitImg
                width="35%"
                height="35%"
                src={ASS.webRTCBtc}
                alt="webRTCBtc"
              />
              <SC.CustomH3 $size={0.75} $color="white" children="화상채팅" />
            </SC.ChattingBtn>

            <SC.ChattingBtn $bColor="textColorSub" $fd="column" $gap={3} onClick={onLeaveRoom}>
              <SC.FigureObjectFitImg
                width="35%"
                height="35%"
                src={ASS.exited}
                alt="exited"
              />
              <SC.CustomH3 $size={0.75} $color="white" children="나가기" />
            </SC.ChattingBtn>

            <SC.ChattingBtn $bColor="red3" $fd="column" $gap={3} onClick={onEndRoom}>
              <SC.FigureObjectFitImg
                width="35%"
                height="35%"
                src={ASS.exited}
                alt="exited"
              />
              <SC.CustomH3 $size={0.75} $color="white" children="종료" />
            </SC.ChattingBtn>

          </SC.ChattingBtnBox>)}

          {/* 설정박스들 열기 */}
          <SC.ChattingSettingBtn
            onClick={onSettingBtn} $bColor="textColorSub"
            $width="40px" children={<img src={ASS.adminPlus} alt="adminPlus" />} />
          <form onSubmit={onSendMsg}>
            <SC.ChatInput value={sendMsg} onChange={onChangeInput} />
          </form>

          <SC.ChattingBtn onClick={onSendMsg} $bColor="blue" $width="40px" children={<img src={ASS.sendBtn} alt="sendBtn" />} />

        </SC.ChattingBottomBox>
        {/* 상담관련 기록공간 Toggle */}
        <SC.InfoShowBTN
          $top={showWebRTC ? 330 : 30}
          children={<SC.FigureObjectFitImg
            width="30px"
            height="50px"
            src={ASS.adminChatArrow}
            alt="adminChatArrow"
            onClick={onInfoShow} />} />
      </SC.ChattingLayout>


      {/* 상담관련 기록공간 */}
        <SC.UserInfoGrid $gtc="1fr" $gtr="repeat(2, 237px) 1fr" $rgap={5}>
          <SC.UserInfoInner>
            <SC.CustomH1>기본정보</SC.CustomH1>
            <SC.UserInfoInnerBox $gtc="90px 1fr" $rgap={10}>
              <h3>닉네임</h3>
              <div>{infoShow && !!userInfoState.userInfo && userInfoState.userInfo.nickname}</div>
              <h3>이메일</h3>
              <div>{infoShow && !!userInfoState.userInfo && userInfoState.userInfo.email}</div>
              <h3>생년월일/성별</h3>
              <div>{infoShow && !!userInfoState.userInfo && userInfoState.userInfo.birthYear}, {infoShow && !!userInfoState.userInfo && userInfoState.userInfo.gender}</div>
              <h3>연락처</h3>
              <div>{infoShow && !!userInfoState.userInfo && userInfoState.userInfo.phoneNumber}</div>
            </SC.UserInfoInnerBox>
          </SC.UserInfoInner>
          <SC.UserInfoInner>
            <SC.CustomH1>신청정보 <span style={{fontSize:"0.75rem"}}>{`총 ${!!userInfoState.userPurchaseList ? userInfoState.userPurchaseList.length : 0}건`}</span></SC.CustomH1>
            <SC.UserInfoInnerBox $gtc="100px 1fr" $rgap={10}>
              <SC.FlexBox style={{position:"absolute", top:"30px", right:"30px", height:"25px"}} $gap={5}>
              {infoShow && !!userInfoState.userPurchaseList && userInfoState.userPurchaseList.length > 0 && purchaseList > 0 && <img src={ASS.purchaseBefore} alt="purchaseBefore" style={{display:"block", width:"30px", height:"30px", cursor:"pointer"}} onClick={onBeforePurchase} />}
              {infoShow && !!userInfoState.userPurchaseList && userInfoState.userPurchaseList.length-1  > purchaseList && <img src={ASS.purchaseNext}  alt="purchaseNext" style={{display:"block", width:"30px", height:"30px", cursor:"pointer"}} onClick={onNextPurchase} />}
              </SC.FlexBox>
              {infoShow && !!userInfoState.userPurchaseList && userInfoState.userPurchaseList.length > 0 && (<>
                <h3>모델(주문번호)</h3>
                <div>{infoShow && !!userInfoState.userPurchaseList && `${userInfoState.userPurchaseList[purchaseList].type}${userInfoState.userPurchaseList[purchaseList].trim}(주문번호 : ${userInfoState.userPurchaseList[purchaseList].purchaseId})`}</div>
                <h3>색상</h3>
                <div>{infoShow && !!userInfoState.userPurchaseList && userInfoState.userPurchaseList[purchaseList].color}</div>
                <h3>예정출고일</h3>
                <div>{infoShow && !!userInfoState.userPurchaseList && userInfoState.userPurchaseList[purchaseList].deliveryDate !== "" 
                  ? infoShow && !!userInfoState.userPurchaseList && onSocketDate(userInfoState.userPurchaseList[purchaseList].deliveryDate, "YYYY-MM-DD, dddd") 
                  : "미정"}</div>
                <h3>요청사항</h3>
                <div>{userInfoState.userPurchaseList[purchaseList].content}</div>
              </>)}
            </SC.UserInfoInnerBox>
          </SC.UserInfoInner>
          <SC.UserInfoInner>
            <SC.CustomH1>메모</SC.CustomH1>
            <SC.ChatTextArea
              value={userInfoMemo}
              onChange={onChangeTextArea}
              onBlur={onBlurTextArea}
              placeholder="메모는 여기에 입력해주세요." />
          </SC.UserInfoInner>
        </SC.UserInfoGrid>
    </SC.GridBox>
  )
}