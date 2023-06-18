const express=require('express');
const getAllUsers=express.Router();
const client = require('../database.');

getAllUsers.get("/getUsers",(req,res)=>{
    client.query(`SELECT * FROM sellers`, (err, data) => {
        if(err){
            res.send({data:"Something went wrong!!"})
        }
        else{
            res.send({data:data.rows})
        }
    })
});

module.exports=getAllUsers;