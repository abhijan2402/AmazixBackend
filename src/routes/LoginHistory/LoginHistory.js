const express=require('express');
const Loginhistory=express.Router();
const client=require("../../database");
const {v4 : uuidv4} = require('uuid');

Loginhistory.post("/Loginhistory", (req, res) => {
    client.query("INSERT INTO  loginhistory(id,logintime,deliveryboyid ) VALUES ($1, $2 ,$3)", [uuidv4(), req.body.logintime, req.body.deliveryboyid], (err, data) => {
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
module.exports = Loginhistory;