const express=require('express');
const deleteOrder=express.Router();
const client=require("../../database");

deleteOrder.delete("/deleteChat",(req,res)=>{
    const {id}=req.body;
    client.query(`DELETE FROM orders WHERE id='${id}'`, (err, data) => {
        if(!err){
            res.status(200).send("Data Deleted")
        }
        else{
            console.log(err);
            res.status(401).send(err)
        }
    })
})
module.exports=deleteOrder;