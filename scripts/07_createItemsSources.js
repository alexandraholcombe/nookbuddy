#!/usr/bin/env node

const { sourcesPath, itemsPath, itemsSourcesPath } = require('./constants');
const { parseFile, removeKeys, writeFile } = require('./utils');
require('dotenv').config(); // eslint-disable-line import/no-extraneous-dependencies

const allSources = parseFile(sourcesPath);
const allItems = parseFile(itemsPath);

const arrangeSources = (data) => {
  return Object.fromEntries(data.map((obj) => [obj.name, obj.id]));
};

const makeItemSource = (item, sources) => {
  return item.sources.map((source) => {
    return {
      itemId: item.id,
      sourceId: sources[source],
    };
  });
};

const aggregateItemsSources = (items, sources) => {
  const arrangedSources = arrangeSources(sources);
  return items.reduce((acc, item) => {
    return item.sources
      ? acc.concat(makeItemSource(item, arrangedSources))
      : acc;
  }, []);
};

const removeSources = (items) =>
  items.map((item) => removeKeys(item, 'sources'));

try {
  const itemsSources = aggregateItemsSources(allItems, allSources);
  writeFile(itemsSourcesPath, itemsSources);
  writeFile(itemsPath, removeSources(allItems));
} catch (error) {
  console.log('Failed to add Sources to items');
  console.log(error);
}
