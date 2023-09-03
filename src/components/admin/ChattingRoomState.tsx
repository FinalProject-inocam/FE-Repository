import { FC } from 'react'
import * as SC from '..'
import * as Hook from '../../hooks'

export const ChattingRoomState: FC = () => {
  const { roomList, socektErr, chatListHeight } = Hook.useChatRoomList()

  
  return (
    <SC.CivilComplaintLists $gtc='1fr' $gtr='150px 1fr' $rgap={20}>
    <SC.FlexBox $fd='column' $gap={20} style={{ backgroundColor: "white", padding: "30px 20px" }}>
      <SC.CustomH1 style={{ width: "100%" }} children="✉️ 채팅상담" />
      <SC.GridBox $gtc='repeat(4, 1fr)' $cgap={10}>
        <SC.FlexBox $fd='column' $gap={5}>
          <SC.ChatNumber $bColor='blue'>{!socektErr && roomList.totalCount ? roomList.totalCount : 0}</SC.ChatNumber>
          전체
        </SC.FlexBox>
        <SC.FlexBox $fd='column' $gap={5}>
          <SC.ChatNumber children={!socektErr && roomList.wait ? roomList.wait.length : 0} />
          대기
        </SC.FlexBox>
        <SC.FlexBox $fd='column' $gap={5}>
          <SC.ChatNumber children={!socektErr && roomList.progress ? roomList.progress.length : 0} />
          진행
        </SC.FlexBox>
        <SC.FlexBox $fd='column' $gap={5}>
          <SC.ChatNumber children={!socektErr && roomList.done ? roomList.done.length : 0} />
          종료
        </SC.FlexBox>
      </SC.GridBox>
    </SC.FlexBox>
    <SC.ChatRoomOutLine $fd='column' $jc='flex-start' $gap={10} $height={`${chatListHeight}px`}>

      {!socektErr && (<>
        {!!roomList.wait && roomList.wait.map(({ lastMessage, peer, room }: any) => (
          <SC.ChatRoomLayout key={peer} msg={lastMessage} peer={peer} room={room} type="wait" />))}
        {
          !!roomList.progress
          && roomList.progress.map(({ lastMessage, peer, room }: any) => (
            <SC.ChatRoomLayout key={peer} msg={lastMessage} peer={peer} room={room} type="progress" />))
        }
        {
          !!roomList.done
          && roomList.done.map(({ lastMessage, peer, room }: any) => (
            <SC.ChatRoomLayout key={peer} msg={lastMessage} peer={peer} room={room} type="done" bColor="lightgray1" color="textColorSub" />))
        }
      </>)}

    </SC.ChatRoomOutLine>
  </SC.CivilComplaintLists>
  )
}