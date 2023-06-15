const express=require("express");
const app=express();
const { createServer } = require("http");
const client = require("./src/database.");
const getAllUsers = require("./src/routes/addAllUsers");

const port=process.env.PORT || 3000

const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));


httpServer.listen(port,()=>{
  console.log(`Server started at ${port}`)
  client.connect()
});

app.use(getAllUsers);