const { parseFile, transformSources, writeFile } = require('./utils');
const { sourcesPath, itemsPath } = require('./constants');

const items = parseFile(itemsPath);

const sources = transformSources(items);

try {
  writeFile(sourcesPath, sources);
} catch (error) {
  console.log('Failed to create sources');
  console.log(error);
}
