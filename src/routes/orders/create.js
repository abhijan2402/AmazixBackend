const express=require('express');
const addNewOrder=express.Router();
const { client } = require('../../database');
const {v4 : uuidv4} = require('uuid');
addNewOrder.post("/order/add",(req,res)=>{
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
        items,
        customerbehaviour,
        customerlocation,
        customercontact,
        customerlandmark,
        otp,
        expectedDeliveryTime,
        expectedDistance
    }=req.body;
    const arrayData = [...items];
    const text = `
        INSERT INTO 
        orders(id,storeid,customerid,orderdate,returndate,customeraddress,orderstatus,totalamount,totalitems,orderby,storeaddress,shopname,paymentstatus,paymenttype,items,customerbehaviour,customerlocation,customercontact,customerlandmark,otp,expectedDeliveryTime,expectedDistance) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22) RETURNING *
    `;
    client.query(text,[uuidv4(),storeID,customerID,orderDate,returnDate,customerAddress,orderStatus,totalAmount,totalItems,orderby,storeAddress,shopName,paymentStatus,paymentType,arrayData,customerbehaviour,customerlocation,customercontact,customerlandmark,otp,expectedDeliveryTime,expectedDistance],(err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data.rows[0])
        }
    })
});

addNewOrder.post('/order/exchange_return/add',(req,res)=>{
    const { imageUrl,storeId,customerid,orderid,statustype,reason,response }=req.body;
    const text = `
        INSERT INTO 
        OrderreturnExcange(id,imageUrl,storeId,customerid,orderid,statustype,reason,response) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *
    `;
    client.query(text,[uuidv4(),imageUrl,storeId,customerid,orderid,statustype,reason,response],(err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data.rows[0])
        }
    })
});

module.exports=addNewOrder;