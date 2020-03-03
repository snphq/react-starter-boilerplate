const path = require('path');

module.exports = {
  models: path.resolve(process.cwd(), 'src/models'),
  utils: path.resolve(process.cwd(), 'src/utils'),
  api: path.resolve(process.cwd(), 'src/api'),
  hooks: path.resolve(process.cwd(), 'src/hooks'),
  config: path.resolve(process.cwd(), 'src/config'),
  store: path.resolve(process.cwd(), 'src/store'),
  pages: path.resolve(process.cwd(), 'src/pages'),
  components: path.resolve(process.cwd(), 'src/components'),
  styles: path.resolve(process.cwd(), 'src/styles'),
  images: path.resolve(process.cwd(), 'src/assets/images'),
  stubs: path.resolve(process.cwd(), 'src/stubs'),
};
