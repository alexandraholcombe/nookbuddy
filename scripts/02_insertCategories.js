#!/usr/bin/env node

const fs = require('fs');
const axios = require('axios'); // eslint-disable-line import/no-extraneous-dependencies
const { categoriesPath } = require('./constants');
const { writeFile } = require('./utils');
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

const createCategories = (objects) => {
  axios({
    url: process.env.REACT_APP_API,
    method: 'post',
    data: {
      query: CreateCategories,
      variables: { objects },
    },
  }).then(() => {
    axios({
      url: process.env.REACT_APP_API,
      method: 'post',
      data: {
        query: GetCategories,
      },
    }).then((res) => {
      const result = res.data.data.categories;
      writeFile(categoriesPath, result);
    });
  });
};

const categories = JSON.parse(fs.readFileSync(categoriesPath));

createCategories(categories);
