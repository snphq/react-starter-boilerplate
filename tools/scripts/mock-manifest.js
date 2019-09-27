const fs = require('fs');
const path = require('path');

fs.writeFileSync(
  path.resolve(process.cwd(), 'public/webpack-assets.json'),
  '{}',
  'utf8'
);
