const express = require("express");
const app = express();
const { createServer } = require("http");
const client = require("./src/database");
const getAllUsers = require("./src/routes/addAllUsers");
const Coupen = require("./src/routes/coupenRoute");
const getAllChats = require("./src/routes/chat/getChats");
const getOrders = require("./src/routes/orders/getOrders");
const deleteChats = require("./src/routes/chat/delete");
const deleteOrder = require("./src/routes/orders/delete");
const addNewOrder = require("./src/routes/orders/create");
const addNewChat = require("./src/routes/chat/create");
const seller = require("./src/routes/sellerroute");
const Feedback = require("./src/routes/FeedBackRoute");
const Wallet = require("./src/routes/walletRoute");
const Notification = require("./src/routes/NotificationRoute");
const port = process.env.PORT || 3000

const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));


httpServer.listen(port, () => {
  console.log(`Server started at ${port}`)
  client.connect()
});

app.use(getAllUsers);
app.use(seller)
//Coupen
app.use(Coupen);


//Feedback
app.use(Feedback)


//wallet
app.use(Wallet)

//notif
app.use(Notification)

//chats
app.use(getAllChats);
app.use(deleteChats);
app.use(addNewChat);

//order
app.use(getOrders);
app.use(deleteOrder);
app.use(addNewOrder);