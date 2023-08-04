import * as Page from './pages';
import { GlobalStyled } from './components';
import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';


const InoCar = lazy(() =>import('./pages/main/InoCar').then(({ InoCar }) => ({ default: InoCar })));
const Community = lazy(() =>import('./pages/main/Community').then(({ Community }) => ({ default: Community })));

const App: React.FC = () => {  

  return (
    <>
    <GlobalStyled />
    <Routes>
      {/* 헤더에 따른 중첩라우터 :: MainRouter */}
      <Route path="/" element={<Page.MainRouter />}>
        <Route index element={<Page.Home />} />
        <Route path="inocar" element={<Suspense fallback={<div>Loading...</div>}><InoCar /></Suspense>} />
        <Route path="community" element={<Community />} />
        <Route path="communityDetail/:id" element={<Page.CommunityDetail />} />
        <Route path="decoration" element={<Page.Decoration />} />
        <Route path="decorationDetail" element={<Page.DecorationDetail />} />
        <Route path='mypage' element={<Page.MyPage />} />

        {/* 프로텍티드 라우터(ProtectiveRouter, Token 이 존재하면 ) */}
        <Route element={<Page.ProtectiveRouter />}>
          <Route path="inocarorder" element={<Page.InoCarOrder />} />
          <Route path="communityWrite" element={<Page.CommunityWrite />} />
          <Route path="decorationWrite" element={<Page.DecorationWrite />} />
        </Route>
      </Route>

      {/* 헤더에 따른 중첩라우터 :: AuthRouter */}
      <Route element={<Page.AuthRouter />}>
        <Route path="signup" element={<Page.Signup />} />
        <Route path="signu˚p/admin" element={<Page.AdminSignup />} />
        <Route path="login" element={<Page.Login />} />
        <Route path="kakao/auto" element={<Page.KakaoRedirect />} />
      </Route>

      {/* 헤더에 따른 중첩라우터 :: 프로텍티드 라우터(ProtectiveRouter, Token.sub === E001 ) :: AdminRouter */}
      <Route element={<Page.ProtectiveRouter />}>
        <Route path="/admin" element={<Page.AdminRouter />}>
          <Route index element={<Page.AdminMain />} />
        </Route>
      </Route>

      {/* 채팅을 위한 임시 라우터 :: Chat */}
      <Route path='/chat' element={<Page.Chat />} />
      <Route path='/webrtc' element={<Page.WebRTC />} />
    </Routes>
    </>
  );
};

export default App;