require('@babel/register');

const server = require('./server').default;
const webpackDev = require('./webpack-dev').default;
const logger = require('./logger').default;
const spaRouter = require('./spa-router').default;

server(process.env.PORT, webpackDev, logger, spaRouter);
