import React from 'react';
import { render, hydrate, unmountComponentAtNode } from 'react-dom';
// import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';

import routes from './routes';
import { rootSaga } from 'models';
import configureStore from './store';

import './components/App';

/* Get initial state from server side rendering */
const initialState = window.__INITIAL_STATE__;

const history = createBrowserHistory();
const store = configureStore(history, initialState);

/* Start saga middleware */
store.runSaga(rootSaga);

const renderDom = process.env.APP_ENV === 'development' ? render : hydrate;
const mountNode = document.getElementById('react-view');

const renderApp = () => {
  unmountComponentAtNode(mountNode);
  const App = require('./components/App').default;

  renderDom(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App routes={routes} />
      </ConnectedRouter>
    </Provider>,
    mountNode
  );
};

if (module.hot) {
  module.hot.accept();
}

renderApp();
