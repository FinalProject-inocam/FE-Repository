import { FC } from 'react'
import * as SC from '../../components'
import { Outlet } from 'react-router-dom'

export const CivilComplaintManagement: FC = () => {

  return (
    <SC.DeshboardGrid
      $gtc="376px 1fr"
      $gtr="1fr"
      style={{ width: "100%", height: "100%" }}>

      {/* 좌측 채팅방 리스트 */}
      <SC.ChattingRoomState />

      {/* 우측 채팅방 중첩라우터 */}
      <Outlet />

    </SC.DeshboardGrid>
  )
}

