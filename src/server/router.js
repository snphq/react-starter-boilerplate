import chalk from 'chalk';
import multer from 'multer';

import render from './render';
import sendMail from './mailer';

import config from '../config';
import routes from '../routes';

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
          } catch (error) {
            res.status(500).send('Internal server error');

            if (process.env.APP_ENV === 'development') {
              console.error(
                chalk.red(`==> 😭 Internal server error: ${error}`)
              );
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
          email: req.body.email,
          name: req.body.name,
          subject: req.body.subject,
          text: req.body.text,
          attachments: req.files,
        });

        res.status(200).send('Successfully sent!');
      } catch (error) {
        if (error.statusCode === 400) {
          res.status(400).send({ error: `${error}` });
        } else {
          res.status(500).send('Internal server error');

          if (process.env.APP_ENV === 'development') {
            console.error(chalk.red(`==> 😭 Internal server error: ${error}`));
          }
        }
      }
    })();
  });

  app.get('*', (req, res) => {
    (async () => {
      try {
        const html = await render(req.path);

        res.status(404).send(html);
      } catch (error) {
        res.status(500).send('Internal server error');

        if (process.env.APP_ENV === 'development') {
          console.error(chalk.red(`==> 😭 Internal server error: ${error}`));
        }
      }
    })();
  });
};
