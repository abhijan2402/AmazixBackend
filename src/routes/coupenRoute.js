const express = require('express');
const Coupen = express.Router();
const client = require('../database');


Coupen.post("/coupen/perCoupen", (req, res) => {
    client.query("INSERT INTO percoupon (id, discountAmount,minOrderAmount,usesPerCustomer,startDate,endDate,validPaymentType,CouponCode,isActive,storeId) VALUES ($1, $2 ,$3, $4 ,$5, $6, $7, $8, $9, $10)", [req.body.id, req.body.discountAmount, req.body.minOrderAmount, req.body.usesPerCustomer, req.body.startDate, req.body.endDate, req.body.validPaymentType, req.body.CouponCode, req.body.isActive, req.body.storeId,], (err, data) => {
        if (err) {
            console.log("hi");
            res.send({ data: err, message: "Problem" })
        }
        else {
            console.log("hello");
            res.send({ data: data.rows, message: "You data is inserted" })
        }
    })
});


Coupen.post("/coupen/BuyGet", (req, res) => {
    client.query("INSERT INTO buyget (id, buyVal,getVal,minOrderAmount,usesPerCustomer,startDate,endDate,validPaymentType,CouponCode,isActive,storeId) VALUES ($1, $2 ,$3, $4 ,$5, $6, $7, $8, $9, $10,$11)", [req.body.id, req.body.buyVal, req.body.getVal, req.body.minOrderAmount, req.body.usesPerCustomer, req.body.startDate, req.body.endDate, req.body.validPaymentType, req.body.CouponCode, req.body.isActive, req.body.storeId,], (err, data) => {
        if (err) {
            console.log("hi");
            res.send({ data: err, message: "Problem" })
        }
        else {
            console.log("hello");
            res.send({ data: data.rows, message: "You data is inserted" })
        }
    })
});


Coupen.post("/coupen/FlatCoupon", (req, res) => {
    client.query("INSERT INTO flatcoupon (id, discountAmount,minOrderAmount,usesPerCustomer,startDate,endDate,validPaymentType,CouponCode,isActive,storeId) VALUES ($1, $2 ,$3, $4 ,$5, $6, $7, $8, $9, $10)", [req.body.id, req.body.discountAmount, req.body.minOrderAmount, req.body.usesPerCustomer, req.body.startDate, req.body.endDate, req.body.validPaymentType, req.body.CouponCode, req.body.isActive, req.body.storeId,], (err, data) => {
        if (err) {
            console.log("hi");
            res.send({ data: err, message: "Problem" })
        }
        else {
            console.log("hello");
            res.send({ data: data.rows, message: "You data is inserted" })
        }
    })
});



Coupen.delete(`/coupen/perCoupen/:id`, (req, res) => {
    client.query("DELETE FROM PerCoupon WHERE ID = $1", [req.params.id], (err, data) => {
        if (err) {
            console.log("hi");
            res.send({ data: err, message: "Problem" })
        }
        else {
            console.log("hello");
            res.send({ data: data.rows, message: "You data is deleted" })
        }
    })
})


Coupen.delete(`/coupen/BuyGet/:id`, (req, res) => {
    client.query("DELETE FROM BuyGet WHERE ID = $1", [req.params.id], (err, data) => {
        if (err) {
            console.log("hi");
            res.send({ data: err, message: "Problem" })
        }
        else {
            console.log("hello");
            res.send({ data: data.rows, message: "You data is deleted" })
        }
    })
})

Coupen.delete(`/coupen/FlatCoupon/:id`, (req, res) => {
    client.query("DELETE FROM FlatCoupon WHERE ID = $1", [req.params.id], (err, data) => {
        if (err) {
            console.log("hi");
            res.send({ data: err, message: "Problem" })
        }
        else {
            console.log("hello");
            res.send({ data: data.rows, message: "You data is deleted" })
        }
    })
})
module.exports = Coupen;