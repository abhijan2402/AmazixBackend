const express = require('express');
const StartDuty = express.Router();
const { v4: uuidv4 } = require('uuid');
const { client } = require('../database');


StartDuty.post("/StartDuty", (req, res) => {
    client.query("INSERT INTO StartDuty (id, logintime,deliveryboyid,deliveryboyselfie,logouttime) VALUES ($1, $2 ,$3, $4,$5 )", [req.body.id, req.body.logintime, req.body.deliveryboyid, req.body.deliveryboyselfie, req.body.logouttime], (err, data) => {
        if (err) {
            res.send({ data: err, message: "Problem" })
        }
        else {
            res.send({ data: data.rows, message: "You data is inserted" })
        }
    })
});


module.exports = StartDuty;