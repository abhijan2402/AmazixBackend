const express=require('express');
const addNewChat=express.Router();
const { client } = require('../../database');
const {v4 : uuidv4} = require('uuid');
addNewChat.post("/chat",(req,res)=>{
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

addNewChat.post("/chat/message/add",(req,res)=>{
    const { roomid,message,messageAt,recieverid,senderid }=req.body;
    const text = `
        INSERT INTO 
        chatmessage(id,chatroomid,message,messagedate,recieverid,senderid) 
        VALUES ($1,$2,$3,$4,$5,$6) RETURNING *
    `;
    client.query(text,[uuidv4(),roomid,message,messageAt,recieverid,senderid],(err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data.rows[0])
        }
    })
})
module.exports=addNewChat;