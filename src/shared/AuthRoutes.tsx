import React from 'react'
import { Route, Routes } from 'react-router-dom'
import * as Page from '../pages'

export const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 헤더에 따른 중첩라우터 :: AuthRouter */}
      <Route element={<Page.AuthRouter />}>
        <Route path="signup" element={<Page.Signup />} />
        <Route path="signup/admin" element={<Page.AdminSignup />} />
        <Route path="login" element={<Page.Login />} />
        <Route path="kakao/auth" element={<Page.KakaoRedirect />} />
        <Route path="login/oauth2/code/google" element={<Page.GoogleRedirect />} /> {/* /login/sns?code= */}
      </Route>
    </Routes>
  )
}