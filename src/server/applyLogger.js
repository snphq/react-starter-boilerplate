import morgan from 'morgan';

export default (app) => {
  app.use(morgan('dev', { skip: (req, res) => res.statusCode < 400 }));
};
