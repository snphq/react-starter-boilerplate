import chalk from 'chalk';
import multer from 'multer';

import routes from '../routes';
import render from './render';
import sendMail from './mailer';
import config from '../config';

const formiddable = multer({});

export default app => {
  routes
    .filter(({ path }) => path !== '*')
    .forEach(({ path }) => {
      app.get(path, (req, res) => {
        (async () => {
          try {
            const html = await render(req.path);

            res.status(200).send(html);
          } catch (err) {
            res.status(500).send('Internal server error');

            if (process.env.APP_ENV === 'development') {
              console.error(chalk.red(`==> 😭 Internal server error: ${err}`));
            }
          }
        })();
      });
    });

  app.post('/email', formiddable.any(), (req, res) => {
    (async () => {
      try {
        await sendMail({
          from: config.mailer.from,
          to: config.mailer.to,
          subject: req.body.subject,
          text: req.body.text,
          attachments: req.files,
        });

        res.status(200).send('Successfully sent!');
      } catch (err) {
        res.status(500).send('Internal server error');

        if (process.env.APP_ENV === 'development') {
          console.error(chalk.red(`==> 😭 Internal server error: ${err}`));
        }
      }
    })();
  });

  app.get('*', (req, res) => {
    (async () => {
      try {
        const html = await render(req.path);

        res.status(404).send(html);
      } catch (err) {
        res.status(500).send('Internal server error');

        if (process.env.APP_ENV === 'development') {
          console.error(chalk.red(`==> 😭 Internal server error: ${err}`));
        }
      }
    })();
  });
};
