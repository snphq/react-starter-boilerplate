const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isDev = process.env.APP_ENV === 'development';

module.exports = {
  context: path.resolve(process.cwd()),
  output: {
    path: path.resolve(process.cwd(), 'public'),
    publicPath: '/',
    filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDev ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
    pathinfo: false,
  },
  module: {
    rules: require('./loaders'),
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new FriendlyErrorsWebpackPlugin(),
    new StyleLintPlugin({ failOnError: false }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[hash].css',
    }),
    new ManifestPlugin({
      fileName: path.resolve(process.cwd(), 'public/webpack-assets.json'),
      filter: file => file.isInitial,
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      APP_ENV: JSON.stringify(process.env.APP_ENV || 'development'),
    }),
    new webpack.DefinePlugin({
      RUNTIME_ENV: JSON.stringify('client'),
    }),
  ],
  resolve: {
    modules: ['src', 'node_modules'],
    descriptionFiles: ['package.json'],
    extensions: ['.js', '.jsx', '.json'],
    alias: require('./alias'),
    fallback: {
      fs: false,
      vm: false,
      net: false,
      tls: false,
    },
  },
  stats: {
    entrypoints: false,
  },
};
