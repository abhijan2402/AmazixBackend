const express = require('express');
const DeleteTableData = express.Router();
const client = require('../database');


DeleteTableData.delete("/delete", (req, res) => {
    const { id, tablename } = req.body;
    let finalQuery = `DELETE FROM  ${tablename} WHERE id = '${id}'`
    client.query(finalQuery, (err, data) => {
        if (err) {
            res.send({ data: err })
        }
        else {
            res.send({ data: data.rows, message: "Your Data is deleted" })
        }
    })
})


module.exports = DeleteTableData;