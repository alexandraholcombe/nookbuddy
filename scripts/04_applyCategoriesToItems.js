#!/usr/bin/env node

const { categoriesPath, itemsPath } = require('./constants');
const { parseFile, writeFile } = require('./utils');
require('dotenv').config(); // eslint-disable-line import/no-extraneous-dependencies

const allCategories = parseFile(categoriesPath);
const allItems = parseFile(itemsPath);

const arrangeCategories = (data) => {
  return Object.fromEntries(data.map((obj) => [obj.name, obj.id]));
};

const applyCategories = (items, categories) => {
  const categoryIds = arrangeCategories(categories);

  return items.map((item) => {
    return {
      ...item,
      categoryId: categoryIds[item.categoryId],
    };
  });
};

try {
  const updatedItems = applyCategories(allItems, allCategories);
  writeFile(itemsPath, updatedItems);
} catch (error) {
  console.log('Failed to add Categories to items');
  console.log(error);
}
