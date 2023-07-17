const express=require('express');
const addNewChat=express.Router();
const { client } = require('../../database');
const {v4 : uuidv4} = require('uuid');
addNewChat.post("/addNewChat",(req,res)=>{
    const { chatUsers }=req.body;
    const arrayData = [...chatUsers];
    const text = `
        INSERT INTO 
        chatlist(charroomid,chatusers) 
        VALUES ($1,$2) RETURNING *
    `;
    client.query(text,[uuidv4(),arrayData],(err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data.rows[0])
        }
    })
});

addNewChat.post("/addNewMessage",(req,res)=>{
    const { roomid,message,messageAt,sender,reciever }=req.body;
    const text = `
        INSERT INTO 
        chatmessage(id,chatroomid,message,messagedate,senderid,recieverid) 
        VALUES ($1,$2,$3,$4,$5,$6) RETURNING *
    `;
    client.query(text,[uuidv4(),roomid,message,messageAt,sender,reciever],(err, data) => {
        if (err) {
            console.log(err)
            res.send(err);
        } else {
            res.send(data.rows[0])
        }
    })
})
module.exports=addNewChat;