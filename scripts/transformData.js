#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data', 'items');

// Take JSON, output New Horizons item object
const transformData = (data) => {
  try {
    const { id, name, category, games } = JSON.parse(data);

    const nh = games.nh || null;

    return {
      id,
      name,
      category,
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
      const contents = fs.readFileSync(path.join(dataDir, fileName));
      return transformData(contents);
    })
    .filter((data) => !!data.sellPrice);

  return result;
};

// Aggregate Category names
const createCategories = (data) => {
  return data
    .reduce(
      (acc, val) => (acc.includes(val.category) ? acc : [...acc, val.category]),
      [],
    )
    .map((val) => {
      return { name: val };
    });
};

// Aggregate Sources
const createSources = (data) => {
  const sources = data.map((val) => val.sources || null).filter((val) => !!val);
  const flattened = [].concat(...sources);

  return flattened
    .reduce((acc, val) => (acc.includes(val) ? acc : [...acc, val]), [])
    .map((val) => {
      return { name: val };
    });
};

// An array of NH item objects
const items = readFiles(dataDir);

// write items to file
fs.writeFileSync(path.join(dataDir, '..', 'items.json'), JSON.stringify(items));

// write categories to file
fs.writeFileSync(
  path.join(dataDir, '..', 'categories.json'),
  JSON.stringify(createCategories(items)),
);

// write sources to file
fs.writeFileSync(
  path.join(dataDir, '..', 'sources.json'),
  JSON.stringify(createSources(items)),
);
