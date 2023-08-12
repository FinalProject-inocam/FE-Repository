import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import * as Page from '../pages'

export const ChatRoutes:React.FC = () => {
  return (
    <Routes>
    {/* 채팅을 위한 임시 라우터 :: Chat */}
    <Route path="/chat" element={<Page.Chat />} />
    <Route path="/webrtc" element={<Page.WebRTC />} />
    <Route path="/threejs" element={<Suspense fallback={<div>Loading...</div>}><Page.LazyThreejs /></Suspense>} />
</Routes>
  )
}