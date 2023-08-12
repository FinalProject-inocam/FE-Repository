import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import * as Page from '../pages'

export const MainRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 헤더에 따른 중첩라우터 :: MainRouter */}
      <Route path='/' element={<Page.MainRouter />}>
        <Route index element={<Page.Home />} />
        <Route path='innocar' element={<Suspense fallback={<div>Loading...</div>}><Page.LazyInnoCar /></Suspense>} />
        <Route path='community' element={<Suspense fallback={<div>Loading...</div>}><Page.LazyCommunity /></Suspense>}/>
        <Route path='community/:id' element={<Page.CommunityDetail />} />
        <Route path='wrapping' element={<Suspense fallback={<div>Loading...</div>}><Page.LazyWrapping /></Suspense>}/>
        <Route path='wrapping/:id' element={<Page.WrappingDetail />} />

        {/* 프로텍티드 라우터(ProtectiveRouter, Token 이 존재하면 ) */}
        <Route element={<Page.ProtectiveRouter />}>
          <Route path='innocarorder' element={<Page.InnoCarOrder />} />
          <Route path='communityWrite' element={<Page.CommunityWrite />} />
          <Route path='wrappingWrite' element={<Page.DecorationWrite />} />
        </Route>
      </Route>
    </Routes>
  )
}
