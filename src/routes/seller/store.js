const express=require('express');
const store=express.Router();
const client=require("../../database");

const {v4 : uuidv4} = require('uuid');
store.post("/store/add",(req,res)=>{
    const { ShopName,StoreCategory,GSTNum,StoreAddress,LatitudeCords,LongitudeCords,AccountNumber,IFSECode,BankName,Branch }=req.body;
    const text = `
        INSERT INTO 
        storedetail( 
            id,ShopName,StoreCategory,GSTNum,StoreAddress,LatitudeCords,LongitudeCords,AccountNumber,IFSECode,BankName,Branch)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *
        `;
    client.query(text,[uuidv4(),ShopName,StoreCategory,GSTNum,StoreAddress,LatitudeCords,LongitudeCords,AccountNumber,IFSECode,BankName,Branch],(err, data) => {
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

module.exports=store;