const express=require('express');
const store=express.Router();

const {v4 : uuidv4} = require('uuid');
const { client } = require('../../database');

store.post("/store/add",(req,res)=>{
    const { ShopName,StoreCategory,GSTNum,StoreAddress,LatitudeCords,LongitudeCords,AccountNumber,IFSECode,BankName,Branch,imageUrl }=req.body;
    const text = `
        INSERT INTO 
        storedetail( 
            id,ShopName,StoreCategory,GSTNum,StoreAddress,LatitudeCords,LongitudeCords,AccountNumber,IFSECode,BankName,Branch,imageUrl,totalProducts,followers,rating,storevisits,productsview)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING *
        `;
    client.query(text,[uuidv4(),ShopName,StoreCategory,GSTNum,StoreAddress,LatitudeCords,LongitudeCords,AccountNumber,IFSECode,BankName,Branch,imageUrl,0,0,0,0,0],(err, data) => {
        if (err) {
            res.send({data:err});
        } else {
            res.send({data:data.rows[0]})
        }
    })
});

store.get("/store/get/id",(req,res)=>{
    const {id}=req.body;
    const text = `Select * from storedetail WHERE id='${id}'`;
    client.query(text,(err, data) => {
        if (err) {
            res.send({data:err});
        } else {
            res.send({data:data.rows})
        }
    })
});

store.delete("/store/delete",(req,res)=>{
    const {id}=req.body;
    client.query(`DELETE FROM storedetail WHERE id='${id}'`, (err, data) => {
        if(!err){
            res.status(200).send({data:"Data Deleted"})
        }
        else{
            res.status(401).send({data:err})
        }
    })
})

store.get("/store/get",(req,res)=>{
    client.query(`Select * FROM storedetail`, (err, data) => {
        if(!err){
            res.status(200).send({data:data.rows})
        }
        else{
            res.status(401).send({data:err})
        }
    })
})
module.exports=store;