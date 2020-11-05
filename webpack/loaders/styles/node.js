const { loaders, cssLoaderOptions } = require('./common');

module.exports = [
  {
    test: /\.css$/,
    use: [
      {
        loader: 'css-loader/locals',
        options: cssLoaderOptions,
      },
      ...loaders,
    ],
  },
  {
    test: /\.(scss|sass)$/,
    use: [
      {
        loader: 'css-loader/locals',
        options: cssLoaderOptions,
      },
      ...loaders,
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          implementation: require('sass'),
        },
      },
    ],
  },
];
