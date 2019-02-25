
import chalk from 'chalk';
import routes from '../routes';
import render from './render';

export default (app) => {
  routes.forEach(({ path }) => {
    app.get(path, (req, res) => {
      (async () => {
        try {
          const html = await render(req.path);

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
    (async () => {
      try {
        const html = await render(req.path);

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
