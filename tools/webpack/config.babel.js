/* eslint-disable */

import path from 'path';
import webpack from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import ImageminPlugin from 'imagemin-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const nodeEnv = process.env.NODE_ENV || 'development';
const appEnv = process.env.APP_ENV || 'development';
const injectHtml = process.env.HTML_INJECTION === 'inject';

const isDev = nodeEnv === 'development';
const CSSModules = true;
const eslint = false;
const stylelint = false;

const getPlugins = () => {
  const plugins = [
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[hash].css',
    }),
    new ManifestPlugin({
      fileName: path.resolve(process.cwd(), 'public/webpack-assets.json'),
      filter: file => file.isInitial,
    }),
    new StyleLintPlugin({ failOnError: stylelint }),
    new webpack.EnvironmentPlugin({ NODE_ENV: JSON.stringify(nodeEnv) }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: isDev,
      __INJECT_HTML__: injectHtml,
      __APP_ENV__: JSON.stringify(appEnv),
    }),
    new FriendlyErrorsWebpackPlugin(),
  ];

  if (isDev) {
    plugins.push(new WebpackNotifierPlugin({
      excludeWarnings: true,
      title: `${process.env.PWD.split('/').pop()}`,
    }));
    plugins.push(new webpack.HotModuleReplacementPlugin());
  } else {
    plugins.push(
      new webpack.HashedModuleIdsPlugin(),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.jsx?$|\.css$|\.(scss|sass)$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
      new ImageminPlugin({
        pngquant: { quality: '95-100' },
      }),
      new BundleAnalyzerPlugin({
        analyzerMode:
          process.env.NODE_ENV === 'analyze' ? 'server' : 'disabled',
      })
    );
  }

  return plugins;
};

const getEntry = () => {
  if (!isDev) {
    return ['./src/client.js'];
  }

  return ['webpack-hot-middleware/client', './src/client.js'];
};

// Webpack configuration
module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-source-map' : 'hidden-source-map',
  context: path.resolve(process.cwd()),
  entry: getEntry(),
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  output: {
    path: path.resolve(process.cwd(), 'public/assets'),
    publicPath: '/assets/',
    // Don't use chunkhash in development it will increase compilation time
    filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDev ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
    pathinfo: isDev,
  },
  module: {
    rules: [
      {
        // Eslint
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint',
        options: { failOnError: eslint },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        options: {
          cacheDirectory: isDev,
        },
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: CSSModules,
              context: path.join(process.cwd(), './src'),
              localIdentName: '[name]__[local]--[hash:base64:5]',
              minimize: !isDev,
            },
          },
          { loader: 'postcss', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: CSSModules,
              context: path.join(process.cwd(), './src'),
              localIdentName: '[name]__[local]--[hash:base64:5]',
              minimize: !isDev,
            },
          },
          { loader: 'postcss', options: { sourceMap: true } },
          {
            loader: 'sass',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
              sourceMapContents: !isDev,
            },
          },
        ],
      },
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        loader: 'url',
        options: { limit: 10240, name: '[name].[hash:8].[ext]' },
      },
      {
        test: /\.(gif|png|jpe?g|webp)$/,
        // Any image below or equal to 10K will be converted to inline base64 instead
        loader: 'url',
        options: { limit: 10240, name: '[name].[hash:8].[ext]' },
      },
    ],
  },
  plugins: getPlugins(),
  /* Advanced configuration */
  resolveLoader: {
    // Use loaders without the -loader suffix
    moduleExtensions: ['-loader'],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    descriptionFiles: ['package.json'],
    alias: {
      _redux: path.resolve(process.cwd(), 'src/_redux'),
      _utils: path.resolve(process.cwd(), 'src/utils'),
      _api: path.resolve(process.cwd(), 'src/api'),
      _hocs: path.resolve(process.cwd(), 'src/hocs'),
      _config: path.resolve(process.cwd(), 'src/config'),
      _store: path.resolve(process.cwd(), 'src/store'),
      _pages: path.resolve(process.cwd(), 'src/pages'),
      _containers: path.resolve(process.cwd(), 'src/containers'),
      _components: path.resolve(process.cwd(), 'src/components'),
      _styles: path.resolve(process.cwd(), 'src/styles'),
      _images: path.resolve(process.cwd(), 'src/assets/images'),
    },
    extensions: ['.js', '.jsx', '.json'],
  },
  cache: isDev,
  stats: {
    entrypoints: false,
  },
  node: {
    fs: 'empty',
    vm: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
