const express=require('express');
const category=express.Router();
const { client } = require('../../database');

const {v4 : uuidv4} = require('uuid');
category.post("/category/add",(req,res)=>{
    const { name,imageurl,storeID }=req.body;
    const text = `
        INSERT INTO 
        caterory(id,name,imageurl,isActive,storeID,productListed) 
        VALUES ($1,$2,$3,$4,$5,$6) RETURNING *
    `;
    client.query(text,[uuidv4(),name,imageurl,true,storeID,0],(err, data) => {
        if (err) {
            res.send({data:err});
        } else {
            res.send({data:data.rows[0]})
        }
    })
});

category.post("/category/get/id",(req,res)=>{
    const {id}=req.body;
    const text = `Select * from caterory where storeID='${id}'`;
    client.query(text,(err, data) => {
        if (err) {
            res.send({data:err});
        } else {
            res.send({data:data.rows})
        }
    })
});

category.delete("/category/delete",(req,res)=>{
    const {id}=req.body;
    client.query(`DELETE FROM caterory WHERE id='${id}'`, (err, data) => {
        if(!err){
            res.status(200).send({data:"Data Deleted"})
        }
        else{
            res.status(401).send({data:err})
        }
    })
})

module.exports=category;