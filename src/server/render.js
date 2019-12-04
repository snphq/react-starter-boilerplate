import memoryCache from 'memory-cache';
import { matchRoutes } from 'react-router-config';
import { createMemoryHistory } from 'history';
import { minify } from 'html-minifier';

import _isNil from 'lodash/isNil';
import _isEmpty from 'lodash/isEmpty';
import _omit from 'lodash/omit';

import renderHtml from '../utils/renderHtml';
import loadBranchData from './loadBranchData';

import config from '../config';
import routes from '../routes';
import configureStore from '../store';
import renderApp from '../utils/renderApp';

/* eslint-disable import/extensions */
import assets from '../../public/webpack-assets.json';
/* eslint-disable import/extensions */

const isDev = process.env.APP_ENV === 'development';

export default async route => {
  const cache = memoryCache.get(route);

  if (_isNil(cache)) {
    const history = createMemoryHistory();
    const store = configureStore(history, {});
    const branch = matchRoutes(routes, route);

    if (!isDev) {
      await loadBranchData(store, branch);
    }

    const helmetContext = {};

    const htmlContent = renderApp(route, store, helmetContext);

    const head = [
      'htmlAttributes',
      'title',
      'base',
      'link',
      'meta',
      'script',
    ].reduce(
      (acc, attr) => ({
        ...acc,
        [attr]: helmetContext.helmet[attr].toString(),
      }),
      {}
    );

    const html = renderHtml(
      head,
      isDev ? { js: '/main.js' } : assets,
      /* do not include rendered string to html in development mode to allow hmr */
      isDev ? '' : htmlContent,
      /* omit redux router part from the initial state */
      _omit(store.getState(), 'router')
    );

    if (!_isEmpty(branch) && branch[0].route.cache) {
      memoryCache.put(route, html);
    }

    return Promise.resolve(isDev ? html : minify(html, config.htmlMinifier));
  }

  return Promise.resolve(memoryCache.get(route));
};
