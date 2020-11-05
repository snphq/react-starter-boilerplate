const path = require('path');

module.exports = {
  cssLoaderOptions: {
    importLoaders: 1,
    sourceMap: true,
    modules: true,
    context: path.join(process.cwd(), './src'),
    localIdentName: '[name]__[local]--[hash:base64:5]',
  },
  loaders: [{ loader: 'postcss-loader', options: { sourceMap: true } }],
};
