module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'dynamic-import-node',
    'lodash',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          _redux: './src/_redux',
          _hocs: './src/hocs',
          _utils: './src/utils',
          _api: './src/api',
          _config: './src/config',
          _store: './src/store',
          _pages: './src/pages',
          _containers: './src/containers',
          _components: './src/components',
          _styles: './src/styles',
          _images: './src/assets/images',
        },
      },
    ],
  ],
};
