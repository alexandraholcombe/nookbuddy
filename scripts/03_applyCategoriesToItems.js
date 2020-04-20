#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const axios = require('axios'); // eslint-disable-line import/no-extraneous-dependencies
const { categoriesPath, itemsDir, writeCategories } = require('./constants');
require('dotenv').config(); // eslint-disable-line import/no-extraneous-dependencies

const GetCategories = `
query GetCategories {
  categories {
    id
    name
  }
}

`;

const updateCategories = (objects) => {
  axios({
    url: process.env.REACT_APP_API,
    method: 'post',
    data: {
      query: CreateCategories,
      variables: { objects },
    },
  }).then((result) => {
    fs.writeFileSync(
      path.join(itemsDir, '..', 'categories.json'),
      JSON.stringify(createCategories(result)),
    );
  });
};

const categories = JSON.parse(fs.readFileSync(categoriesPath));

updateCategories(categories);
