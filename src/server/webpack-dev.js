
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../tools/webpack/config.babel';

export default (app) => {
  const compiler = webpack(webpackConfig);

  compiler.apply(new webpack.ProgressPlugin());

  app.use(
    devMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      headers: { 'Access-Control-Allow-Origin': '*' },
      hot: true,
      quiet: true, /* Turn it on for friendly-errors-webpack-plugin */
      noInfo: true,
      stats: 'minimal',
    }),
  );

  app.use(
    hotMiddleware(compiler, {
      log: false, /* Turn it off for friendly-errors-webpack-plugin */
    }),
  );
};
