import { FC } from 'react'
import { useSocketList } from '../../hooks'


export const ChatList: FC = () => {
  const { nickname, roomList, socektErr,onNavigate } = useSocketList()

  return (
    <div>
      <h1>채팅 테스트</h1>
      {!socektErr
        ? <div>소켓에러</div>
        : (
          <>
            <div>
              <h2>관리자와의 통신</h2>
              <button onClick={onNavigate({ url: `admin!${nickname}` })}>관리자통신</button>
            </div>
            <div>
              <h2>유저검색</h2>
              {roomList.map(({room, peer}:any) => <button key={room} onClick={onNavigate({ url: `${room}` })}>{peer}</button>)}
            </div>
          </>
        )}
    </div>
  )
}
