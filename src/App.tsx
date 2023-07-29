import React from 'react'
import * as Page from './pages'
import { Route, Routes } from 'react-router-dom'



const App: React.FC = () => {
  return (
    <Routes>

      <Route path='/' element={<Page.MainRouter />}>
        <Route index element={<Page.Home />} />
        <Route path='inocar' element={<Page.InoCar />} />
        <Route path='community' element={<Page.Community />} />
        <Route path='communityDetail' element={<Page.CommunityDetail />} />
        <Route path='decoration' element={<Page.Decoration />} />
        <Route path='decorationDetail' element={<Page.DecorationDetail />} />

        <Route element={<Page.ProtectiveRouter />}>
          <Route path='inocarorder' element={<Page.InoCarOrder />} />
          <Route path='communityWrite' element={<Page.CommunityWrite />} />
          <Route path='decorationWrite' element={<Page.DecorationWrite />} />
        </Route>
      </Route>


      <Route element={<Page.AuthRouter />}>
        <Route path='auth' element={<Page.Signup />} />
        <Route path='auth/admin' element={<Page.AdminSignup />} />
        <Route path='login' element={<Page.Login />} />
        <Route path='kakao/auth' element={<Page.KakaoRedirect />} />
      </Route>

      <Route path='/mypage' element={<Page.MyPageRouter />}>
        <Route index element={<Page.MyPage />} />
      </Route>
      <Route element={<Page.ProtectiveRouter />}>
        <Route path='/admin' element={<Page.AdminRouter />}>
          <Route index element={<Page.AdminMain />} />
        </Route>
      </Route>



    </Routes>
  )
}

export default App

/*
  당연한 이야기이지만, catch 내부에서 사용되는 에러는 typescript에서 unknown으로 취급하기 때문에
  다입을 지정해서 사용할 수 없다. 타입단언을 사용할 수 있지만, 좋은 방법은 아니다. 
  인수를 any를 사용하거나, as 할 수 있지만, 이 둘은 지양하는 것이 좋다. 
  as를 붙인다는 것은 사람이 직접 붙인다는 뜻인데, 사람의 작업에느 에러가 발생하기 마련이다. 
  정석은 타입 가드로 에러를 처리하는 것이다. :: https://inpa.tistory.com/entry/TS-📘-타입스크립트-커스텀-Error-처리하기
  instanceof :: 타입가드 
*/
