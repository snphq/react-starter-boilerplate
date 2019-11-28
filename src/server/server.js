import express from 'express';
import chalk from 'chalk';

import applyMiddlewares from './applyMiddlewares';
import applyRouter from './applyRouter';

export default (port, ...devMiddlewares) => {
  const app = express();

  devMiddlewares.forEach(middleware => middleware(app));

  applyMiddlewares(app);
  applyRouter(app);

  if (port) {
    app.listen(port, err => {
      const url = `http://localhost:${port}`;

      if (err) {
        console.error(`==> 😭  OMG!!! ${err}`);
      }

      console.info(chalk.green(`==> 🌎  Listening at ${url}`));
    });
  } else {
    console.error(
      chalk.red(
        '==> 😭  OMG!!! No PORT environment variable has been specified'
      )
    );
  }
};
