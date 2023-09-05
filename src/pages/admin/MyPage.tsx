import React from "react";
import * as RTK from "../../redux";
import * as Type from "../../types";
import * as COMP from "../../components/myPage";
import { useRouter } from "../../hooks";
import { styled } from "styled-components";
import { mychat } from "../../assets/mypage";
import { ChatInput, ChattingBottomBox, ChattingBtn, ChattingDate, ChattingMsg, ChattingSettingBtn, DateLine, Flex, FlexBox, Grid } from "../../components";
import { adminPlus, sendBtn } from "../../assets";
import { useMychat } from "../../hooks/chat/useMychat";
;

export const MyPage: React.FC = () => {
	// 회원정보 조회
	const { isLoading: UserIsLoading, isError: UserIsError, data: UserData } = RTK.useGetMyPageQuery({});
	if (UserIsLoading) <div> 로딩중 </div>;
	else if (UserIsError) <div> 에러 </div>;
	else {
		// console.log(UserData);
	}

	// 신청한 차 정보 조회
	const { isLoading, data } = RTK.useGetPurchasesQuery({});

	// 신청한 차 신청 취소
	// const [onDeletePurchases] = RTK.useDeletePurchasesMutation({});
	// const onClickDeletePurchases = (purchaseId: number) => () => {
	// 	onDeletePurchases(purchaseId);
	// };

	const { onNavigate } = useRouter();


	const {
    // 채팅관련
    nickname,
    openChat,
    scrollRef,
    sendMsg,
    getChatMsg,
    onOpenChatToggle,
    onChangeInput,
    onSendMsg,
    onSocketDate,

    //WebRTC 관련 
		showWebRTC,
		peerAVideoRef,
    peerBVideoRef,

  } = useMychat()

	console.log("nickname", nickname, "showWebRTC", showWebRTC)
	console.log("getChatMsg", getChatMsg, "data", data)

	if (isLoading) return <div>Loadgin....g...</div>;

	// console.log(UserData);
	return (
		<div>
			<h2>MyPage</h2>
			<button onClick={onNavigate({ url: "/chat" })}>채팅으로 이동하기</button>
			<div>
				<COMP.EditUser
					profileImg={UserData.profileImg}
					nickname={UserData.nickname}
					phoneNumber={UserData.phoneNumber}
				/>
				{/* {data &&
					data.map(({ purchaseId, type, color, alarm, content, addressName, zoneNo }: Type.CarOrderRes) => (
						<div key={purchaseId}>
							<COMP.EditPurchase
								purchaseId={purchaseId}
								type={type}
								color={color}
								alarm={alarm}
								content={content}
								addressName={addressName}
								zoneNo={zoneNo}
							/>
							<button onClick={onClickDeletePurchases(purchaseId)}>취소하기</button>
						</div>
					))} */}
			</div>




		{/* 채팅관련 */}
		<MyChatRoom>
			<img src={mychat} alt="MyChatRoom" onClick={onOpenChatToggle}/>
			{openChat && (
				<ChatLayout $gtc={"1fr"}>
					
					<ChatInner $gtc="1fr" $gtr="1fr 40px" >
						<ChatContent ref={scrollRef}>

						{getChatMsg.map((chat: any) =>
            chat.username === "date"
              ? <DateLine key={chat.id} style={{ margin: "20px 0" }} children={chat.content} />
              : chat.username === nickname
                ? <FlexBox key={chat.id} $gap={5} $ai="flex-end" $jc="flex-end" style={{ width: "95%" }}>
                  <ChattingDate>{onSocketDate(chat.createdAt, "a hh:mm")}</ChattingDate>
                  <ChattingMsg $types="admin">{chat.content}</ChattingMsg>
                </FlexBox>
                : <FlexBox key={chat.id} $gap={5} $ai="flex-end" $jc="flex-start" style={{ width: "95%" }}>
                  <ChattingMsg>{chat.content}</ChattingMsg>
                  <ChattingDate>{onSocketDate(chat.createdAt, "a hh:mm")}</ChattingDate>
                </FlexBox>
          )}

						</ChatContent>
						<ChattingBottomBox $gtc="40px 1fr 60px">

						<ChattingSettingBtn
            $bColor="textColorSub"
            $width="40px" children={<img src={adminPlus} alt="adminPlus" />} />
          <form onSubmit={onSendMsg}>
            <ChatInput value={sendMsg} onChange={onChangeInput}/>
          </form>
          <ChattingBtn $bColor="blue" $width="40px" children={<img src={sendBtn} alt="sendBtn" />} />
						</ChattingBottomBox>
					</ChatInner>

				</ChatLayout>
			)}
		</MyChatRoom>

		{openChat && <ChatInner>
							<Video ref={peerAVideoRef} autoPlay style={{backgroundColor:"black"}} />
							<Video ref={peerBVideoRef} autoPlay style={{backgroundColor:"black"}} />
							<div style={{ position: "relative", overflow: "hidden" }}>
            </div>
						</ChatInner>}

		</div>
	);
};

const MyChatRoom = styled.div`
	position: fixed;
	bottom: 10px;
	right: 10px;
`

const ChatLayout = styled.div<Partial<Type.Styled>>`
	${Grid}
	position: absolute;
	bottom: 60px;
	right: 30px;
	height: 410px;
`

const ChatInner = styled.div<Partial<Type.Styled>>`
	${Grid}
	width:400px;
	height: 100%;
`

const ChatContent = styled.div<Partial<Type.Styled>>`
	padding: 20px;
	${Flex}
	width: 100%;
	gap: 10px;
	max-height: 370px;
	overflow: auto;
  flex-direction: column;
  justify-content: flex-start;
	background: linear-gradient(180deg, #E8E8FB 0%, #F3F3F8 27.08%);
	&::-webkit-scrollbar {
    display: none;
    /* Chrome에서 스크롤바 숨기기 */
  }
`

const Video = styled.video`
  width: 100%;
  height: 300px;
  object-fit: cover;
  transform: scaleX(-1);
`