const { parseFile, writeFile } = require('./utils');
const { itemsPath } = require('./constants');

const allItems = parseFile(itemsPath);

const arrangePrices = (items) => {
  return items.map((item) => {
    const { id, name, category, sources, buyPrices, sellPrice } = item;
    const prices = JSON.stringify({ buyPrices, sellPrice });
    return {
      id,
      name,
      category,
      sources,
      prices,
    };
  });
};

try {
  const updatedItems = arrangePrices(allItems);
  writeFile(itemsPath, updatedItems);
} catch (error) {
  console.log('Failed to update Prices');
  console.log(error);
}

arrangePrices(allItems);
