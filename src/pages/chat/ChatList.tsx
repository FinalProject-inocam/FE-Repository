import { FC, useEffect } from 'react'
import { useRouter } from '../../hooks'
import { selectDecode, setDecodeToken, useAppDispatch, useAppSelector } from '../../redux'

export const ChatList:FC =() => {
  const {onNavigate} = useRouter()
  const dispatch = useAppDispatch()

  const {nickname} = useAppSelector(selectDecode)

  const refreshToken =
  document.cookie &&
  document.cookie
    .split(';')
    .filter((cookies) => cookies.includes('refreshToken'))[0]
    ?.split('=')[1];

  useEffect(()=>{
    dispatch(setDecodeToken(refreshToken))
  }, [dispatch, refreshToken])

  return (
    <div>
      <h1>채팅 테스트</h1>
      <div>
        <h2>관리자와의 통신</h2>
        <button onClick={onNavigate(`admin!${nickname}`)}>관리자통신</button>
      </div>
      <div>
        <h2>유저검색</h2>
        <button onClick={onNavigate(`user1!${nickname}`)}>user1</button>
        <button onClick={onNavigate(`user2!${nickname}`)}>user2</button>
      </div>

    </div>
  )
}
