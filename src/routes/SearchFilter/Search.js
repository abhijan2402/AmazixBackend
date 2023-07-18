const express = require('express');
const { client } = require('../../database');
const searchRoute = express.Router();


searchRoute.post("/search/product", (req, res) => {
    const { tag } = req.body;
    let searchValue=tag;
    let finalQuery = `SELECT * FROM product WHERE $1 = ANY(tags)`
    client.query(finalQuery,[searchValue], (err, data) => {
        if (err) {
            console.log(err);
            res.send({ data: err })
        }
        else {
            res.send({ data: data.rows, message: "Your Data is here" })
        }
    })
})

module.exports = searchRoute;