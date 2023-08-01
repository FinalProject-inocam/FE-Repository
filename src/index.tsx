import App from './App';
import { Error } from './pages';
import { store } from './redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from 'styled-components';
import { theme } from './components';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mock/browser');
  worker.start();
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary FallbackComponent={Error}>
          <App />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>

);

reportWebVitals();
