import express from 'express';
import chalk from 'chalk';

// import sitemap from '../../tools/cron-tasks/sitemap';

export default (port, ...middlewares) => {
  const app = express();

  middlewares.forEach(middleware => middleware(app));

  if (port) {
    app.listen(port, err => {
      const url = `http://localhost:${port}`;

      if (err) {
        console.error(`==> 😭  OMG!!! ${err}`);
      }

      console.info(chalk.green(`==> 🌎  Listening at ${url}`));
    });

    if (process.env !== 'development') {
      // sitemap();
    }
  } else {
    console.error(
      chalk.red(
        '==> 😭  OMG!!! No PORT environment variable has been specified'
      )
    );
  }
};
