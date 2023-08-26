let admin=require('firebase-admin');
const express=require('express');
const notificationSendRoute=express.Router();

notificationSendRoute.post('/orderConfirmNotification',(req,res)=>{
    const {messegeTitle,messegeBody,fcmToken}=req.body;
    admin.messaging().sendToDevice(
        [fcmToken],
        {
            notification: {
                title: messegeTitle,
                body: messegeBody,
            },
        },
        {
            contentAvailable: true,
            priority: 'high',
        },
    )
    .then(respnse=>{
         res.status(200).send({message:"Order Placed"})
    })
    .catch((e)=>{
        res.send({message:"Can't place order"})
    })
})
module.exports=notificationSendRoute
