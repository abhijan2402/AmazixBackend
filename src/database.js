const { Client } = require('pg');
require('dotenv').config();
const connectionString = `postgresql://chirag_first:root@localhost/AmazixDb`;

const client = new Client({
    connectionString,
});

module.exports = client;