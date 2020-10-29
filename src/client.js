import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
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

const mountNode = document.getElementById('react-view');

const renderApp = () => {
  unmountComponentAtNode(mountNode);
  const App = require('./components/App').default;

  render(
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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/offline.sw.js').then(
      () => {
        console.info('Offline service worker successfully installed');
      },
      error => {
        console.error('ServiceWorker registration failed: ', error);
      }
    );
  });
}

renderApp();
