const path = require('path');
const fs = require('fs');

const getAvalibleTypes = aliases =>
  Object.keys(aliases)
    .reduce((result, alias) => `${result}"${alias}", `, '')
    .slice(0, -2);

const createDir = folderPath => fs.mkdirSync(folderPath);

const createFile = (folderPath, name, type, fileName, templateFn) =>
  fs.writeFileSync(
    path.join(folderPath, fileName),
    templateFn ? templateFn(name, type) : '',
  );

const createFiles = (folderPath, name, type, filesConfig) =>
  filesConfig.forEach(args => createFile(folderPath, name, type, ...args));

const createComponent = (folderPath, name, type, filesConfig) => {

  createDir(folderPath);
  createFiles(folderPath, name, type, filesConfig);
};

module.exports = { getAvalibleTypes, createComponent };
