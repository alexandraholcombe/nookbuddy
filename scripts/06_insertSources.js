#!/usr/bin/env node

const axios = require('axios'); // eslint-disable-line import/no-extraneous-dependencies
const { sourcesPath } = require('./constants');
const { parseFile, writeFile } = require('./utils');
require('dotenv').config(); // eslint-disable-line import/no-extraneous-dependencies

const CreateSources = `
  mutation CreateSources($objects: [sources_insert_input!]!) {
    insert_sources(objects: $objects) {
      returning {
        id
        name
      }
    }
  }
`;

const GetSources = `
query GetSources {
  sources {
    id
    name
  }
}
`;

// Oof
const createsources = (objects) => {
  axios({
    url: process.env.REACT_APP_API,
    method: 'post',
    data: {
      query: CreateSources,
      variables: { objects },
    },
  })
    .then(() => {
      axios({
        url: process.env.REACT_APP_API,
        method: 'post',
        data: {
          query: GetSources,
        },
      })
        .then((res) => {
          const result = res.data.data.sources;
          writeFile(sourcesPath, result);
        })
        .catch((err) => {
          console.log('Failed to get sources');
          console.log(err);
        });
    })
    .catch((err) => {
      console.log('Failed to insert sources');
      console.log(err);
    });
};

try {
  const sources = parseFile(sourcesPath);
  createsources(sources);
} catch (error) {
  console.log('Failed to insert sources');
  console.log(error);
}
