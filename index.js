const express = require("express");
const app = express();
const cors = require('cors');
const { createServer } = require("http");
const port = process.env.PORT || 8001
const { connectDB, client } = require("./database");
const { v4: uuidv4 } = require('uuid');
const Loginhistory = require("./src/routes/LoginHistory/LoginHistory");
const moment = require('moment');
const notificationSendRoute = require("./src/routes/notification/triggerNotification");
const generateUniqueId = require('generate-unique-id');


const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors({
    origin: '*'
}));

httpServer.listen(port, () => {
    console.log(`Server started at ${port}`);
    connectDB();
});


////////////  Cart Routes     /////////
app.post("/Cart/add", (req, res) => {
    const { productname, price, originalprice, storeid, itemcount, productimage, customentid, category, productid, storename } = req.body;
    const text = `
      INSERT INTO 
      cart(id,productname,price,originalprice,storeid,itemcount,productimage,customentid,category,productid,storename) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *
  `;
    client.query(text, [uuidv4(), productname, price, originalprice, storeid, itemcount, productimage, customentid, category, productid, storename], (err, data) => {
        if (err) {
            res.send({ data: err });
        } else {
            res.send({ data: data.rows[0] })
        }
    })
});

app.post("/Cart/get/id", (req, res) => {
    const { id } = req.body;
    const text = `Select * from Cart where id='${id}'`;
    client.query(text, (err, data) => {
        if (err) {
            res.send({ data: err });
        } else {
            res.send({ data: data.rows })
        }
    })
});
app.post("/Cart/get/customentid", (req, res) => {
    const { id } = req.body;
    const text = `Select * from Cart where customentid='${id}'`;
    client.query(text, (err, data) => {
        if (err) {
            res.send({ data: err });
        } else {
            res.send({ data: data.rows })
        }
    })
});
app.delete("/Cart/delete", (req, res) => {
    const { id } = req.body;
    client.query(`DELETE FROM Cart WHERE id='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send({ data: "Data Deleted" })
        }
        else {
            res.status(401).send({ data: err })
        }
    })
})
app.delete("/Cart/delete/customerId", (req, res) => {
    const { id } = req.body;
    client.query(`DELETE FROM Cart WHERE customentid='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send({ data: "Data Deleted" })
        }
        else {
            res.status(401).send({ data: err })
        }
    })
})


//////////   Category Route     /////////////
app.post("/category/add", (req, res) => {
    const { name, imageurl, storeID } = req.body;
    const text = `
      INSERT INTO 
      caterory(id,name,imageurl,isActive,storeID,productListed) 
      VALUES ($1,$2,$3,$4,$5,$6) RETURNING *
  `;
    client.query(text, [uuidv4(), name, imageurl, true, storeID, 0], (err, data) => {
        if (err) {
            res.send({ data: err });
        } else {
            res.send({ data: data.rows[0] })
        }
    })
});

app.post("/category/get/id", (req, res) => {
    const { id } = req.body;
    const text = `Select * from caterory where storeID='${id}'`;
    client.query(text, (err, data) => {
        if (err) {
            res.send({ data: err });
        } else {
            res.send({ data: data.rows })
        }
    })
});

app.delete("/category/delete", (req, res) => {
    const { id } = req.body;
    client.query(`DELETE FROM caterory WHERE id='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send({ data: "Data Deleted" })
        }
        else {
            res.status(401).send({ data: err })
        }
    })
});


//////////   Chat Route     /////////////
app.post("/chatlist/add", (req, res) => {
    const { chatroomid, usernames, image, productid } = req.body;
    const arrayData = [...usernames];
    const text = `
      INSERT INTO 
      chatlist(id,chatroomid,usernames,image,productid) 
      VALUES ($1,$2,$3,$4,$5) RETURNING *
  `;
    client.query(text, [uuidv4(), chatroomid, arrayData, image, productid], (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data.rows[0])
        }
    })
});

app.post("/chat/message/add", (req, res) => {
    const currentTimestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const { roomid, message, messagedate, recieverid, senderid } = req.body;
    const text = `
        INSERT INTO 
        chatmessage(id,chatroomid,message,messagedate,recieverid,senderid) 
        VALUES ($1,$2,$3,$4,$5,$6) RETURNING *
    `;
    console.log(currentTimestamp)
    client.query(text, [uuidv4(), roomid, message, currentTimestamp, recieverid, senderid], (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data.rows[0])
        }
    })
})

app.delete("/deleteChat", (req, res) => {
    const { id } = req.body;
    client.query(`DELETE FROM chatlist WHERE id='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send("Data Deleted")
        }
        else {
            console.log(err);
            res.status(401).send(err)
        }
    })
})

app.delete("/deleteChatMessages", (req, res) => {
    const { id } = req.body;
    client.query(`DELETE FROM chatmessage WHERE id='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send("Data Deleted")
        }
        else {
            console.log(err);
            res.status(401).send(err)
        }
    })
})

app.post("/getCharListById", (req, res) => {
    const { userid } = req.body;
    const query = {
        text: 'SELECT * FROM chatlist WHERE chatroomid LIKE $1',
        values: [`%${userid}%`],
    };
    // const query = {
    //     text: 'SELECT * FROM chatlist WHERE usernames::text ILIKE ANY($1) and chatroomid=$2',
    //     values: [['%' + username + '%'],[`%${userid}%`]],
    // };
    client.query(query)
        .then((data) => {
            res.send({ data: data.rows })
        })
        .catch((error) => {
            console.log(error);
            res.send({ data: error })
        })
});

app.post("/chat/get/id", (req, res) => {
    const { id } = req.body;
    client.query(`SELECT * FROM chatmessage where chatroomid='${id}' order by messagedate desc`, (err, data) => {
        if (!err) {
            res.status(200).send(data.rows)
        }
        else {
            res.status(401).send(err)
        }
    })
})


//////////   Customer Route     /////////////
app.post("/Customer/add", (req, res) => {
    const { id, name, email, phone, address, city, state, profilestatus, location, fcmtoken } = req.body;
    const text = `
      INSERT INTO 
      Customer(id,name,email,phone,address,city,state,profilestatus,followings,wishtlist,location,profileimage,fcmtoken) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *
  `;
    client.query(text, [id, name, email, phone, address, city, state, profilestatus, [], [], location, "", fcmtoken], (err, data) => {
        if (err) {
            res.send({ data: err });
        } else {
            res.send({ data: data.rows[0] })
        }
    })
});

app.post("/Customer/get/id", (req, res) => {
    const { id } = req.body;

    const text = `Select * from customer where id='${id}'`;
    client.query(text, (err, data) => {
        if (err) {
            res.send({ data: err });
        } else {
            res.send({ data: data.rows })
        }
    })
});

app.delete("/Customer/delete", (req, res) => {
    const { id } = req.body;
    client.query(`DELETE FROM Customer WHERE id='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send({ data: "Data Deleted" })
        }
        else {
            res.status(401).send({ data: err })
        }
    })
})
app.put("/Customer/update", (req, res) => {
    const { id, arrayList, field } = req.body;
    const query = `UPDATE Customer SET ${field} = $1 WHERE id = '${id}'`;
    client.query(query, [arrayList], (err, data) => {
        if (!err) {
            res.status(200).send({ data: "Data upated" })
        }
        else {
            console.log(err);
            res.status(401).send({ data: err })
        }
    })
})


//////////   Global Route     /////////////
app.delete("/delete", (req, res) => {
    const { id, tablename } = req.body;
    let finalQuery = `DELETE FROM  ${tablename} WHERE id = '${id}'`
    client.query(finalQuery, (err, data) => {
        if (err) {
            res.send({ data: err })
        }
        else {
            // res.send({ data: "Your Data is deleted" })
            res.status(200).send("Data Deleted")
        }
    })
})

app.post("/getById", (req, res) => {
    const { tableVal, tablename, tablefield } = req.body;
    let finalQuery = `SELECT * FROM  ${tablename} WHERE ${tablefield} = '${tableVal}'`
    client.query(finalQuery, (err, data) => {
        if (err) {
            res.send({ data: err })
        }
        else {
            res.send({ data: data.rows, message: "Your Data is here" })
        }
    })
})

app.post("/getCouponByCode", (req, res) => {
    const { couponCode } = req.body;
    let finalQuery = `select * from percoupon where couponcode='${couponCode}'`
    let secondQuery = `select * from flatcoupon where couponcode='${couponCode}'`
    client.query(finalQuery, (err, data) => {
        if (err) {
            res.send({ data: err })
        }
        else {
            if(data.rows.length!=0)
                res.send({ data: data.rows, message: "Your Data is here" })
            else{
                client.query(secondQuery, (err, data) => {
                    if (err) {
                        res.send({ data: err })
                    }
                    else {
                        if(data.rows.length!=0)
                            res.send({ data: data.rows, message: "Your Data is here" })
                        else{
                            res.send({ data: [], message: "Your Data is here" })
                        }
                    }
                })
            }
        }
    })
})

app.post("/getAllData", (req, res) => {
    const { tablename } = req.body;
    let finalQuery = `SELECT * from  ${tablename}`;

    client.query(finalQuery, (err, data) => {
        if (err) {
            console.log(err);
            res.send({ data: err })
        }
        else {
            console.log(data);
            res.send({ data: data.rows, message: "Your Data is here" })
        }
    })
})

app.post("/update", (req, res) => {
    const { id, updateData, tablename } = req.body;

    let updatedFields = Object.entries(updateData);
    let queryStringUpdateFields = '';
    if (updatedFields.length === 1) {
        queryStringUpdateFields = `${updatedFields[0][0]}='${updatedFields[0][1]}'`
    }
    else {
        for (let i = 0; i < updatedFields.length; i++) {
            if (i === updatedFields.length - 1) {
                queryStringUpdateFields = queryStringUpdateFields.concat(`${updatedFields[i][0]}='${updatedFields[i][1]}'`)
            }
            else {
                queryStringUpdateFields = queryStringUpdateFields.concat(`${updatedFields[i][0]}='${updatedFields[i][1]}',`)
            }
        }
    }
    let finalQuery = `UPDATE ${tablename} SET ${queryStringUpdateFields} WHERE id = '${id}'`
    client.query(finalQuery, (err, data) => {
        if (err) {
            console.log(err);
            res.send({ data: err })
        }
        else {
            res.send({ data: data.rows, message: "Your data is updated" })
        }
    })
});


//////////   Login History Route     /////////////
// app.post("/Loginhistory", (req, res) => {
//   client.query("INSERT INTO  loginhistory(id,logintime,deliveryboyid ) VALUES ($1, $2 ,$3)", [uuidv4(), req.body.logintime, req.body.deliveryboyid], (err, data) => {
//       if (err) {
//           console.log("hi");
//           res.send({ data: err, message: "Problem" })
//       }
//       else {
//           console.log("hello");
//           res.send({ data: data.rows, message: "You data is inserted" })
//       }
//   })

// });
// app.get("/Loginhistory/get",(req,res)=>{
//   const { deliveryboyid } = req.body;
//   client.query(`SELECT * FROM loginhistory where deliveryboyid='${deliveryboyid}'`, (err, data) => {
//       if (!err) {
//           res.status(200).send(data.rows)
//       }
//       else {
//           res.status(401).send(err)
//       }
//   })
// });

app.use(Loginhistory)


//////////   Orders Route     /////////////
app.post("/order/add", (req, res) => {
    const {
        storeID,
        customerID,
        orderDate,
        returnDate,
        customerAddress,
        orderStatus,
        totalAmount,
        totalItems,
        orderby,
        storeAddress,
        shopName,
        paymentStatus,
        paymentType,
        items,
        deliveryboyid,
        customerbehaviour,
        customerlocation,
        customercontact,
        customerlandmark,
        otp,
        expectedDeliveryTime,
        expectedDistance,
        handlingcash,
        sellerphone,
        storelocation,
        orderTip,
        walletamt,
        offeramt
    } = req.body;
    const arrayData = [...items];
    const text = `
      INSERT INTO 
      orders(id,storeid,customerid,orderdate,returndate,customeraddress,orderstatus,totalamount,totalitems,orderby,storeaddress,shopname,paymentstatus,paymenttype,items,deliveryboyid,customerbehaviour,customerlocation,customercontact,customerlandmark,otp,expectedDeliveryTime,expectedDistance,handlingcash,sellerphone,storelocation,orderTip,walletamt,offeramt) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29) RETURNING *
  `;
    const orderID = generateUniqueId({
        length: 16,
        useLetters: false
    });
    client.query(text, [orderID, storeID, customerID, orderDate, returnDate, customerAddress, orderStatus, totalAmount, totalItems, orderby, storeAddress, shopName, paymentStatus, paymentType, arrayData, deliveryboyid, customerbehaviour, customerlocation, customercontact, customerlandmark, otp, expectedDeliveryTime, expectedDistance, handlingcash, sellerphone, storelocation, orderTip,walletamt,offeramt], (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data.rows[0])
        }
    })
});

app.post('/order/exchange_return/add', (req, res) => {
    const { imageUrl, storeId, customerid, orderid, statustype, reason, response } = req.body;
    const text = `
      INSERT INTO 
      OrderreturnExcange(id,imageUrl,storeId,customerid,orderid,statustype,reason,response) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *
  `;
    client.query(text, [uuidv4(), imageUrl, storeId, customerid, orderid, statustype, reason, response], (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data.rows[0])
        }
    })
});

app.delete("/deleteChat", (req, res) => {
    const { id } = req.body;
    client.query(`DELETE FROM orders WHERE id='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send("Data Deleted")
        }
        else {
            console.log(err);
            res.status(401).send(err)
        }
    })
})

app.post("/order/get/id", (req, res) => {
    const { id } = req.body;
    client.query(`SELECT * FROM orders where id='${id}'`, (err, data) => {
        if (err) {
            res.status(401).send({ data: err });
        } else {
            res.status(200).send({ data: data.rows[0] })
        }
    })
});

app.post("/order/storeId", (req, res) => {
    const { id } = req.body;
    client.query(`SELECT * FROM orders where storeid='${id}' order by orderdate desc`, (err, data) => {
        if (err) {
            res.status(401).send({ data: err });
        } else {
            res.status(200).send({ data: data.rows })
        }
    })
});

app.post("/order/customerId", (req, res) => {
    const { id } = req.body;
    client.query(`SELECT * FROM orders where customerid='${id}' order by orderdate desc`, (err, data) => {
        if (err) {
            res.status(401).send({ data: err });
        } else {
            res.status(200).send({ data: data.rows })
        }
    })
});

app.post("/order/deliveryId", (req, res) => {
    const { id } = req.body;
    client.query(`SELECT * FROM orders where deliveryboyId='${id}' order by orderdate desc`, (err, data) => {
        if (err) {
            res.status(401).send({ data: err });
        } else {
            res.status(200).send({ data: data.rows })
        }
    })
});

app.post("/order/delivery/pastweek", (req, res) => {
    const { id } = req.body;
    const date = new Date();
    let finalOrdersArray = [];
    const dateSevenDaysBefore = date.getDate() - 7;
    date.setDate(dateSevenDaysBefore)
    client.query(`SELECT * FROM orders where deliveryboyId='${id}'`, (err, data) => {
        if (err) {
            res.status(401).send({ data: err });
        } else {
            data.rows.forEach(item => {
                if (new Date(item.orderdate).getDate() >= dateSevenDaysBefore) {
                    finalOrdersArray.push(item);
                }
            })
            res.status(200).send({ data: finalOrdersArray.length })
        }
    })
});


//////////   Product Route     /////////////
app.post("/product/add", (req, res) => {
    const { name, categoryName, price, discountedPrice, quantity, produtType, deiails, variants, paymentMode, tags, imageUrls, storeID, country, otherdetails } = req.body;
    const text = `
      INSERT INTO 
      product(id,name,categoryName,price,discountedPrice,quantity,produtType,deiails,variants,paymentMode,tags,imageUrls,storeID,isActive,country,otherdetails) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *
  `;
    client.query(text, [uuidv4(), name, categoryName, price, discountedPrice, quantity, [...produtType], deiails, [...variants], [...paymentMode], [...tags], [...imageUrls], storeID, true, country, otherdetails], (err, data) => {
        if (err) {
            res.send({ data: err });
        } else {
            res.send({ data: data.rows[0] })
        }
    })
});

app.post("/product/get/id", (req, res) => {
    const { id } = req.body;
    const text = `Select * from product where id='${id}'`;
    client.query(text, (err, data) => {
        if (err) {
            res.send({ data: err });
        } else {
            res.send({ data: data.rows })
        }
    })
});

app.post("/product/get/storeid", (req, res) => {
    const { id } = req.body;
    const text = `Select * from product where storeID='${id}' and isactive=true`;
    client.query(text, (err, data) => {
        if (err) {
            res.send({ data: err });
        } else {
            res.send({ data: data.rows })
        }
    })
});
app.post("/product/get/storeid/all", (req, res) => {
    const { id } = req.body;
    const text = `Select * from product where storeID='${id}'`;
    client.query(text, (err, data) => {
        if (err) {
            res.send({ data: err });
        } else {
            res.send({ data: data.rows })
        }
    })
});

app.delete("/product/delete", (req, res) => {
    const { id } = req.body;
    client.query(`DELETE FROM product WHERE id='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send({ data: "Data Deleted" })
        }
        else {
            res.status(401).send({ data: err })
        }
    })
})
app.post("/product/store/count", (req, res) => {
    const { id } = req.body;
    client.query(`select count(*) as num from product where storeid='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send({ data: data.rows[0].num })
        }
        else {
            res.status(401).send({ data: err })
        }
    })
})


//////////   Search Route     /////////////
app.post("/search/product", (req, res) => {
    const { tag, storeId } = req.body;
    const searchString = tag;
    const query = {
        text: 'SELECT * FROM product WHERE tags::text ILIKE ANY($1) and storeid=$2',
        values: [['%' + searchString + '%'], storeId],
    };

    client.query(query)
        .then((data) => {
            res.send({ data: data.rows })
        })
        .catch((error) => {
            res.send({ data: error })
        })
})

app.post("/search/store", (req, res) => {
    const { storename, lat, lon } = req.body;
    const query = {
        text: `SELECT * FROM storedetail t WHERE shopname ILIKE $1 and ST_DistanceSphere(t.location::geometry, ST_SetSRID(ST_MakePoint(${parseFloat(lat)}, ${parseFloat(lon)}), 4326)) < 3000`,
        values: [`%${storename}%`],
    };
    client.query(query)
        .then((data) => {
            res.send({ data: data.rows })
        })
        .catch((error) => {
            res.send({ data: error })
        })
})
app.post("/search/address", (req, res) => {
    const { id, address } = req.body;
    const query = {
        text: 'SELECT * FROM useraddress where userid=$1 and address ILIKE $2',
        values: [id, '%' + address + '%'],
    };
    client.query(query)
        .then((data) => {
            res.send({ data: data.rows })
        })
        .catch((error) => {
            res.send({ data: error })
        })
})

app.post("/search/store/category", (req, res) => {
    const { category, lat, lon } = req.body;
    const query = {
        text: `SELECT * FROM storedetail t WHERE storecategory ILIKE $1 and ST_DistanceSphere(t.location::geometry, ST_SetSRID(ST_MakePoint(${parseFloat(lat)}, ${parseFloat(lon)}), 4326)) < 3000`,
        values: [`%${category}%`],
    };
    client.query(query)
        .then((data) => {
            res.status(200).send({ data: data.rows })
        })
        .catch((error) => {
            res.status(500).send({ data: error })
        })
})


//////////   Store Route     /////////////
app.post("/store/add", (req, res) => {
    const { ShopName, StoreCategory, GSTNum, StoreAddress, LatitudeCords, LongitudeCords, AccountNumber, IFSECode, BankName, Branch, imageUrl, sellerid } = req.body;
    const text = `
      INSERT INTO 
      storedetail( 
          id,ShopName,StoreCategory,GSTNum,StoreAddress,LatitudeCords,LongitudeCords,AccountNumber,IFSECode,BankName,Branch,imageUrl,totalProducts,followers,rating,storevisits,productsview,sellerid,isstoreopenclose,location)
          VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,ST_SetSRID(ST_MakePoint(${parseFloat(LatitudeCords)},${parseFloat(LongitudeCords)}), 4326)) RETURNING *
      `;
    client.query(text, [uuidv4(), ShopName, StoreCategory, GSTNum, StoreAddress, LatitudeCords, LongitudeCords, AccountNumber, IFSECode, BankName, Branch, imageUrl, 0, 0, 0, 0, 0, sellerid, true], (err, data) => {
        if (err) {
            res.send({ data: err });
        } else {
            res.send({ data: data.rows[0] })
        }
    })
});

app.post("/store/get/id", (req, res) => {
    const { id } = req.body;
    const text = `Select * from storedetail WHERE id='${id}'`;
    client.query(text, (err, data) => {
        if (err) {
            res.send({ data: err });
        } else {
            res.send({ data: data.rows })
        }
    })
});

app.delete("/store/delete", (req, res) => {
    const { id } = req.body;
    client.query(`DELETE FROM storedetail WHERE id='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send({ data: "Data Deleted" })
        }
        else {
            res.status(401).send({ data: err })
        }
    })
})

app.post("/store/get", (req, res) => {
    const { lat, lon } = req.body;
    const query = `
      SELECT *
      FROM storedetail t
      WHERE
        ST_DistanceSphere(t.location::geometry, ST_SetSRID(ST_MakePoint(${parseFloat(lat)}, ${parseFloat(lon)}), 4326)) < 3000;
    `;
    client.query(query, (err, data) => {
        if (!err) {
            res.status(200).send({ data: data.rows })
        }
        else {
            res.status(401).send({ data: err })
        }
    })
})
app.post("/store/get/ordercount", (req, res) => {
    const { id } = req.body;
    client.query(`SELECT COUNT(*) FROM orders where storeid='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send({ data: data.rows[0].count })
        }
        else {
            console.log(err);
            res.status(401).send({ data: err })
        }
    })
});
app.post("/store/get/totalSales", (req, res) => {
    const { id } = req.body;
    client.query(`SELECT SUM(totalamount) AS total_sum FROM orders where storeid='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send({ data: data.rows[0].total_sum })
        }
        else {
            console.log(err);
            res.status(401).send({ data: err })
        }
    })
});
app.post("/get/seller/stores", (req, res) => {
    const { id } = req.body;
    client.query(`select id,shopname from storedetail where sellerid='${id}';`, (err, data) => {
        if (!err) {
            res.status(200).send({ data: data.rows })
        }
        else {
            console.log(err);
            res.status(401).send({ data: err })
        }
    })
});


//////////   Wishlist Route     /////////////
app.post("/wishlist/add", (req, res) => {
    const { image, productname, storeid, customerid, productid, price } = req.body;
    const text = `
      INSERT INTO 
      wishlist(id,image ,productname ,storeid ,customerid ,productid ,price) 
      VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *
  `;
    client.query(text, [uuidv4(), image, productname, storeid, customerid, productid, price], (err, data) => {
        if (err) {
            console.log(err)
            res.send({ data: err });
        } else {
            res.send({ data: data.rows[0] })
        }
    })
})
app.post("/wishlist/get/id", (req, res) => {
    const { id } = req.body;
    client.query(`SELECT * FROM wishlist where customerid='${id}'`, (err, data) => {
        if (err) {
            res.status(401).send({ data: err });
        } else {
            res.status(200).send({ data: data.rows })
        }
    })
})

app.delete("/wishlist/delete", (req, res) => {
    const { id } = req.body;
    client.query(`delete from wishlist where id='${id}'`, (err, data) => {
        if (err) {
            console.log(err);
            res.status(401).send({ data: err });
        } else {
            res.status(200).send({ data: 'Delete Item' })
        }
    })
})
app.delete("/wishlist/delete/productcustomer", (req, res) => {
    const { productid, customerid } = req.body;
    client.query(`delete from wishlist where customerid='${customerid}'and productid='${productid}'`, (err, data) => {
        if (err) {
            console.log(err);
            res.status(401).send({ data: err });
        } else {
            res.status(200).send({ data: 'Delete Item' })
        }
    })
})


//////////   Address Route     /////////////
app.post("/UserAddress", (req, res) => {
    client.query("INSERT INTO userAddress (id, AddressType,Address,LatCords,LongCords,UserId) VALUES ($1, $2 ,$3, $4 ,$5, $6)", [uuidv4(), req.body.AddressType, req.body.Address, req.body.LatCords, req.body.LongCords, req.body.UserId], (err, data) => {
        if (err) {
            res.send({ data: err, message: "Problem" })
        }
        else {
            res.send({ data: data.rows, message: "You data is inserted" })
        }
    })
});


//////////   Banner Route     /////////////
app.post("/Banner", (req, res) => {
    client.query("INSERT INTO Banner (id, Title,LearnMore,LearnMoreActive,LastUpdate,Image,Status,Role) VALUES ($1, $2 ,$3, $4 ,$5, $6, $7, $8)", [uuidv4(), req.body.Title, req.body.LearnMore, req.body.LearnMoreActive, req.body.LastUpdate, req.body.Image, req.body.Status, req.body.Role], (err, data) => {
        if (err) {
            res.send({ data: err, message: "Problem" })
        }
        else {
            res.send({ data: data.rows, message: "You data is inserted" })
        }
    })
});


//////////   Coupon Route     /////////////
app.post("/coupen/perCoupen", (req, res) => {
    client.query("INSERT INTO percoupon (id, discountAmount,minOrderAmount,usesPerCustomer,startDate,endDate,validPaymentType,CouponCode,isActive,storeId) VALUES ($1, $2 ,$3, $4 ,$5, $6, $7, $8, $9, $10)", [uuidv4(), req.body.discountAmount, req.body.minOrderAmount, req.body.usesPerCustomer, req.body.startDate, req.body.endDate, req.body.validPaymentType, req.body.CouponCode, req.body.isActive, req.body.storeId,], (err, data) => {
        if (err) {
            res.send({ data: err, message: "Problem" })
        }
        else {
            res.send({ data: data.rows, message: "You data is inserted" })
        }
    })
});


app.post("/coupen/BuyGet", (req, res) => {
    client.query("INSERT INTO buyget (id, buyVal,getVal,minOrderAmount,usesPerCustomer,startDate,endDate,validPaymentType,CouponCode,isActive,storeId) VALUES ($1, $2 ,$3, $4 ,$5, $6, $7, $8, $9, $10,$11)", [uuidv4(), req.body.buyVal, req.body.getVal, req.body.minOrderAmount, req.body.usesPerCustomer, req.body.startDate, req.body.endDate, req.body.validPaymentType, req.body.CouponCode, req.body.isActive, req.body.storeId,], (err, data) => {
        if (err) {
            res.send({ data: err, message: "Problem" })
        }
        else {
            res.send({ data: data.rows, message: "You data is inserted" })
        }
    })
});


app.post("/coupen/FlatCoupon", (req, res) => {
    client.query("INSERT INTO flatcoupon (id, discountAmount,minOrderAmount,usesPerCustomer,startDate,endDate,validPaymentType,CouponCode,isActive,storeId) VALUES ($1, $2 ,$3, $4 ,$5, $6, $7, $8, $9, $10)", [uuidv4(), req.body.discountAmount, req.body.minOrderAmount, req.body.usesPerCustomer, req.body.startDate, req.body.endDate, req.body.validPaymentType, req.body.CouponCode, req.body.isActive, req.body.storeId,], (err, data) => {
        if (err) {
            res.send({ data: err, message: "Problem" })
        }
        else {
            res.send({ data: data.rows, message: "You data is inserted" })
        }
    })
});



app.delete(`/coupen/perCoupen/:id`, (req, res) => {
    client.query("DELETE FROM PerCoupon WHERE ID = $1", [req.params.id], (err, data) => {
        if (err) {
            res.send({ data: err, message: "Problem" })
        }
        else {
            res.send({ data: data.rows, message: "You data is deleted" })
        }
    })
})


app.delete(`/coupen/BuyGet/:id`, (req, res) => {
    client.query("DELETE FROM BuyGet WHERE ID = $1", [req.params.id], (err, data) => {
        if (err) {
            res.send({ data: err, message: "Problem" })
        }
        else {
            res.send({ data: data.rows, message: "You data is deleted" })
        }
    })
})

app.delete(`/coupen/FlatCoupon/:id`, (req, res) => {
    client.query("DELETE FROM FlatCoupon WHERE ID = $1", [req.params.id], (err, data) => {
        if (err) {
            res.send({ data: err, message: "Problem" })
        }
        else {
            res.send({ data: data.rows, message: "You data is deleted" })
        }
    })
})


//////////   DeliveryRegis Route     /////////////
app.post("/DeliveryRegis", (req, res) => {
    client.query(
        `
            INSERT INTO DeliveryRegister (id, name,email,fcmToken,phone,DeliveryBoyId,AadharFront,AadharBack,PanFront,PanBack,DrivingrFront,DrivingBack,BankName,AccountNumber,IFSECode,Address,SelfieUrl,profilestatus,latitude,longitude,isbusy,isavailable,locationString) 
            VALUES (
                $1, 
                $2,
                $3, 
                $4,
                $5, 
                $6, 
                $7,
                $8, 
                $9, 
                $10, 
                $11, 
                $12, 
                $13, 
                $14, 
                $15, 
                $16,
                $17,
                $18,
                $19,
                $20,
                $21,
                $22,
                ST_SetSRID(ST_MakePoint(${parseFloat(req.body.latitude)},${parseFloat(req.body.longitude)}), 4326)
            ) RETURNING *
        `,
        [
            req.body.id,
            req.body.name,
            req.body.email,
            req.body.fcmToken,
            req.body.phone,
            req.body.DeliveryBoyId,
            req.body.AadharFront,
            req.body.AadharBack,
            req.body.PanFront,
            req.body.PanBack,
            req.body.DrivingrFront,
            req.body.DrivingBack,
            req.body.BankName,
            req.body.AccountNumber,
            req.body.IFSECode,
            req.body.Address,
            req.body.SelfieUrl,
            req.body.profilestatus,
            req.body.latitude,
            req.body.longitude,
            req.body.isavailable,
            false
        ],
        (err, data) => {
            if (err) {
                console.log(err);
                res.send({ data: err, message: "Problem" })
            }
            else {
                console.log(data.rows);
                res.send({ data: data.rows, message: "You data is inserted" })
            }
        })
});

app.post("/deliveryboy/get/availableity", (req, res) => {
    const { lat, lon } = req.body;
    const query = `
      SELECT *
      FROM deliveryregister t
      WHERE
        ST_DistanceSphere(t.locationstring::geometry, ST_SetSRID(ST_MakePoint(${parseFloat(lat)}, ${parseFloat(lon)}), 4326)) <= 5000 and isbusy=false and isavailable='true'
    `;
    client.query(query, (err, data) => {
        if (!err) {
            if (data.rows.length === 0)
                res.status(200).send({ data: [] })
            else
                res.status(200).send({ data: data.rows[0] })
        }
        else {
            res.status(401).send({ data: err })
        }
    })
})
app.post("/deliveryboy/update/location", (req, res) => {
    const { lat, lon, id } = req.body;
    const query = `UPDATE deliveryregister
        SET locationstring = ST_SetSRID(ST_MakePoint(${parseFloat(lat)}, ${parseFloat(lon)}), 4326),latitude='${lat}',longitude='${lon}'
        WHERE id = '${id}'`;
    client.query(query, (err, data) => {
        if (!err) {
            res.status(200).send({ data: "Location Updated" })
        }
        else {
            res.status(401).send({ data: err })
        }
    })
})


//////////   Feedback Route     /////////////
app.post("/feedback/add", (req, res) => {
    const { fmessage, frating, shopid, senderid, storeownerbehaviour, deliveryboybehaviour, productqualitybehaviour, ontimedeliverybehaviour, orderid } = req.body;
    const text = `
        INSERT INTO 
        feedback(id,fmessage ,frating ,shopid ,senderid ,storeownerbehaviour ,deliveryboybehaviour,productqualitybehaviour,ontimedeliverybehaviour,orderid) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *
    `;
    client.query(text, [uuidv4(), fmessage, frating, shopid, senderid, storeownerbehaviour, deliveryboybehaviour, productqualitybehaviour, ontimedeliverybehaviour, orderid], (err, data) => {
        if (err) {
            console.log(err)
            res.status(400).send({ data: err });
        } else {
            res.status(200).send({ data: data.rows[0] })
        }
    })
});


app.post("/get/sellerid", (req, res) => {
    const { id } = req.body;
    client.query(`SELECT * FROM feedback where shopid='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send(data.rows)
        }
        else {
            res.status(401).send(err)
        }
    })
})
app.post("/get/customreid", (req, res) => {
    const { id } = req.body;
    client.query(`SELECT * FROM feedback where senderid='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send(data.rows)
        }
        else {
            res.status(401).send(err)
        }
    })
})


app.delete("/feedback/deleteByid", (req, res) => {
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


//////////   Handlecash Route     /////////////
app.post("/Handlecash", (req, res) => {
    console.log(req.body)
    client.query("INSERT INTO handlingcash(id,deliveryboyid,walletamount,orderid ) VALUES ($1, $2 ,$3,$4)", [uuidv4(), req.body.deliveryboyid, req.body.walletamount, req.body.orderid], (err, data) => {
        if (err) {
            res.send({ data: err, message: "Problem" })
        }
        else {
            res.send({ data: data.rows, message: "You data is inserted" })
        }
    })
});

app.get("/Handlecash/get", (req, res) => {
    const { deliveryboyid } = req.body;
    client.query(`SELECT * FROM handlingcash where deliveryboyid='${deliveryboyid}'`, (err, data) => {
        if (!err) {
            res.status(200).send(data.rows)
        }
        else {
            res.status(401).send(err)
        }
    })
});


//////////   Notification Route     /////////////
app.post("/notification", (req, res) => {
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

app.get("/notificationByid", (req, res) => {
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

app.delete("/notification/deleteByid", (req, res) => {
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


//////////   Seller Route     /////////////
app.post("/seller", (req, res) => {
    const {
        uid,
        name,
        email,
        fcmToken,
        phone,
        storeid,
        profileStatus
    } = req.body;
    const arrayData = [...storeid];

    client.query("INSERT INTO sellers (id, name,email,fcmToken,phone,profileStatus,storeid) VALUES ($1, $2 ,$3, $4 ,$5,$6,$7)", [uid, name, email, fcmToken, phone, profileStatus, storeid], (err, data) => {
        if (err) {
            console.log(err);
            res.send({ data: err, message: "Problem" })
        }
        else {
            console.log(data);
            res.send({ data: '', message: "You data is inserted" })
        }
    })
});


app.delete("/seller/deleteAccount", (req, res) => {
    const { id } = req.body;
    client.query(`DELETE FROM sellers WHERE id='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send("Data Deleted")
        }
        else {
            res.status(401).send(err)
        }
    })
})

app.post("/seller/getSeller", (req, res) => {
    const { id } = req.body;
    client.query(`SELECT * FROM sellers  where id='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send(data.rows)
        }
        else {
            res.status(401).send(err)
        }
    })
})

app.post("/seller/getSeller/storeid", (req, res) => {
    const { storeid } = req.body;
    client.query(`SELECT * FROM sellers  where storeid='${storeid}'`, (err, data) => {
        if (!err) {
            console.log(data.rows)
            res.status(200).send(data.rows[0])
        }
        else {
            res.status(401).send(err)
        }
    })
})


//////////   StartDuty Route     /////////////
app.post("/StartDuty", (req, res) => {
    client.query("INSERT INTO StartDuty (id, logintime,deliveryboyid,deliveryboyselfie,logouttime) VALUES ($1, $2 ,$3, $4,$5 )", [req.body.id, req.body.logintime, req.body.deliveryboyid, req.body.deliveryboyselfie, req.body.logouttime], (err, data) => {
        if (err) {
            res.send({ data: err, message: "Problem" })
        }
        else {
            res.send({ data: data.rows, message: "You data is inserted" })
        }
    })
});


//////////   Wallet Route     /////////////
app.post("/wallet", (req, res) => {
    client.query("INSERT INTO wallet (id, totalamount,walletid) VALUES ($1, $2 ,$3) RETURNING *",
        [uuidv4(), req.body.totalamount, req.body.walletid], (err, data) => {
            if (err) {
                res.status(401).send(err)
            }
            else {
                res.status(200).send(data.rows)
            }
        })
});


app.post("/walletdata", (req, res) => {
    client.query("INSERT INTO walletdata (id, TransactionType,Amount,SenderName,SenderId,ReceiverId,ReceiverName,walletid) VALUES ($1, $2 ,$3, $4 ,$5, $6, $7,$8) RETURNING *",
        [req.body.id, req.body.TransactionType, req.body.Amount, req.body.SenderName, req.body.SenderId, req.body.ReceiverId, req.body.ReceiverName,req.body.walletid], (err, data) => {
            if (err) {
                res.status(401).send(err)
            }
            else {
                res.status(200).send(data.rows)
            }
        })
});



app.post("/store/openCharge", (req, res) => {
    client.query("INSERT INTO storeOpenCharge (id, paymentImage,storeid,date) VALUES ($1, $2 ,$3, $4) RETURNING *",
        [uuidv4(), req.body.paymentImage, req.body.storeid, req.body.date], (err, data) => {
            if (err) {
                res.status(401).send(err)
            }
            else {
                res.status(200).send(data.rows)
            }
        })
});
app.get("/walletById", (req, res) => {
    const { id } = req.body;
    client.query(`SELECT * FROM wallet where id='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send(data.rows)
        }
        else {
            res.status(401).send(err)
        }
    })
})


app.delete("/wallet/deleteByid", (req, res) => {
    const { id } = req.body;
    client.query(`delete  FROM wallet where id='${id}'`, (err, data) => {
        if (!err) {
            res.status(200).send({ message: "You data is deleted" })
        }
        else {
            res.status(401).send({ data: err, message: "Problem" })
        }
    })
})



app.post("/globalCategory/add", (req, res) => {
    const { categoryname, img } = req.body;
    const text = `
        INSERT INTO 
        globalcategory(id,categoryname,img) 
        VALUES ($1,$2,$3) RETURNING *
    `;
    client.query(text, [uuidv4(), categoryname, img], (err, data) => {
        if (err) {
            res.send({ data: err });
        } else {
            res.send({ data: data.rows[0] })
        }
    })
});
app.get("/category/get/global", (req, res) => {
    client.query('select * from globalcategory', (err, data) => {
        if (err) {
            res.send({ data: err, status: 500 });
        } else {
            res.send({ data: data.rows, status: 200 })
        }
    })
});


app.post("/storeSpecBanner/add", (req, res) => {
    const { image, storeid } = req.body;
    const text = `
        INSERT INTO 
        storespecbanner(id,image,storeid) 
        VALUES ($1,$2,$3) RETURNING *
    `;
    client.query(text, [uuidv4(), image, storeid], (err, data) => {
        if (err) {
            res.send({ data: err });
        } else {
            res.send({ data: data.rows[0], message: "You Data is inserted" })
        }
    })
});

app.use(notificationSendRoute)