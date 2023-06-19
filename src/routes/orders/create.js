const express=require('express');
const addNewOrder=express.Router();
const client=require("../../database");
const {v4 : uuidv4} = require('uuid');
addNewOrder.post("/addOrder",(req,res)=>{
    const {
        storeID,
        customerID,
        orderDate,
        returnDate,
        customerAddress,
        orderStatus,
        totalAmount,
        totalItems,
        orderby,
        storeAddress,
        shopName,
        paymentStatus,
        paymentType,
        items
    }=req.body;
    const arrayData = [...items];
    const text = `
        INSERT INTO 
        orders(id,storeid,customerid,orderdate,returndate,customeraddress,orderstatus,totalamount,totalitems,orderby,storeaddress,shopname,paymentstatus,paymenttype,items) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *
    `;
    client.query(text,[uuidv4(),storeID,customerID,orderDate,returnDate,customerAddress,orderStatus,totalAmount,totalItems,orderby,storeAddress,shopName,paymentStatus,paymentType,arrayData],(err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data.rows[0])
        }
    })
});

module.exports=addNewOrder;