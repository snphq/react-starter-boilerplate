import server from './server';
import webpackDev from './webpack-dev';
import applyLogger from './applyLogger';

server(process.env.PORT, webpackDev, applyLogger);
