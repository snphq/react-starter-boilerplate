/* eslint no-console: 0 */

const path = require('path');
const { getAvalibleTypes, createComponent } = require('./utils');

const {
  getIndexJsFileText,
  getMainJsFileText,
  getMainStyleFileText,
} = require('./templates');

const SRC_PATH = path.resolve('./src');

const FOLDERS = {
  page: 'pages',
  container: 'containers',
  component: 'components',
};

const ALIASES = {
  page: 'page',
  p: 'page',
  container: 'container',
  con: 'container',
  component: 'component',
  com: 'component',
};

const [,, inputType, inputName, flag] = process.argv;

const type = ALIASES[inputType];

if (!type) {
  console.error(`Type is invlid. You can use only: ${getAvalibleTypes(ALIASES)} types.`);
  process.exit(1);
}

const folder = FOLDERS[type];
const jsFolderPath = path.join(SRC_PATH, folder, inputName);

if (flag === 'w') {
  createComponent(jsFolderPath, inputName, type, [
    [`${inputName}.jsx`, null],
    [`${inputName}.scss`, getMainStyleFileText],
    ['index.js', getIndexJsFileText],
  ]);
} else {
  createComponent(jsFolderPath, inputName, type, [
    [`${inputName}.jsx`, getMainJsFileText],
    [`${inputName}.scss`, getMainStyleFileText],
    ['index.js', getIndexJsFileText],
  ]);
}

