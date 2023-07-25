const envVariables = require('dotenv');
envVariables.config()

const express = require("express");
const app = express();
const { createServer } = require("http");
const port = process.env.PORT || 3000
const { connectDB } = require("./src/database");

const Coupen = require("./src/routes/coupenRoute");
const getAllChats = require("./src/routes/chat/getChats");
const getOrders = require("./src/routes/orders/getOrders");
const deleteChats = require("./src/routes/chat/delete");
const deleteOrder = require("./src/routes/orders/delete");
const addNewOrder = require("./src/routes/orders/create");
const addNewChat = require("./src/routes/chat/create");
const Feedback = require("./src/routes/FeedBackRoute");
const Wallet = require("./src/routes/walletRoute");
const Notification = require("./src/routes/NotificationRoute");

const category = require("./src/routes/Category/Category");
const product = require("./src/routes/Product/Product");
const updateDataInTable = require("./src/routes/global/Update");
const getTableData = require("./src/routes/global/get");
const DeleteTableData = require("./src/routes/global/Delete");
const store = require("./src/routes/seller/store");
const Banner = require("./src/routes/BannerRoutes");
const Loginhistory = require("./src/routes/LoginHistory/LoginHistory");
const Address = require("./src/routes/AddressRoute");
const Customer = require("./src/routes/Customer/Customer");
const Handlecash = require("./src/routes/HandlecashRoute");
const Cart = require("./src/routes/Cart/Cart");
const DeliveryRegis = require("./src/routes/DeliveryRegisteration");
const StartDuty = require("./src/routes/StartDutyRoute");
const searchRoute = require('./src/routes/SearchFilter/Search');
const seller = require('./src/routes/sellerroute');
const wishlistRoute = require('./src/routes/wishlist/Wishlist');



const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));


httpServer.listen(port, () => {
  console.log(`Server started at ${port}`);
  connectDB()
});


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

//update
app.use(updateDataInTable)

//cateory
app.use(category)

//store
app.use(store);

//product
app.use(product)

//Banner
app.use(Banner)

//Address
app.use(Address)

//get
app.use(getTableData)

//delete
app.use(DeleteTableData)

//loginhistory
app.use(Loginhistory)

//customer
app.use(Customer)

app.use(Handlecash)

//cart
app.use(Cart);

//Handlecash
app.use(Handlecash)

//DeliveryRegis
app.use(DeliveryRegis)

//startDuty
app.use(StartDuty)

//search and filter
app.use(searchRoute);

//wishlist
app.use(wishlistRoute);