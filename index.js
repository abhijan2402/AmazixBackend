const envVariables = require('dotenv');
envVariables.config()

const express = require("express");
const app = express();
const { createServer } = require("http");
const port = process.env.PORT || 3000
const { connectDB } = require("./src/database");



const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));


httpServer.listen(port, () => {
  console.log(`Server started at ${port}`);
});

app.get('/',(req,res)=>{
  res.send("dewqd")
})

