#!/usr/bin/env node

const axios = require('axios'); // eslint-disable-line import/no-extraneous-dependencies
const { itemsSourcesPath, sourcesPath } = require('./constants');
const { parseFile, writeFile } = require('./utils');
require('dotenv').config(); // eslint-disable-line import/no-extraneous-dependencies

const CreateItemsSources = `
  mutation CreateItemsSources($objects: [items_sources_insert_input!]!) {
    insert_items_sources(objects: $objects) {
      returning {
        id
        itemId
        sourceId
      }
    }
  }
`;

const GetItemsSources = `
query GetSources {
  sources {
    id
    itemId
    sourceId
  }
}
`;

const updateLocalItemsSources = () => {
  axios({
    url: process.env.REACT_APP_API,
    method: 'post',
    data: {
      query: GetItemsSources,
    },
  })
    .then((res) => {
      const result = res.data.data.items_sources;
      writeFile(itemsSourcesPath, result);
    })
    .catch((err) => {
      console.log('Failed to get sources');
      console.log(err);
    });
};

const createSources = (objects) => {
  axios({
    url: process.env.REACT_APP_API,
    method: 'post',
    data: {
      query: CreateItemsSources,
      variables: { objects },
    },
  })
    .then(() => {
      updateLocalItemsSources();
    })
    .catch((err) => {
      console.log('Failed to insert sources');
      console.log(err);
    });
};

try {
  const itemsSources = parseFile(sourcesPath);
  createSources(itemsSources);
} catch (error) {
  console.log('Failed to insert sources');
  console.log(error);
}
