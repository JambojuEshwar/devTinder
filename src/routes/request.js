const express = require('express')

const requestRouter = express.Router()

const {userAuth} = require('./middlewares/auth')

const ConnectionRequest = require('../models/connectionRequest')

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
 

    try{
       
       const fromUserId = req.user._id;
       const toUserId = req.params.toUserId
       const status = req.params.status


       const allowedStatus = ["interested","ignored"]

       if(!allowedStatus.includes(status)){
        return res.status(400).json({message:"Invalid Status type: " + status})
       }

       const toUser = await User.findById(toUserId)

       if(!toUser){
        return res.status(400).json({message:"User Not Found!!"})
       }

       const existingConnectionRequest = await ConnectionRequest.findOne({
        $or:[
            {fromUserId,toUserId}, // A -> B
            {fromUserId:toUserId,toUserId:fromUserId} //B->A
        ]
       })

       if(existingConnectionRequest){
         return res.status(400).json({ message : "Connection Request Already Exists!!"})
       }

       const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status
       })

       const data = await connectionRequest.save();
       res.json({
        message:"Connection Request Sent Successfully!!",
        data,
       })

    }
    catch(err){
        res.status(400).send("ERROR : " + err.message)
    }



    res.send(user.firstName + " sent the connection request")
})

module.exports = requestRouter