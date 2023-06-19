const express = require('express');
const seller = express.Router();
const client = require('../database');
const { v4: uuidv4 } = require('uuid');

seller.post("/seller", (req, res) => {
    const {
        name,
        email,
        fcmToken,
        phone,
        storeid,
    } = req.body;
    const arrayData = [...storeid];

    client.query("INSERT INTO sellers (id, name,email,fcmToken,storeid) VALUES ($1, $2 ,$3, $4 ,$5)", [uuidv4(), name, email, fcmToken, phone, arrayData], (err, data) => {
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


seller.delete("/seller/deleteAccount", (req, res) => {
    const { id } = req.body;
    client.query(`DELETE FROM sellers WHERE id='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send("Data Deleted")
        }
        else {
            console.log(err);
            res.status(401).send(err)
        }
    })
})

seller.get("/seller/getSeller", (req, res) => {
    const { id } = req.body;
    client.query(`SELECT * FROM sellers  where id='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send(data.rows)
        }
        else {
            res.status(401).send(err)
        }
    })
})
module.exports = seller;
