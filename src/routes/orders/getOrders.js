const express = require('express');
const getOrders = express.Router();
const { client } = require('../../database');

getOrders.get("/order/get", (req, res) => {
    client.query(`SELECT * FROM orders`, (err, data) => {
        if (err) {
            res.status(401).send({ data: err });
        } else {
            res.status(200).send({ data: data.rows })
        }
    })
});

getOrders.post("/order/storeId", (req, res) => {
    const { id } = req.body;
    client.query(`SELECT * FROM orders where storeid='${id}'`, (err, data) => {
        if (err) {
            res.status(401).send({ data: err });
        } else {
            res.status(200).send({ data: data.rows })
        }
    })
})
getOrders.post("/order/customerId", (req, res) => {
    const { id } = req.body;
    client.query(`SELECT * FROM orders where customerid='${id}'`, (err, data) => {
        if (err) {
            res.status(401).send({ data: err });
        } else {
            res.status(200).send({ data: data.rows })
        }
    })
})
getOrders.post("/order/deliveryId", (req, res) => {
    const { id } = req.body;
    client.query(`SELECT * FROM orders where deliveryboyId='${id}'`, (err, data) => {
        if (err) {
            res.status(401).send({ data: err });
        } else {
            res.status(200).send({ data: data.rows })
        }
    })
})
module.exports = getOrders;