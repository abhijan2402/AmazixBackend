const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: "amezixDB",
    password: "Amezix2020",
    database: "amezix",
    host: "database-2.caaxplixixp3.ap-south-1.rds.amazonaws.com",
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