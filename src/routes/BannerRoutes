const express = require('express');
const Banner = express.Router();
const client = require('../database');
const { v4: uuidv4 } = require('uuid');


Banner.post("/Banner", (req, res) => {
    client.query("INSERT INTO Banner (id, Title,LearnMore,LearnMoreActive,LastUpdate,Image,Status,Role) VALUES ($1, $2 ,$3, $4 ,$5, $6, $7, $8)", [uuidv4(), req.body.Title, req.body.LearnMore, req.body.LearnMoreActive, req.body.LastUpdate, req.body.Image, req.body.Status, req.body.Role], (err, data) => {
        if (err) {
            res.send({ data: err, message: "Problem" })
        }
        else {
            res.send({ data: data.rows, message: "You data is inserted" })
        }
    })
});


module.exports = Banner;