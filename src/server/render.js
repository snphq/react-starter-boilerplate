import memoryCache from 'memory-cache';
import chalk from 'chalk';
import { createMemoryHistory } from 'history';
import { minify } from 'html-minifier';
import { Readable } from 'stream';

import _omit from 'lodash/omit';

import renderHead from '../utils/renderHead';
import { renderHtmlStart, renderHtmlEnd } from '../utils/renderHtml';
import loadBranchData from './loadBranchData';

import config from '../config';
import routes from '../routes';
import configureStore from '../store';
import matchRoutes from 'utils/matchRoutes';
import * as render from '../utils/renderRootComponent';
import assets from '../../public/webpack-assets.json';

const isDev = process.env.APP_ENV === 'development';

const handleRenderError = (res, error) => {
  res.end('Internal server error');

  if (process.env.APP_ENV === 'development') {
    console.error(chalk.red('==> 😭 Internal server error'));
    console.error(error);
  }
};

const sendAppStream = (res, route, store, cache) => {
  const appContentStream = isDev
    ? Readable.from([''])
    : render.toStream(store, route);

  appContentStream.on('error', error => {
    handleRenderError(res, error);
  });

  appContentStream.pipe(res, { end: false });

  appContentStream.on('end', () => {
    const htmlEnd = renderHtmlEnd(
      isDev ? { js: '/main.js' } : assets,
      /* omit redux router part from the initial state */
      _omit(store.getState(), 'router')
    );

    res.write(htmlEnd);
    res.end();

    if (cache) {
      const html = `${res.__HTML_START__}${render.toString(
        store,
        route
      )}${htmlEnd}`;

      memoryCache.put(route, minify(html, config.htmlMinifier));
    }
  });
};

export default (route, res) => {
  try {
    const cachedHtml = memoryCache.get(route);

    if (cachedHtml === null || cachedHtml === undefined) {
      const history = createMemoryHistory();
      const store = configureStore(history, {});
      const branch = matchRoutes(routes, route);

      const { sagasToRun, title, cache } = branch.route;
      const { params } = branch.match;

      const head = renderHead(title);

      const htmlStart = renderHtmlStart(head, assets);

      res.set('Content-Type', 'text/html; charset=utf-8');
      res.__HTML_START__ = htmlStart;
      res.write(htmlStart);

      if (sagasToRun && sagasToRun.length > 0) {
        loadBranchData(store, sagasToRun, params)
          .then(() => sendAppStream(res, route, store, cache))
          .catch(error => handleRenderError(res, error));
      } else {
        sendAppStream(res, route, store, cache);
      }
    } else {
      res.send(cachedHtml);
    }
  } catch (error) {
    handleRenderError(res, error);
  }
};
