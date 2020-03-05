// const fs = require('fs-extra');
const fsExtra = require('fs-extra');
const path = require('path');

fsExtra.ensureDirSync('public');

['src/assets/favicons', 'tools/sw/pwa'].forEach(file => {
  fsExtra.copySync(
    path.resolve(process.cwd(), file),
    path.resolve(process.cwd(), 'public')
  );
});
