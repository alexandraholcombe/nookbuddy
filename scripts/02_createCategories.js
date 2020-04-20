const { parseFile, transformCategories, writeFile } = require('./utils');
const { categoriesPath, itemsPath } = require('./constants');

const items = parseFile(itemsPath);

const categories = transformCategories(items);

writeFile(categoriesPath, categories);
