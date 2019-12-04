require('@babel/register');

global.RUNTIME_ENV = 'server';

require('../../tools/hooks')();

const server = require('./server').default;
const webpackDev = require('./webpack-dev').default;
const applyLogger = require('./logger').default;
const applyMiddlewares = require('./middlewares').default;
const applyRouter = require('./router').default;

server(
  process.env.PORT,
  webpackDev,
  applyLogger,
  applyMiddlewares,
  applyRouter
);
