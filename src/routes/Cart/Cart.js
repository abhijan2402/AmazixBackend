const express=require('express');
const Cart=express.Router();
const { client } = require('../../database');

const {v4 : uuidv4} = require('uuid');
Cart.post("/Cart/add",(req,res)=>{
    const {productname,price,originalprice,storeid,itemcount,productimage,customentid,category,productid,storename}=req.body;
    const text = `
        INSERT INTO 
        cart(id,productname,price,originalprice,storeid,itemcount,productimage,customentid,category,productid,storename) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *
    `;
    client.query(text,[uuidv4(),productname,price,originalprice,storeid,itemcount,productimage,customentid,category,productid,storename],(err, data) => {
        if (err) {
            res.send({data:err});
        } else {
            res.send({data:data.rows[0]})
        }
    })
});

Cart.post("/Cart/get/id",(req,res)=>{
    const {id}=req.body;
    const text = `Select * from Cart where id='${id}'`;
    client.query(text,(err, data) => {
        if (err) {
            res.send({data:err});
        } else {
            res.send({data:data.rows})
        }
    })
});
Cart.post("/Cart/get/customentid",(req,res)=>{
    const {id}=req.body;
    const text = `Select * from Cart where customentid='${id}'`;
    client.query(text,(err, data) => {
        if (err) {
            res.send({data:err});
        } else {
            res.send({data:data.rows})
        }
    })
});


Cart.delete("/Cart/delete",(req,res)=>{
    const {id}=req.body;
    client.query(`DELETE FROM Cart WHERE id='${id}'`, (err, data) => {
        if(!err){
            res.status(200).send({data:"Data Deleted"})
        }
        else{
            res.status(401).send({data:err})
        }
    })
})
Cart.delete("/Cart/delete/customerId",(req,res)=>{
    const {id}=req.body;
    client.query(`DELETE FROM Cart WHERE customentid='${id}'`, (err, data) => {
        if(!err){
            res.status(200).send({data:"Data Deleted"})
        }
        else{
            res.status(401).send({data:err})
        }
    })
})

module.exports=Cart;