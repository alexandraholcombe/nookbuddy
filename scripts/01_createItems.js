#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { itemsPath, itemsDir } = require('./constants');
const { writeFile } = require('./utils');

// Take JSON, output New Horizons item object
const transformItems = (data) => {
  try {
    const { id, name, category, games } = JSON.parse(data);

    const nh = games.nh || null;

    return {
      id,
      name,
      categoryId: category,
      ...nh,
    };
  } catch (err) {
    console.log('data', data);
    console.log('err', err);
  }
  return null;
};

// Turn all JSON files into NH item objects, remove non-NH items
const readFiles = (dir) => {
  const fileNames = fs.readdirSync(dir);

  const result = fileNames
    .map((fileName) => {
      const contents = fs.readFileSync(path.join(itemsDir, fileName));
      return transformItems(contents);
    })
    .filter((data) => !!data.sellPrice);

  return result;
};

// An array of NH item objects
const items = readFiles(itemsDir);

try {
  // write items to file
  writeFile(itemsPath, items);
} catch (error) {
  console.log('Failed to Create Items');
  console.log(error);
}
