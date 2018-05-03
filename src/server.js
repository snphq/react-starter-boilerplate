/* eslint-disable */

import path from 'path';
import morgan from 'morgan';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';
import favicon from 'serve-favicon';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { all, fork, join } from 'redux-saga/effects';
import Helmet from 'react-helmet';
import chalk from 'chalk';
import _concat from 'lodash/concat';

import createHistory from 'history/createMemoryHistory';
import configureStore from './store';
import renderHtml from './utils/renderHtml';
import routes from './routes';
import assets from '../public/webpack-assets.json';
import { port, host } from './config';

const app = express();

// Use helmet to secure Express with various HTTP headers
app.use(helmet());
// Prevent HTTP parameter pollution.
app.use(hpp());
// Compress all requests
app.use(compression());

// Use for http request debug (show errors only)
app.use(morgan('dev', { skip: (req, res) => res.statusCode < 400 }));
app.use(favicon(path.resolve(process.cwd(), 'public/favicon.ico')));

if (!__DEV__) {
  app.use(express.static(path.resolve(process.cwd(), 'public')));
} else {
  /* Run express as webpack dev server */

  const webpack = require('webpack');
  const webpackConfig = require('../tools/webpack/config.babel');
  const compiler = webpack(webpackConfig);

  compiler.apply(new webpack.ProgressPlugin());

  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      headers: { 'Access-Control-Allow-Origin': '*' },
      hot: true,
      quiet: true, // Turn it on for friendly-errors-webpack-plugin
      noInfo: true,
      stats: 'minimal',
      serverSideRender: true,
    }),
  );

  app.use(
    require('webpack-hot-middleware')(compiler, {
      log: false, // Turn it off for friendly-errors-webpack-plugin
    }),
  );
}

// Register server-side rendering middleware
app.get('*', (req, res) => {
  const history = createHistory();
  const store = configureStore(history);

  // Here's the method for loading data from server-side
  const loadBranchData = () => {
    const branch = matchRoutes(routes, req.path);
    const sagasToRun = branch.reduce((sagas, routeInfo) => {
      const { route, match } = routeInfo;
      if (route.sagasToRun) {
        return _concat(sagas, route.sagasToRun);
      }

      return sagas;
    }, []);

    return store.runSaga(function* runSagas() {
      const tasks = yield all(sagasToRun.map(saga => fork(saga)));
      yield all(tasks.map(task => join(task)));
    }).done;
  };

  (async () => {
    try {
      // Load data from server-side first
      await loadBranchData();

      const staticContext = {};
      const AppComponent = (
        <Provider store={store}>
          {/* Setup React-Router server-side rendering */}
          <StaticRouter location={req.path} context={staticContext}>
            {renderRoutes(routes)}
          </StaticRouter>
        </Provider>
      );

      // Check if the render result contains a redirect, if so we need to set
      // the specific status and redirect header and end the response
      if (staticContext.url) {
        res.status(301).setHeader('Location', staticContext.url);
        res.end();

        return;
      }

      const head = Helmet.renderStatic();
      const htmlContent = renderToString(AppComponent);
      const initialState = store.getState();

      // Check page status
      const status = staticContext.status === '404' ? 404 : 200;

      // Pass the route and initial state into html template
      res
        .status(status)
        .send(
          renderHtml(
            head,
            assets,
            htmlContent,
            initialState,
          ),
        );
    } catch (err) {
      res.status(404).send('Not Found :(');
      console.error(chalk.red(`==> 😭  Rendering routes error: ${err}`));
    }
  })();
});

if (port) {
  app.listen(port, host, (err) => {
    const url = `http://${host}:${port}`;

    if (err) console.error(`==> 😭  OMG!!! ${err}`);

    console.info(chalk.green(`==> 🌎  Listening at ${url}`));

    /* open browser
    require('../tools/openBrowser')(url);
    */
  });
} else {
  console.error(chalk.red('==> 😭  OMG!!! No PORT environment variable has been specified'));
}
