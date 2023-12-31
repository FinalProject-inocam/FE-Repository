import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as Page from "./pages";
import { AdminChatting } from "./pages/admin/AdminChatting";
import { GlobalStyled } from "./components";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<GlobalStyled />
			<Routes>
				{/* 헤더에 따른 중첩라우터 :: MainRouter */}
				<Route path='/' element={<Page.MainRouter />}>
					<Route index element={<Page.Home />} />
					<Route
						path='innocar'
						element={<Suspense fallback={<div>Loading...</div>} children={<Page.LazyInnoCar />} />}
					/>
					<Route
						path='community'
						element={<Suspense fallback={<div>Loading...</div>} children={<Page.LazyCommunity />} />}>
						<Route path=':id' element={<Page.GetCommunity />} />
						<Route element={<Page.ProtectiveRouter />}>
							<Route path='write' element={<Page.CommunityWrite />} />
						</Route>
						<Route path='review/:id' element={<Page.CommunityDetail />} />
					</Route>
					<Route
						path='wrapping'
						element={<Suspense fallback={<div>Loading...</div>} children={<Page.LazyWrapping />} />}
					/>
					<Route path='wrapping/:id' element={<Page.WrappingDetail />} />

					{/* 헤더에 따른 중첩라우터 :: 프로텍티드 라우터(ProtectiveRouter, Token.sub === E001 ) */}
					<Route element={<Page.ProtectiveRouter />}>
						<Route path='innocar/order' element={<Page.InnoCarOrder />} />
						<Route path='community/write' element={<Page.CommunityWrite />} />
						<Route path='wrapping/write' element={<Page.DecorationWrite />} />
						<Route path='/mypage' element={<Page.MyPage />} />
					</Route>

					{/* Auth 관련부분 */}
					<Route path='signup' element={<Page.Signup />} />
					<Route path='signup/admin' element={<Page.Signup />} />
					<Route path='login' element={<Page.Login />} />
				</Route>

				<Route element={<Page.ProtectiveRouterA />}>
					<Route
						path='/admin'
						element={<Suspense fallback={<div>Loading...</div>} children={<Page.LazyAdmin />} />}>
						<Route index element={<Page.AdminDeshboard />} />
						<Route path='deliverymanagement' element={<Page.DeliveryManagement />} />
						<Route path='civilcomplaintmanagement' element={<Page.CivilComplaintManagement />}>
							<Route index element={<AdminChatting />} />
							<Route path='room' element={<AdminChatting />} />
						</Route>
					</Route>
				</Route>

				{/* Redirect 페이지 */}
				<Route path='/api/auth/login/kakao' element={<Page.KakaoRedirect />} />
				<Route path='/api/auth/login/google' element={<Page.GoogleRedirect />} />
				<Route path='/api/auth/login/naver' element={<Page.NaverRedirect />} />

				{/* 소셜로그인을 위한 Redirect 경로 */}
				<Route path='/api/auth/login/kakao' element={<Page.KakaoRedirect />} />
				<Route path='/api/auth/login/google' element={<Page.GoogleRedirect />} />
				<Route path='/api/auth/login/naver' element={<Page.NaverRedirect />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;

//
