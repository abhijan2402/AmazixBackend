const express = require('express');
const { client } = require('../../database');
const DeleteTableData = express.Router();


DeleteTableData.delete("/delete", (req, res) => {
    const { id, tablename } = req.body;
    let finalQuery = `DELETE FROM  ${tablename} WHERE id = '${id}'`
    client.query(finalQuery, (err, data) => {
        if (err) {
            res.send({ data: err })
        }
        else {
            // res.send({ data: "Your Data is deleted" })
            res.status(200).send("Data Deleted")
        }
    })
})


module.exports = DeleteTableData;