import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderToNodeStream, renderToString } from 'react-dom/server';

import routes from '../routes';
import App from '../components/App';

const renderRoot = (store, route) => (
  <Provider store={store}>
    <StaticRouter location={route}>
      <App routes={routes} />
    </StaticRouter>
  </Provider>
);

export const toStream = (store, route) =>
  renderToNodeStream(renderRoot(store, route));

export const toString = (store, route) =>
  renderToString(renderRoot(store, route));
