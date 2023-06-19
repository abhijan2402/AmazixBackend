const express=require('express');
const getOrders=express.Router();
const client=require("../../database");

getOrders.get("/getAllOrders",(req,res)=>{
    const {id}=req.body;
    client.query(`SELECT * FROM orders`, (err, data) => {
        if(!err){
            res.status(200).send(data.rows)
        }
        else{
            res.status(401).send(err)
        }
    })
});

getOrders.get("/getBySellerId",(req,res)=>{
    const {id}=req.body;
    client.query(`SELECT * FROM orders where storeid='${id}'`, (err, data) => {
        if(!err){
            res.status(200).send(data.rows)
        }
        else{
            res.status(401).send(err)
        }
    })
})
getOrders.get("/getByCustomerId",(req,res)=>{
    const {id}=req.body;
    client.query(`SELECT * FROM orders where customerid='${id}'`, (err, data) => {
        if(!err){
            res.status(200).send(data.rows)
        }
        else{
            res.status(401).send(err)
        }
    })
})
module.exports=getOrders;