import React from 'react'
import { Route, Routes } from 'react-router-dom'
import * as Page from '../pages'

export const ProtectiveRouters: React.FC = () => {
  return (
    <Routes>
      {/* 헤더에 따른 중첩라우터 :: 프로텍티드 라우터(ProtectiveRouter, Token.sub === E001 ) :: AdminRouter */}
      <Route element={<Page.ProtectiveRouter />}>
        <Route path='mypage' element={<Page.MyPage />} />
        <Route path='/admin' element={<Page.AdminRouter />}>
          <Route index element={<Page.AdminMain />} />
        </Route>
      </Route>
    </Routes>
  )
}