import { matchRoutes } from 'react-router-config';
import createHistory from 'history/createMemoryHistory';
import chalk from 'chalk';

import configureStore from '../store';
import loadBranchData from './loadBranchData';
import routes from '../routes';
import render from './render';

export default (app) => {
  routes.forEach(({ path }) => {
    app.get(path, (req, res) => {
      (async () => {
        try {
          const history = createHistory();
          const store = configureStore(history, {});
          const branch = matchRoutes(routes, req.path);

          await loadBranchData(store, branch);
          const html = render(store, req.path);

          res
            .status(200)
            .send(html);
        } catch (err) {
          res.status(500).send('Internal server error');
          if (__DEV__) {
            console.error(chalk.red(`==> 😭 Internal server error: ${err}`));
          }
        }
      })();
    });
  });

  app.get('*', (req, res) => {
    const history = createHistory();
    const store = configureStore(history, {});

    (async () => {
      try {
        const html = render(store, req.path);

        res.status(404).send(html);
      } catch (err) {
        res.status(500).send('Internal server error');
        if (__DEV__) {
          console.error(chalk.red(`==> 😭 Internal server error: ${err}`));
        }
      }
    })();
  });
};
