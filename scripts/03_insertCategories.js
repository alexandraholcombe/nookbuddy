#!/usr/bin/env node

const axios = require('axios'); // eslint-disable-line import/no-extraneous-dependencies
const { categoriesPath } = require('./constants');
const { parseFile, writeFile } = require('./utils');
require('dotenv').config(); // eslint-disable-line import/no-extraneous-dependencies

const CreateCategories = `
  mutation CreateCategories($objects: [categories_insert_input!]!) {
    insert_categories(objects: $objects) {
      returning {
        id
        name
      }
    }
  }
`;

const GetCategories = `
query GetCategories {
  categories {
    id
    name
  }
}
`;

const updateLocalCategories = () => {
  axios({
    url: process.env.REACT_APP_API,
    method: 'post',
    data: {
      query: GetCategories,
    },
  })
    .then((res) => {
      const result = res.data.data.sources;
      writeFile(categoriesPath, result);
    })
    .catch((err) => {
      console.log('Failed to get categories');
      console.log(err);
    });
};

// Oof
const createCategories = (objects) => {
  axios({
    url: process.env.REACT_APP_API,
    method: 'post',
    data: {
      query: CreateCategories,
      variables: { objects },
    },
  })
    .then(() => {
      updateLocalCategories();
    })
    .catch((err) => {
      console.log('Failed to insert categories');
      console.log(err);
    });
};

try {
  const categories = parseFile(categoriesPath);
  updateLocalCategories(categories);
  // createCategories(categories);
} catch (error) {
  console.log('Failed to insert categories');
  console.log(error);
}
