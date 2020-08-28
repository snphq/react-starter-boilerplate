require('dotenv').config();

global.RUNTIME_ENV = 'server';

const server = require('./server').default;
const applyMiddlewares = require('./middlewares').default;
const applyRouter = require('./router').default;

server(process.env.PORT, applyMiddlewares, applyRouter);
