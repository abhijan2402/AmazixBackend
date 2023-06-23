const express=require('express');
const category=express.Router();
const client=require("../../database");

const {v4 : uuidv4} = require('uuid');
category.post("/category/add",(req,res)=>{
    const { name,imageurl }=req.body;
    const text = `
        INSERT INTO 
        caterory(id,name,imageurl) 
        VALUES ($1,$2,$3) RETURNING *
    `;
    client.query(text,[uuidv4(),name,imageurl],(err, data) => {
        if (err) {
            res.send({data:err});
        } else {
            res.send({data:data.rows[0]})
        }
    })
});

category.get("/category/get",(req,res)=>{
    const text = `Select * from caterory`;
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