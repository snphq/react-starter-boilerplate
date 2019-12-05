const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');

fsExtra.ensureDirSync('public');

fs.writeFileSync(
  path.resolve(process.cwd(), 'public/webpack-assets.json'),
  '{ "js": "/main.js" }',
  'utf8'
);
