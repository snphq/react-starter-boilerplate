import express from 'express';
import chalk from 'chalk';

import config from '../config';

import applyLogger from './applyLogger';
import applyMiddlewares from './applyMiddlewares';
import applyRouter from './applyRouter';
import webpackDev from './webpack-dev';

const app = express();
const isDev = process.env.APP_ENV === 'development';

if (isDev) {
  applyLogger(app);
  webpackDev(app);
}

applyMiddlewares(app);
applyRouter(app);

if (config.port) {
  app.listen(config.port, err => {
    const url = `http://localhost:${config.port}`;

    if (err && isDev) {
      console.error(`==> 😭  OMG!!! ${err}`);
    }

    if (isDev) {
      console.info(chalk.green(`==> 🌎  Listening at ${url}`));
    }
  });
} else {
  console.error(
    chalk.red('==> 😭  OMG!!! No PORT environment variable has been specified')
  );
}
