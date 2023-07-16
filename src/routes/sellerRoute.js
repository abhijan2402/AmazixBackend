const express = require('express');
const seller = express.Router();
const client = require('../database');

seller.post("/seller", (req, res) => {
    const {
        uid,
        name,
        email,
        fcmToken,
        phone,
        storeid,
        profileStatus
    } = req.body;
    const arrayData = [...storeid];

    client.query("INSERT INTO sellers (id, name,email,fcmToken,phone,profileStatus,storeid) VALUES ($1, $2 ,$3, $4 ,$5,$6,$7)", [uid, name, email, fcmToken, phone,profileStatus,storeid], (err, data) => {
        if (err) {
            console.log(err);
            res.send({ data: err, message: "Problem" })
        }
        else {
            console.log(data);
            res.send({ data: '', message: "You data is inserted" })
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
            res.status(401).send(err)
        }
    })
})

seller.post("/seller/getSeller", (req, res) => {
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
