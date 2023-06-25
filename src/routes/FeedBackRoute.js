const express = require('express');
const Feedback = express.Router();
const client = require('../database');
const { v4: uuidv4 } = require('uuid');

Feedback.post("/feedback", (req, res) => {
    console.log(req.body)
    client.query("INSERT INTO Feedback (id, Fmessage,frating,shopid,orderid) VALUES ($1, $2 ,$3, $4,$5 ) RETURNING *",
        [uuidv4(), req.body.Fmessage, req.body.frating, req.body.shopid, req.body.orderid,], (err, data) => {
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


Feedback.get("/getFeedbackById", (req, res) => {
    const { id } = req.body;
    client.query(`SELECT * FROM Feedback where id='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send(data.rows)
        }
        else {
            res.status(401).send(err)
        }
    })
})


Feedback.delete("/feedback/deleteByid", (req, res) => {
    const { id } = req.body;
    client.query(`delete  FROM Feedback where id='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send(data.rows)
        }
        else {
            res.status(401).send(err)
        }
    })
})


module.exports = Feedback;
