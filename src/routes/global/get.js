const express = require('express');
const client = require('../../database');
const getTableData = express.Router();


getTableData.post("/getById", (req, res) => {
    const { tableVal, tablename, tablefield } = req.body;
    let finalQuery = `SELECT * FROM  ${tablename} WHERE ${tablefield} = '${tableVal}'`
    client.query(finalQuery, (err, data) => {
        if (err) {
            res.send({ data: err })
        }
        else {
            res.send({ data: data.rows, message: "Your Data is here" })
        }
    })
})


getTableData.post("/getAllData", (req, res) => {
    const { tablename } = req.body;
    let finalQuery = `SELECT * from  ${tablename}`;

    client.query(finalQuery, (err, data) => {
        if (err) {
            console.log(err);
            res.send({ data: err })
        }
        else {
            console.log(data);
            res.send({ data: data.rows, message: "Your Data is here" })
        }
    })
})


module.exports = getTableData;