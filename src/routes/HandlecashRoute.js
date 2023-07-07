const express = require('express');
const Handlecash = express.Router();
const client = require('../database');
const { v4: uuidv4 } = require('uuid');

Handlecash.post("/Handlecash", (req, res) => {
    console.log(req.body)
    client.query("INSERT INTO handlingcash(id,deliveryboyid,walletamount,orderid ) VALUES ($1, $2 ,$3,$4)", [uuidv4(), req.body.deliveryboyid, req.body.walletamount, req.body.orderid], (err, data) => {
        if (err) {
            console.log("hi");
            res.send({ data: err, message: "Problem" })
        }
        else {
            console.log("hello");
            res.send({ data: data.rows, message: "You data is inserted" })
        }
    })
});





module.exports = Handlecash;
