const { Client } = require('pg');
require('dotenv').config();
const client = new Client({
    user:process.env.USERNAMEDB,
    password: process.env.PASSWORD,
    database: process.env.DBNAME,
    host: process.env.CONNECTIONSTRING,
    port: 5432,
});
console.log({
    user:process.env.USERNAMEDB,
    password: process.env.PASSWORD,
    database: process.env.DBNAME,
    host: process.env.CONNECTIONSTRING,
    port: 5432,
});

async function connectDB(){
    try {
        client.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
        });        
    } catch (error) {
        console.log(error,"Error");
    }
}

module.exports = {connectDB,client};