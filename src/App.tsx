import { GlobalStyled } from "./components";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as Page from "./pages";
import { ChatList } from "./pages/chat/ChatList";
import { ChatRoom } from "./pages/chat/ChatRoom";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<GlobalStyled />
			<Routes>
				{/* 헤더에 따른 중첩라우터 :: MainRouter */}
				<Route path='/' element={<Page.MainRouter />}>
					<Route index element={<Page.Home />} />
					<Route path='innocar' element={<Suspense fallback={<div>Loading...</div>}><Page.LazyInnoCar /></Suspense>} />
					<Route path='community' element={<Suspense fallback={<div>Loading...</div>}><Page.LazyCommunity /></Suspense>} />
					<Route path='community/:id' element={<Page.CommunityDetail />} />
					<Route path='wrapping' element={<Suspense fallback={<div>Loading...</div>}><Page.LazyWrapping /></Suspense>} />
					<Route path='wrapping/:id' element={<Page.WrappingDetail />} />
				</Route>

				{/* 헤더에 따른 중첩라우터 :: AuthRouter */}
				<Route element={<Page.AuthRouter />}>
					<Route path="signup" element={<Page.Signup />} />
					<Route path="signup/admin" element={<Page.AdminSignup />} />
					<Route path="login" element={<Page.Login />} />
				</Route>

				{/* 헤더에 따른 중첩라우터 :: 프로텍티드 라우터(ProtectiveRouter, Token.sub === E001 ) */}
				<Route element={<Page.ProtectiveRouter />}>
					<Route path='innocar/order' element={<Page.InnoCarOrder />} />
					<Route path='community/write' element={<Page.CommunityWrite />} />
					<Route path='wrapping/write' element={<Page.DecorationWrite />} />
					<Route path='/mypage' element={<Page.MyPage />} />
				</Route>

				<Route element={<Page.ProtectiveRouterA />}>
					<Route path='/admin' element={<Page.AdminRouter />}>
							<Route index element={<Page.AdminMain />} />
					</Route>
				</Route>

				{/* Redirect 페이지 */}
				<Route path="/api/auth/login/kakao" element={<Page.KakaoRedirect />} />
				<Route path="/api/auth/login/google" element={<Page.GoogleRedirect />} />
				<Route path="/api/auth/login/naver" element={<Page.NaverRedirect />} />

				{/* 채팅 및 임시 라우터 :: Chat */}
				<Route path="/chatlist" element={<Page.Chat />} />
				<Route path="/chat" element={<ChatList />} />
				<Route path="/chat/:id" element={<ChatRoom />} />
				<Route path="/webrtc" element={<Page.WebRTC />} />
				<Route path="/threejs" element={<Suspense fallback={<div>Loading...</div>}><Page.LazyThreejs /></Suspense>} />

				{/* 소셜로그인을 위한 Redirect 경로 */}
				<Route path="/api/auth/login/kakao" element={<Page.KakaoRedirect />} />
				<Route path="/api/auth/login/google" element={<Page.GoogleRedirect />} />
				<Route path="/api/auth/login/naver" element={<Page.NaverRedirect />} />

			</Routes>
		</BrowserRouter>
	);
};

export default App;