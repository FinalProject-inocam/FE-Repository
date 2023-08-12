import App from "./App";
// 설정관련
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { ErrorBoundary } from "react-error-boundary";
// Provider 관련 
import { store } from "./redux";
import { theme } from "./components";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
// 컴포넌트 관련
import { Error } from "./pages";

// if (process.env.NODE_ENV === "development") {
//   const { worker } = require("./mock/browser");
//   worker.start();
// }

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<ErrorBoundary FallbackComponent={Error}>
					<App />
				</ErrorBoundary>
			</ThemeProvider>
		</Provider>
);

reportWebVitals();
