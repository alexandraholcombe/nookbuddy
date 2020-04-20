const path = require('path');

const categoriesPath = path.join(__dirname, '..', 'data', 'categories.json');
const itemsPath = path.join(__dirname, '..', 'data', 'items.json');
const sourcesPath = path.join(__dirname, '..', 'data', 'sources.json');
const itemsDir = path.join(__dirname, '..', 'data', 'items');

module.exports = {
  categoriesPath,
  itemsPath,
  sourcesPath,
  itemsDir,
};
