const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const path = require('path');

module.exports = {
  // debug: true,
  // webpack_assets_file_path: 'webpack-assets.json',
  // webpack_stats_file_path: 'webpack-stats.json',
  alias: {
    _constants: path.resolve(process.cwd(), 'src/actions/constants'),
    _actions: path.resolve(process.cwd(), 'src/actions'),
    _api: path.resolve(process.cwd(), 'src/api'),
    _sagas: path.resolve(process.cwd(), 'src/sagas'),
    _config: path.resolve(process.cwd(), 'src/config'),
    _reducers: path.resolve(process.cwd(), 'src/reducers'),
    _store: path.resolve(process.cwd(), 'src/store'),
    _pages: path.resolve(process.cwd(), 'src/pages'),
    _styles: path.resolve(process.cwd(), 'src/styles')
  },
  assets: {
    images: {
      extensions: ['png', 'jpg', 'jpeg', 'gif'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },
    fonts: {
      extensions: ['eot', 'ttf', 'woff', 'woff2'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },
    svg: {
      extension: 'svg',
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },
    style_modules: {
      extensions: ['css', 'scss'],
      filter: (module, regex, options, log) => {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
        }

        return regex.test(module.name);
      },
      path: (module, options, log) => {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
        }

        return module.name;
      },
      parser: (module, options, log) => {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
        }

        return module.source;
      },
    },
  },
};
