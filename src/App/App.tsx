import 'scss/app.scss'
import Router from './Router'
import { Router as BrowserRouter } from 'react-router-dom'
import history from './History';
import { Provider } from 'react-redux';
import store from './Store';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { NotifierProvider } from './Notifier';
import Loader from './Loader';

function App() {

  return (
    <Provider store={store}>
      <NotifierProvider>
        <BrowserRouter history={history}>
          <Loader />
          <Router />
        </BrowserRouter>
      </NotifierProvider>
    </Provider>
  );
}

export default App;
