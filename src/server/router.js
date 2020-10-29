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
    .forEach(({ path }) => app.get(path, (req, res) => render(req.path, res)));

  app.post('/api/email', formiddable.any(), (req, res) => {
    sendMail({
      from: config.mailer.from,
      to: req.body.to || config.mailer.to,
      email: req.body.email,
      name: req.body.name,
      subject: req.body.subject,
      html: req.body.html,
      attachments: req.files,
    })
      .then(() => {
        res.status(200).send('Successfully sent!');
      })
      .catch(error => {
        if (error.statusCode === 400) {
          res.status(400).send({ error: `${error}` });
        } else {
          res.status(500).send('Internal server error');

          if (process.env.APP_ENV === 'development') {
            console.error(chalk.red('==> 😭 Internal server error'));
            console.error(error);
          }
        }
      });
  });

  app.get('*', (req, res) => {
    res.status(404);
    render(req.path, res);
  });
};
