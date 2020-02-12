const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(require('./common'), {
  mode: 'production',
  devtool: 'hidden-source-map',
  cache: false,
  entry: {
    main: path.resolve(process.cwd(), 'src/client'),
    vendors: require('./vendors'),
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.jsx?$|\.css$|\.(scss|sass)$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.NODE_ENV === 'analyze' ? 'server' : 'disabled',
    }),
  ],
});
