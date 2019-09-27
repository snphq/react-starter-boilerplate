const fs = require('fs-extra');
const path = require('path');

fs.copySync(
  path.resolve(process.cwd(), 'src/assets/favicons'),
  path.resolve(process.cwd(), 'public')
);
