import React from 'react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import memoryCache from 'memory-cache';
import { matchRoutes } from 'react-router-config';
import { createMemoryHistory } from 'history';

import _isNil from 'lodash/isNil';
import _isEmpty from 'lodash/isEmpty';
import _omit from 'lodash/omit';

import App from '../components/App';
import routes from '../routes';
import renderHtml from '../utils/renderHtml';
import configureStore from '../store';
import loadBranchData from './loadBranchData';

/* eslint-disable import/extensions */
import assets from '../../public/webpack-assets';
/* eslint-disable import/extensions */

export default async route => {
  const cache = memoryCache.get(route);

  if (_isNil(cache)) {
    const history = createMemoryHistory();
    const store = configureStore(history, {});
    const branch = matchRoutes(routes, route);

    await loadBranchData(store, branch);

    const helmetContext = {};

    const AppComponent = (
      <Provider store={store}>
        <StaticRouter location={route} context={{}}>
          <HelmetProvider context={helmetContext}>
            <App routes={routes} />
          </HelmetProvider>
        </StaticRouter>
      </Provider>
    );

    const htmlContent = renderToString(AppComponent);
    const state = store.getState();

    const html = renderHtml(
      helmetContext.helmet,
      assets,
      htmlContent,
      /* omit redux router part from the initial state */
      _omit(state, 'router')
    );

    if (!_isEmpty(branch) && branch[0].route.cache) {
      memoryCache.put(route, html);
    }

    return Promise.resolve(html);
  }

  return Promise.resolve(memoryCache.get(route));
};
