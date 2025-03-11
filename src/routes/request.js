const express = require('express')

const requestRouter = express.Router()

const {userAuth} = require('../middlewares/auth')

const ConnectionRequest = require('../models/connectionRequest')

const User = require('../models/user')

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


       //instanstiating new connection requests 
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

requestRouter.post("/request/review/:status/requestId",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user

    const{status,requestId} = req.params

    const allowedStatus = ["accepted","rejected"]
    if(!allowedStatus.includes(status)){
        return res.json({message : "Status not allowed!!"})
    }


    //approving the connectionrequest accept/reject by loggedinuser(reciever)
    const connectionRequest = await findOne({
        _id:requestId,
        toUserId:loggedInUser._id,
        status:"interested"
    })
    if(!connectionRequest){
        return res.status(404).json({message : "Connection Request Not Found!!"})
    }
    
    //after validations  connectionrequest is approved(accepted/rejected)
    //save the status 

     connectionRequest.status = status

     const data = await connectionRequest.save()

     res.json({ message: "Connection request "+status, data})

 }
    catch(err){
        res.status(400).send("ERROR: " + err.message)
    }
})

module.exports = requestRouter