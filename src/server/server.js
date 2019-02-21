import express from 'express';
import chalk from 'chalk';

import { port } from '../config';

import applyLogger from './applyLogger';
import applyMiddlewares from './applyMiddlewares';
import applyRouter from './applyRouter';
import webpackDev from './webpack-dev';

const app = express();

if (__DEV__) {
  applyLogger(app);
  webpackDev(app);
}

applyMiddlewares(app);
applyRouter(app);

if (port) {
  app.listen(port, (err) => {
    const url = `http://localhost:${port}`;

    if (err && __DEV__) {
      console.error(`==> 😭  OMG!!! ${err}`);
    }

    if (__DEV__) {
      console.info(chalk.green(`==> 🌎  Listening at ${url}`));
    }
  });
} else {
  console.error(chalk.red('==> 😭  OMG!!! No PORT environment variable has been specified'));
}
