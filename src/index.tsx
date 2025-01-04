import ReactDOM from 'react-dom/client';
import App from './App/App';
import * as Sentry from "@sentry/react";
try {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DNS,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
} catch (err) {
  console.log(err)
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);
