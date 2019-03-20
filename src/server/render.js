import React from 'react';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import memoryCache from 'memory-cache';
import { matchRoutes } from 'react-router-config';
import { createMemoryHistory } from 'history';

import _isNil from 'lodash/isNil';
import _isEmpty from 'lodash/isEmpty';

import App from '../components/App';
import routes from '../routes';
import renderHtml from '../utils/renderHtml';
import configureStore from '../store';
import loadBranchData from './loadBranchData';

/* eslint-disable import/extensions */
import assets from '../../public/webpack-assets';
/* eslint-disable import/extensions */

export default async (route) => {
  const cache = memoryCache.get(route);

  if (_isNil(cache)) {
    const history = createMemoryHistory();
    const store = configureStore(history, {});
    const branch = matchRoutes(routes, route);

    await loadBranchData(store, branch);

    const AppComponent = (
      <Provider store={store}>
        <StaticRouter location={route} context={{}}>
          <App routes={routes} />
        </StaticRouter>
      </Provider>
    );

    const head = Helmet.renderStatic();
    const htmlContent = renderToString(AppComponent);
    const state = store.getState();

    const html = renderHtml(
      head,
      assets,
      htmlContent,
      state,
    );

    if (!_isEmpty(branch) && branch[0].route.cache) {
      cache.put(route, html);
    }

    return Promise.resolve(html);
  }

  return Promise.resolve(cache.get(route));
};
