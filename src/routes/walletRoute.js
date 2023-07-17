const express = require('express');
const Wallet = express.Router();
const { v4: uuidv4 } = require('uuid');
const { client } = require('../database');


Wallet.post("/wallet", (req, res) => {
    client.query("INSERT INTO wallet (id, TransactionType,Amount,SenderName,SenderId,ReceiverId,ReceiverName) VALUES ($1, $2 ,$3, $4 ,$5, $6, $7) RETURNING *",
        [uuidv4(), req.body.TransactionType, req.body.Amount, req.body.SenderName, req.body.SenderId, req.body.ReceiverId, req.body.ReceiverName], (err, data) => {
            if (err) {
                res.status(401).send(err)
            }
            else {
                console.log("hello");
                res.status(200).send(data.rows)
            }
        })
});



Wallet.get("/walletById", (req, res) => {
    const { id } = req.body;
    client.query(`SELECT * FROM wallet where id='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send(data.rows)
        }
        else {
            res.status(401).send(err)
        }
    })
})


Wallet.delete("/wallet/deleteByid", (req, res) => {
    const { id } = req.body;
    client.query(`delete  FROM wallet where id='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send({ message: "You data is deleted" })
        }
        else {
            res.status(401).send({ data: err, message: "Problem" })
        }
    })
})


module.exports = Wallet;