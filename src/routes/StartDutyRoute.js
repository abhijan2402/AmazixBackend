const express = require('express');
const StartDuty = express.Router();
const client = require('../database');
const { v4: uuidv4 } = require('uuid');


StartDuty.post("/StartDuty", (req, res) => {
    client.query("INSERT INTO StartDuty (id, logintime,deliveryboyid,deliveryboyselfie) VALUES ($1, $2 ,$3, $4 )", [uuidv4(), req.body.logintime, req.body.deliveryboyid, req.body.deliveryboyselfie], (err, data) => {
        if (err) {
            res.send({ data: err, message: "Problem" })
        }
        else {
            res.send({ data: data.rows, message: "You data is inserted" })
        }
    })
});


module.exports = StartDuty;