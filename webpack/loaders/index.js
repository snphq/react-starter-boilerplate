const styles = require('./styles');

module.exports = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      cacheDirectory: false,
    },
  },
  {
    test: /\.(woff2?|ttf|eot)$/,
    loader: 'file-loader',
    options: {
      name: '[name].[hash:8].[ext]',
      emitFile: process.env.TARGET_ENV !== 'node',
    },
  },
  {
    test: /\.(gif|png|svg|jpe?g|webp)$/,
    loader: 'file-loader',
    options: {
      limit: 10240,
      name: '[name].[hash:8].[ext]',
      emitFile: process.env.TARGET_ENV !== 'node',
    },
  },
  ...styles,
];
