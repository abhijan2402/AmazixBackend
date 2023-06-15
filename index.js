const express=require("express");
const app=express();
const port=3000
const { createServer } = require("http");
const client = require("./src/database.");
const getAllUsers = require("./src/routes/addAllUsers");


const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));


httpServer.listen(port,()=>{
  console.log("Server started")
  client.connect()
});

app.use(getAllUsers);