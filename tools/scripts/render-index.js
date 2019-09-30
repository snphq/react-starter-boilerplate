require('@babel/register');

const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier');

const assets = require('../../public/webpack-assets.json');
const renderHtml = require('../../src/utils/renderHtml').default;
const renderHead = require('../../src/utils/renderHead').default;
const config = require('../../src/config').default;

fs.writeFileSync(
  path.resolve(process.cwd(), 'public/index.html'),
  minify(renderHtml(renderHead(), assets, '', {}), config.htmlMinifier),
  'utf8'
);
