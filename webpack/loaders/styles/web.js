const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { loaders, cssLoaderOptions } = require('./common');

const isDev = process.env.APP_ENV === 'development';

module.exports = [
  {
    test: /\.css$/,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css',
        options: cssLoaderOptions,
      },
      ...loaders,
    ],
  },
  {
    test: /\.(scss|sass)$/,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css',
        options: cssLoaderOptions,
      },
      ...loaders,
      {
        loader: 'sass',
        options: {
          sourceMap: true,
          implementation: require('sass'),
        },
      },
    ],
  },
];
