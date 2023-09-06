import { FC } from "react"
import * as Type from "../../types"
import * as Hook from "../../hooks"
import * as ASS from "../../assets"
import * as SC from "../css"
import { deleteChatMsg, useAppDispatch } from "../../redux"

export const ChatRoomLayout: FC<Type.ChatRoomLayoutProps> = ({ msg, type, peer, room, bColor, color }) => {
  const { onNavigate} = Hook.useRouter()
  const dispatch = useAppDispatch()
  const onEnterRoom = () => {
    dispatch(deleteChatMsg())
    onNavigate({url:"room",  opts: { state: room }})()
  }

  return (
    <SC.ChatRoomList $fd='column' $gap={10} $bColor={bColor} onClick={onEnterRoom}>
      <div style={{ width: "100%" }}>
        {type === 'wait'
          ? (<SC.FlexBox $jc='flex-start' $gap={5} style={{ marginBottom: "5px" }}>
            <img src={ASS.NewChat} alt='NewChat' />
            <SC.CustomH1 $size={0.875} children="차량관련 문의드립니다." />
          </SC.FlexBox>)
          : <SC.CustomH1 $color={color} $size={0.875} children="차량관련 문의드립니다." style={{ marginBottom: "5px" }} />
        }
        <SC.CustomH3 $color={color} $size={0.875} style={{ color: "#555" }} children={msg} />
      </div>
      <SC.FlexBox $jc='flex-start' $gap={5} style={{ width: "100%" }}>
        <img src={ASS.user} alt='NewChat' />
        <SC.CustomH3 $color={color} $size={0.875} style={{ color: "#555" }} children={peer} />
      </SC.FlexBox>
    </SC.ChatRoomList>
  )
}