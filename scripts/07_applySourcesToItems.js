#!/usr/bin/env node

const { sourcesPath, itemsPath } = require('./constants');
const { parseFile, writeFile } = require('./utils');
require('dotenv').config(); // eslint-disable-line import/no-extraneous-dependencies

const allSources = parseFile(sourcesPath);
const allItems = parseFile(itemsPath);

const arrangeSources = (data) => {
  return Object.fromEntries(data.map((obj) => [obj.name, obj.id]));
};

const applySources = (items, sources) => {
  const sourceIds = arrangeSources(sources);

  return items.map((item) => {
    if (item.sources) {
      const updatedSources = item.sources.map((source) => sourceIds[source]);
      return {
        ...item,
        sources: updatedSources,
      };
    }

    return item;
  });
};

try {
  const updatedItems = applySources(allItems, allSources);
  writeFile(itemsPath, updatedItems);
} catch (error) {
  console.log('Failed to add Sources to items');
  console.log(error);
}
