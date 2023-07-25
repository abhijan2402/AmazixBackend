const envVariables = require('dotenv');
envVariables.config()

const express = require("express");
const app = express();
const { createServer } = require("http");
const port = process.env.PORT || 3000
const { connectDB,client } = require("./src/database");




const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));


httpServer.listen(port, () => {
  console.log(`Server started at ${port}`);
  connectDB()
});


app.get('/',(req,res)=>{
  res.send("BI")
})
app.get("/store/get",(req,res)=>{
  client.query(`Select * FROM storedetail`, (err, data) => {
      if(!err){
          res.status(200).send({data:data.rows})
      }
      else{
          res.status(401).send({data:err})
      }
  })
})