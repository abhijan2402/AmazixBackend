const express=require('express');
const deleteChats=express.Router();
const client=require("../../database");

deleteChats.delete("/deleteChat",(req,res)=>{
    const {id}=req.body;
    client.query(`DELETE FROM chatlist WHERE charroomid='${id}'`, (err, data) => {
        if(!err){
            res.status(200).send("Data Deleted")
        }
        else{
            console.log(err);
            res.status(401).send(err)
        }
    })
})
deleteChats.delete("/deleteChatMessages",(req,res)=>{
    const {id}=req.body;
    client.query(`DELETE FROM chatmessage WHERE id='${id}'`, (err, data) => {
        if(!err){
            res.status(200).send("Data Deleted")
        }
        else{
            console.log(err);
            res.status(401).send(err)
        }
    })
})

module.exports=deleteChats;