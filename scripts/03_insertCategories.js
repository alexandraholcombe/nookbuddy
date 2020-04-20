#!/usr/bin/env node

const fs = require('fs');
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
      axios({
        url: process.env.REACT_APP_API,
        method: 'post',
        data: {
          query: GetCategories,
        },
      })
        .then((res) => {
          const result = res.data.data.categories;
          writeFile(categoriesPath, result);
        })
        .catch((err) => {
          console.log('Failed to get categories');
          console.log(err);
        });
    })
    .catch((err) => {
      console.log('Failed to insert categories');
      console.log(err);
    });
};

try {
  const categories = parseFile(categoriesPath);
  createCategories(categories);
} catch (error) {
  console.log('Failed to insert categories');
  console.log(error);
}
