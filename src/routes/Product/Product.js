const express=require('express');
const product=express.Router();
const client=require("../../database");

const {v4 : uuidv4} = require('uuid');
product.post("/product/add",(req,res)=>{
    const { name,categoryName,price,discountedPrice,quantity,produtType,deiails,variants,paymentMode,tags,imageUrls,storeID}=req.body;
    const text = `
        INSERT INTO 
        product(id,name,categoryName,price,discountedPrice,quantity,produtType,deiails,variants,paymentMode,tags,imageUrls,storeID) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *
    `;
    client.query(text,[uuidv4(),name,categoryName,price,discountedPrice,quantity,[...produtType],deiails,[...variants],[...paymentMode],[...tags],[...imageUrls],storeID],(err, data) => {
        if (err) {
            res.send({data:err});
        } else {
            res.send({data:data.rows[0]})
        }
    })
});

product.get("/product/get",(req,res)=>{
    const text = `Select * from product`;
    client.query(text,(err, data) => {
        if (err) {
            res.send({data:err});
        } else {
            res.send({data:data.rows})
        }
    })
});

product.post("/product/get/id",(req,res)=>{
    const {id}=req.body;
    const text = `Select * from product where id='${id}'`;
    client.query(text,(err, data) => {
        if (err) {
            res.send({data:err});
        } else {
            res.send({data:data.rows})
        }
    })
});
product.post("/product/get/storeid",(req,res)=>{
    const {storeid}=req.body;
    const text = `Select * from product where storeID='${storeid}'`;
    client.query(text,(err, data) => {
        if (err) {
            res.send({data:err});
        } else {
            res.send({data:data.rows})
        }
    })
});


product.delete("/product/delete",(req,res)=>{
    const {id}=req.body;
    client.query(`DELETE FROM product WHERE id='${id}'`, (err, data) => {
        if(!err){
            res.status(200).send({data:"Data Deleted"})
        }
        else{
            res.status(401).send({data:err})
        }
    })
})

module.exports=product;