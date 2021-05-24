const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');
const common = require('./common.js');

const cwd = process.cwd();

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: [
    'webpack-hot-middleware/client?overlay=false',
    path.resolve(cwd, 'src/client'),
  ],
  cache: { type: 'filesystem' },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WebpackNotifierPlugin({
      excludeWarnings: true,
      title: cwd.split('/').pop(),
    }),
  ],
});
