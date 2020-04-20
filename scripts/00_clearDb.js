const { Client } = require('pg'); // eslint-disable-line import/no-extraneous-dependencies
const { apiUrl } = require('./constants');

const client = new Client({
  connectionString: apiUrl,
  ssl: true,
});

client.connect();

client.query('TRUNCATE TABLE categories;', (err, res) => {
  if (err) throw err;
  console.log('res', res);
  client.end();
});
