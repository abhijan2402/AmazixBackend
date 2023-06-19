const { Client } = require('pg');
const connectionString = 'postgresql://postgres:123456@localhost/AmazixDb';

const client = new Client({
    connectionString,
});

module.exports = client;