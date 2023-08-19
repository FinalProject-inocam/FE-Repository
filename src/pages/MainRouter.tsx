import React from "react";
import * as Hooks from "../hooks";
import { Outlet } from "react-router-dom";
import { MainHeader } from "../components";

export const MainRouter: React.FC = () => {
	Hooks.useDecodeDispatch();
	console.log(process.env.REACT_APP_SERVER_KEY)

	return (
		<>
			<MainHeader />
			<Outlet />
		</>
	);
};
