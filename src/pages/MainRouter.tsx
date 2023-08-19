import React from "react";
import * as Hooks from "../hooks";
import { Outlet } from "react-router-dom";
import { MainHeader } from "../components";

export const MainRouter: React.FC = () => {
	Hooks.useDecodeDispatch();
	console.log("REACT_APP_SERVER_KEY", process.env.REACT_APP_SERVER_KEY)
	console.log("REACT_APP_KAKAO_REST_API", process.env.REACT_APP_KAKAO_REST_API)
	console.log("REACT_APP_KAKAO_REDIRECT_URL", process.env.REACT_APP_KAKAO_REDIRECT_URL)
	console.log("REACT_APP_GOOGLE_REST_API", process.env.REACT_APP_GOOGLE_REST_API)
	console.log("REACT_APP_GOOGLE_REDIRECT_URL", process.env.REACT_APP_GOOGLE_REDIRECT_URL)
	console.log("REACT_APP_NAVER_REST_API", process.env.REACT_APP_NAVER_REST_API)
	console.log("REACT_APP_NAVER_REDIRECT_URL", process.env.REACT_APP_NAVER_REDIRECT_URL)


	return (
		<>
			<MainHeader />
			<Outlet />
		</>
	);
};
