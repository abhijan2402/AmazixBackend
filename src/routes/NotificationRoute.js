const express = require('express');
const Notification = express.Router();
const { v4: uuidv4 } = require('uuid');
const { client } = require('../database');


Notification.post("/notification", (req, res) => {
    client.query("INSERT INTO notification (id, shopname,notificationtitle,notificationtimeDate,isseen,senderid,receiverid,notificationtype) VALUES ($1, $2 ,$3, $4 ,$5, $6, $7,$8) RETURNING *",
        [uuidv4(), req.body.ShopName, req.body.NotificationTitle, req.body.NotificationTimeDate, req.body.isSeen, req.body.SenderId, req.body.ReceiverId, req.body.NotificationType], (err, data) => {
            if (err) {
                res.status(401).send({ data: err, message: "Problem" })
            }
            else {
                res.status(200).send({ message: "You data is deleted", data: data.rows })
            }
        })
});


Notification.get("/notificationByid", (req, res) => {
    const { id } = req.body;
    client.query(`SELECT * FROM notification where id='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send(data.rows)
        }
        else {
            res.status(401).send(err)
        }
    })
})



Notification.delete("/notification/deleteByid", (req, res) => {
    const { id } = req.body;
    client.query(`delete  FROM notification where id='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send({ message: "You data is deleted" })
        }
        else {
            res.status(401).send({ data: err, message: "Problem" })
        }
    })
})

module.exports = Notification;