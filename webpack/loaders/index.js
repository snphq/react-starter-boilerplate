const styles = require('./styles');

module.exports = [
  {
    enforce: 'pre',
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'eslint',
    options: { failOnError: false },
  },
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel',
    options: {
      cacheDirectory: false,
    },
  },
  {
    test: /\.(woff2?|ttf|eot)$/,
    loader: 'file',
    options: {
      name: '[name].[hash:8].[ext]',
      emitFile: process.env.TARGET_ENV !== 'node',
    },
  },
  {
    test: /\.(gif|png|svg|jpe?g|webp)$/,
    loader: 'file',
    options: {
      limit: 10240,
      name: '[name].[hash:8].[ext]',
      emitFile: process.env.TARGET_ENV !== 'node',
    },
  },
  ...styles,
];
