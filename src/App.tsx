import * as Page from "./pages";
import { GlobalStyled } from "./components";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const App: React.FC = () => {
	return (
		<>
			<GlobalStyled />
			<Routes>
				{/* 헤더에 따른 중첩라우터 :: MainRouter */}
				<Route path='/' element={<Page.MainRouter />}>
					<Route index element={<Page.Home />} />
					<Route path='innocar' element={ <Suspense fallback={<div>Loading...</div>}> <Page.LazyInnoCar /> </Suspense>}/>
					<Route path='community' element={<Suspense fallback={<div>Loading...</div>}><Page.LazyCommunity /></Suspense>} />
					<Route path='communityDetail/:id' element={<Page.CommunityDetail />} />
					<Route path='decoration' element={<Page.Decoration />} />
					<Route path='decorationDetail/:id' element={<Page.DecorationDetail />} />
					<Route path='mypage' element={<Page.MyPage />} />

					{/* 프로텍티드 라우터(ProtectiveRouter, Token 이 존재하면 ) */}
					<Route element={<Page.ProtectiveRouter />}>
						<Route path='innocarorder' element={<Page.InnoCarOrder />} />
						<Route path='communityWrite' element={<Page.CommunityWrite />} />
						<Route path='decorationWrite' element={<Page.DecorationWrite />} />
					</Route>
				</Route>

				{/* 헤더에 따른 중첩라우터 :: AuthRouter */}
				<Route element={<Page.AuthRouter />}>
					<Route path="signup" element={<Page.Signup />} />
					<Route path="signup/admin" element={<Page.AdminSignup />} />
					<Route path="login" element={<Page.Login />} />
					<Route path="kakao/auth" element={<Page.KakaoRedirect />} />
					<Route path="login/oauth2/code/google" element={<Page.GoogleRedirect />} /> {/* /login/sns?code= */}
				</Route>

				{/* 헤더에 따른 중첩라우터 :: 프로텍티드 라우터(ProtectiveRouter, Token.sub === E001 ) :: AdminRouter */}
				<Route element={<Page.ProtectiveRouter />}>
					<Route path='/admin' element={<Page.AdminRouter />}>
						<Route index element={<Page.AdminMain />} />
					</Route>
				</Route>

				{/* 채팅을 위한 임시 라우터 :: Chat */}
				<Route path="/chat" element={<Page.Chat />} />
				<Route path="/webrtc" element={<Page.WebRTC />} />
				<Route path="/threejs" element={<Suspense fallback={<div>Loading...</div>}><Page.LazyThreejs /></Suspense>} />
			</Routes>
		</>
	);
};

export default App;