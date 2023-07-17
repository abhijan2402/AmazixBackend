const express=require('express');
const Customer=express.Router();
const { client } = require('../../database');

const {v4 : uuidv4} = require('uuid');

Customer.post("/Customer/add",(req,res)=>{
    const { id,name,email,phone,address,city,state,profilestatus}=req.body;
    const text = `
        INSERT INTO 
        Customer(id,name,email,phone,address,city,state,profilestatus) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *
    `;
    client.query(text,[id,name,email,phone,address,city,state,profilestatus],(err, data) => {
        if (err) {
            res.send({data:err});
        } else {
            res.send({data:data.rows[0]})
        }
    })
});

Customer.post("/Customer/get/id",(req,res)=>{
    const {id}=req.body;
    const text = `Select * from customer where id='${id}'`;
    client.query(text,(err, data) => {
        if (err) {
            res.send({data:err});
        } else {
            res.send({data:data.rows})
        }
    })
});

Customer.delete("/Customer/delete",(req,res)=>{
    const {id}=req.body;
    client.query(`DELETE FROM Customer WHERE id='${id}'`, (err, data) => {
        if(!err){
            res.status(200).send({data:"Data Deleted"})
        }
        else{
            res.status(401).send({data:err})
        }
    })
})

module.exports=Customer;