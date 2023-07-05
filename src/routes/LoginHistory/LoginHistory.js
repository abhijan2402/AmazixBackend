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
Loginhistory.get("/Loginhistory/get",(req,res)=>{
    const { deliveryboyid } = req.body;
    client.query(`SELECT * FROM loginhistory where deliveryboyid='${deliveryboyid}'`, (err, data) => {
        if (!err) {
            res.status(200).send(data.rows)
        }
        else {
            res.status(401).send(err)
        }
    })
});
module.exports = Loginhistory;