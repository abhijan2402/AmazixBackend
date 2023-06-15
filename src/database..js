const { Client }=require('pg');
const connectionString = 'postgresql://chirag_first:root@localhost/recipeBook';

const client = new Client({
    connectionString,
});

module.exports=client;