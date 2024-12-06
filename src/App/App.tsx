import 'scss/app.scss'
import Router from './Router'
import { Router as BrowserRouter } from 'react-router-dom'
import history from './History';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { NotifierProvider } from './Notifier';
// import { ErrorBoundary } from '@sentry/react';
import Loader from './Loader';
import { Provider } from 'react-redux';
import store from './Store';

function App() {
  return (
    <Provider store={store}>
      <NotifierProvider>
        <BrowserRouter history={history}>
          {/* <ErrorBoundary fallback={<p>An error occurred</p>}> */}
            <Loader />
            <Router />
          {/* </ErrorBoundary> */}
        </BrowserRouter>
      </NotifierProvider>
    </Provider>
  );
}

export default App;
