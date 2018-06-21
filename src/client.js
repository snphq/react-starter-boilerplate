import React from 'react';
import { render, hydrate, unmountComponentAtNode } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';

import appRoutes from './routes';
import getIntialState from '_store/getInitialState';
import rootSaga from '_sagas';
import configureStore from '_store';

// Get initial state from server-side rendering
const initialState = getIntialState();

const history = createHistory();
const store = configureStore(history, initialState);

// Start saga middleware
store.runSaga(rootSaga);

const renderDom = __DEV__ ? render : hydrate;
const mountNode = document.getElementById('react-view');

const renderApp = (routes) => {
  renderDom(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {renderRoutes(routes)}
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    mountNode,
  );
};

if (module.hot) {
  // Enable webpack hot module replacement for routes
  module.hot.accept('./routes', () => {
    try {
      const nextRoutes = require('./routes').default;
      unmountComponentAtNode(mountNode);
      renderApp(nextRoutes);
    } catch (error) {
      console.error(`==> 😭  Routes hot reloading error ${error}`);
    }
  });
}

renderApp(appRoutes);
