import path from 'path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';
import favicon from 'serve-favicon';

export default (app) => {
  app.use(helmet());
  app.use(hpp());
  app.use(compression());
  app.use(favicon(path.resolve(process.cwd(), 'public/favicon.ico')));
  app.use(express.static(path.resolve(process.cwd(), 'public')));
};
