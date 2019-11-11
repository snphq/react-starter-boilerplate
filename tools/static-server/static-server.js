const express = require('express');
const chalk = require('chalk');
const path = require('path');

const config = require('../../src/config').default;

const app = express();

app.use(express.static(path.resolve(process.cwd(), 'public')));

app.get('*', (_, res) => {
  res.sendFile(path.resolve(process.cwd(), 'public/index.html'));
});

if (config.port) {
  app.listen(config.port, () => {
    console.info(
      chalk.green(`==> 🌎  Listening at http://localhost:${config.port}`)
    );
  });
} else {
  console.error(
    chalk.red('==> 😭  OMG!!! No PORT environment variable has been specified')
  );
}
