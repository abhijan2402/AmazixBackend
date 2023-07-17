const express = require('express');
const Address = express.Router();
const { v4: uuidv4 } = require('uuid');
const { client } = require('../database');


Address.post("/UserAddress", (req, res) => {
    client.query("INSERT INTO userAddress (id, AddressType,Address,LatCords,LongCords,UserId) VALUES ($1, $2 ,$3, $4 ,$5, $6)", [uuidv4(), req.body.AddressType, req.body.Address, req.body.LatCords, req.body.LongCords, req.body.UserId], (err, data) => {
        if (err) {
            res.send({ data: err, message: "Problem" })
        }
        else {
            res.send({ data: data.rows, message: "You data is inserted" })
        }
    })
});


module.exports = Address;