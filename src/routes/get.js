const express = require('express');
const getTableData = express.Router();
const client = require('../database');


getTableData.get("/getById", (req, res) => {
    const { id, tablename } = req.body;
    let finalQuery = `SELECT * FROM  ${tablename} WHERE id = '${id}'`
    client.query(finalQuery, (err, data) => {
        if (err) {
            res.send({ data: err })
        }
        else {
            res.send({ data: data.rows, message: "Your Data is here" })
        }
    })
})


getTableData.get("/getAllData", (req, res) => {
    const { tablename } = req.body;
    let finalQuery = `SELECT * from  ${tablename}`;

    client.query(finalQuery, (err, data) => {
        if (err) {
            res.send({ data: err })
        }
        else {
            res.send({ data: data.rows, message: "Your Data is here" })
        }
    })
})


module.exports = getTableData;