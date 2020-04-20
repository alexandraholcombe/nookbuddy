const fs = require('fs');

// Aggregate Category names
const transformCategories = (data) => {
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
const transformSources = (data) => {
  const sources = data.map((val) => val.sources || null).filter((val) => !!val);
  const flattened = [].concat(...sources);

  return flattened
    .reduce((acc, val) => (acc.includes(val) ? acc : [...acc, val]), [])
    .map((val) => {
      return { name: val };
    });
};

const writeFile = (path, data) => {
  fs.writeFileSync(path, JSON.stringify(data));
};

module.exports = { transformCategories, transformSources, writeFile };
