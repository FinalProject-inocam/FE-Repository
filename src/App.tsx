import { GlobalStyled } from "./components";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import * as Shared from "./shared";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<GlobalStyled />
			<Shared.MainRoutes />
			<Shared.AuthRoutes />
			<Shared.ProtectiveRouters />
			<Shared.ChatRoutes />
		</BrowserRouter>
	);
};

export default App;