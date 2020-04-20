#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const axios = require('axios'); // eslint-disable-line import/no-extraneous-dependencies
require('dotenv').config(); // eslint-disable-line import/no-extraneous-dependencies

const categoriesPath = path.join(__dirname, '..', 'data', 'categories.json');

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

const createCategories = (objects) => {
  axios({
    url: process.env.REACT_APP_API,
    method: 'post',
    data: {
      query: CreateCategories,
      variables: { objects },
    },
  }).then((result) => {
    console.log(result.data);
  });
};

const categories = JSON.parse(fs.readFileSync(categoriesPath));

createCategories(categories);
