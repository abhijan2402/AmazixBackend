const express = require('express');
const DeliveryRegis = express.Router();
const client = require('../database');
const { v4: uuidv4 } = require('uuid');


DeliveryRegis.post("/DeliveryRegis", (req, res) => {
    client.query("INSERT INTO DeliveryRegister (id, name,email,fcmToken,phone,DeliveryBoyId,AadharFront,AadharBack,PanFront,PanBack,DrivingrFront,DrivingBack,BankName,AccountNumber,IFSECode,Address,SelfieUrl) VALUES ($1, $2 ,$3, $4 ,$5, $6, $7 ,$8, $9, $10, $11, $12, $13, $14, $15, $16,$17)", [uuidv4(), req.body.name, req.body.email, req.body.fcmToken, req.body.phone, req.body.DeliveryBoyId, req.body.AadharFront, req.body.AadharBack, req.body.PanFront, req.body.PanBack, req.body.DrivingrFront, req.body.DrivingBack, req.body.BankName, req.body.AccountNumber, req.body.IFSECode, req.body.Address, req.body.SelfieUrl], (err, data) => {
        if (err) {
            res.send({ data: err, message: "Problem" })
        }
        else {
            res.send({ data: data.rows, message: "You data is inserted" })
        }
    })
});


module.exports = DeliveryRegis;