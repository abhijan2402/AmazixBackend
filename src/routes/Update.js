const express = require('express');
const updateDataInTable = express.Router();
const client = require('../database');
    
updateDataInTable.post("/update", (req, res) => {
    const {id,updateData,tablename}=req.body;

    let updatedFields=Object.entries(updateData);
    let queryStringUpdateFields='';
    if(updatedFields.length===1){
        queryStringUpdateFields=`${updatedFields[0][0]}='${updatedFields[0][1]}'`
    }
    else{
        for (let i = 0; i < updatedFields.length; i++) {
            if(i===updatedFields.length-1){
                queryStringUpdateFields=queryStringUpdateFields.concat(`${updatedFields[i][0]}='${updatedFields[i][1]}'`)
            }
            else{
                queryStringUpdateFields=queryStringUpdateFields.concat(`${updatedFields[i][0]}='${updatedFields[i][1]}',`)
            }
        }
    }
    let finalQuery=`UPDATE ${tablename} SET ${queryStringUpdateFields} WHERE id = '${id}'`
    client.query(finalQuery, (err, data) => {
        if (err) {
            res.send({ data: err })
        }
        else {
            res.send({ data: data.rows })
        }
    })
});

module.exports = updateDataInTable;