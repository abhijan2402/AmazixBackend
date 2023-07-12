const { Client } = require('pg');
require('dotenv').config();
const connectionString = process.env.CONNECTIONSTRING || "postgresql://postgres:123456@localhost/AmazixDb";
const client = new Client({
    connectionString,
});

module.exports = client;