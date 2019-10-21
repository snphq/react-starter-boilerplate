const fs = require('fs-extra');
const fsExtra = require('fs-extra');
const path = require('path');

fsExtra.ensureDirSync('public');

fs.copySync(
  path.resolve(process.cwd(), 'src/assets/favicons'),
  path.resolve(process.cwd(), 'public')
);
