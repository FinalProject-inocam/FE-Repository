import React from "react";
import * as Hooks from "../hooks";
import { Outlet } from "react-router-dom";
import { MainHeader } from "../-";

export const MainRouter: React.FC = () => {
	Hooks.useDecodeDispatch();

	return (
		<>
			<MainHeader />
			<Outlet />
		</>
	);
};
