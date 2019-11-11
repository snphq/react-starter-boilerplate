const sass = require('sass');
const path = require('path');
const postcssConfig = require('../postcss.config');

module.exports = () => {
  require('css-modules-require-hook')({
    generateScopedName: '[name]__[local]--[hash:base64:5]',
    extensions: ['.css', '.scss', '.sass'],
    prepend: [...postcssConfig.plugins],
    preprocessCss: (data, filename) =>
      sass.renderSync({
        data,
        file: filename,
        importer: url => ({
          file: url.replace('~styles', './src/styles'),
        }),
      }).css,
    rootDir: path.resolve(process.cwd(), 'src'),
    devMode: process.env.APP_ENV === 'development',
  });

  require('asset-require-hook')({
    extensions: ['gif', 'jpg', 'jpeg', 'png', 'webp'],
    publicPath: '/',
    limit: 10240,
    name: '[name].[hash:8].[ext]',
  });

  require('asset-require-hook')({
    extensions: ['woff', 'woff2', 'ttf', 'eot', 'svg'],
    publicPath: '/',
    limit: 10240,
    name: '[name].[hash:8].[ext]',
  });
};
