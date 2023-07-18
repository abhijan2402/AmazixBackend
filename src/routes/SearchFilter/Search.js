const express = require('express');
const { client } = require('../../database');
const searchRoute = express.Router();


searchRoute.post("/search/product", (req, res) => {
    const { tag,storeId } = req.body;
    const searchString = tag;
    const query = {
        text: 'SELECT * FROM product WHERE tags::text ILIKE ANY($1) and storeid=$2',
        values: [['%' + searchString + '%'],storeId],
    };

    client.query(query)
    .then((data) => {
        res.send({ data: data.rows })
    })
    .catch((error) => {
        res.send({ data: error })
    })
})

searchRoute.post("/search/store", (req, res) => {
    const { storename } = req.body;
    const query = {
        text: 'SELECT * FROM storedetail WHERE shopname ILIKE $1',
        values: [`%${storename}%`],
    };
    client.query(query)
    .then((data) => {
        res.send({ data: data.rows })
    })
    .catch((error) => {
        res.send({ data: error })
    })
})

module.exports = searchRoute;