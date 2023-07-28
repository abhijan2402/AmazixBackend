const { Client } = require('pg');
require('dotenv').config();
console.log(process.env.USERNAMEDB)
console.log(process.env.PASSWORD)
console.log(process.env.DBNAME)
console.log(process.env.CONNECTIONSTRING)
const client = new Client({
    user:process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DBNAME,
    host: process.env.CONNECTIONSTRING,
    port: 5432,
});

async function connectDB(){
    // try {
    //     client.connect(function(err) {
    //         if (err) throw err;
    //         console.log("Connected!");
    //     });        
    // } catch (error) {
    //     console.log(error,"Error");
    // }
}

module.exports = {connectDB,client};