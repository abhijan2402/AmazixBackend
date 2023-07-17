const express=require('express');
const getAllChats=express.Router();
const { client } = require('../../database');

getAllChats.post("/getCharListById",(req,res)=>{
    const {id}=req.body;
    client.query(`SELECT * FROM chatlist where charroomid='${id}'`, (err, data) => {
        if(!err){
            res.status(200).send(data.rows)
        }
        else{
            res.status(401).send(err)
        }
    })
});

getAllChats.post("/getAllChatMessages",(req,res)=>{
    const {id}=req.body;
    client.query(`SELECT * FROM chatmessage where chatroomid='${id}'`, (err, data) => {
        if(!err){
            res.status(200).send(data.rows)
        }
        else{
            res.status(401).send(err)
        }
    })
})

module.exports=getAllChats;