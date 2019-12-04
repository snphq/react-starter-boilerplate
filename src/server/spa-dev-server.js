import express from 'express';
import chalk from 'chalk';

import webpackDev from './webpack-dev';

const app = express();

webpackDev(app);

if (process.env.port) {
  app.listen(process.env.port, err => {
    const url = `http://localhost:${process.env.port}`;

    if (err) {
      console.error(`==> 😭  OMG!!! ${err}`);
    }

    console.info(chalk.green(`==> 🌎  Listening at ${url}`));
  });
} else {
  console.error(
    chalk.red('==> 😭  OMG!!! No PORT environment variable has been specified')
  );
}
