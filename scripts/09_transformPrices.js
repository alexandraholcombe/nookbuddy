const { parseFile, removeKeys, writeFile } = require('./utils');
const { itemsPath } = require('./constants');

const allItems = parseFile(itemsPath);

const arrangePrices = (items) => {
  return items.map((item) => {
    const { buyPrices, sellPrice } = item;
    const prices = JSON.stringify({ buyPrices, sellPrice });
    const updatedItem = removeKeys(item, ['buyPrices', 'sellPrice']);
    return {
      ...updatedItem,
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
