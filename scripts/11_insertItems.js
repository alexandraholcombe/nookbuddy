#!/usr/bin/env node

const axios = require('axios'); // eslint-disable-line import/no-extraneous-dependencies
const { itemsPath } = require('./constants');
const { parseFile } = require('./utils');
require('dotenv').config(); // eslint-disable-line import/no-extraneous-dependencies

const CreateItems = `
  mutation CreateItems ($objects: [items_insert_input!]!){
    insert_items(objects: $objects)) {
      returning{
        id
        name
      }
    }
  }
`;

const createItems = (objects) => {
  axios({
    url: process.env.REACT_APP_API,
    method: 'post',
    data: {
      query: CreateItems,
      variables: { objects },
    },
  })
    .then((res) => console.log(res.data.errors))
    .catch((err) => {
      console.log('Failed to insert categories');
      console.log(err);
    });
};

try {
  const items = parseFile(itemsPath);
  createItems(items);
} catch (error) {
  console.log('Failed to insert items');
  console.log(error);
}
