const express = require('express')

const userRouter = express.Router()

const {userAuth} = require("../middlewares/auth")

const connectionRequest = require('../models/connectionRequest')

const User = require('../models/user')

const USER_SAFE_DATA = "firstName lastName photoUrl about skills"

//GET ALL THE PENDING REQUESTS for  A loggedInUser
userRouter.get("/user/requests/received", userAuth ,async(req,res)=>{
   try{
    const loggedInUser = req.user;

    const connectionRequests = await connectionRequest.find({
        //we just want to know the connections of loggedInuser so touserId will be now loggedInuserId best example - myself loggedIn to check connectionrequests
        toUserId:loggedInUser._id,
        status:"interested",
        //only interested connections are sent if this statement is not included then all the connections that fromuser ignored is shown so we dont want that
    }).populate("fromUserId",USER_SAFE_DATA) //populate links the fromUserId connectionRequest from the User model to know firstName and all the fields
   
    res.json({
        message : "Data Fetched Successfully",
        data: connectionRequests
    })

   }
   catch(err){
    res.status(400).send("ERROR : " + err)
   }
})


//GET USER CONNECTIONS

userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        //check for the loggedInUser's connections after Authentication is valid and details are sent by userAuth middleware
    const loggedInUser = req.user

    //suppose
    //eshwar->hitesh  
    //hitesh->vivek
   
    //eshwar connections - (1)hitesh so for eshwar connectionrequest is toUser and the details of  touserid is to be shown 
    //hitesh connections - (2)eshwar for hitesh connectionrequest are fromUserId (eshwar) and toUserId (vivek) have to show both the request information


//$or allows matching documents where at least one condition is true, making it useful when searching for multiple possible matches in MongoDB.









// Example Data in the Database
// _id	fromUserId	toUserId	status
// 101	A	B	accepted
// 102	C	A	accepted
// 103	A	D	accepted
// If loggedInUser._id = A, the query will return:


// [
//   { "_id": "101", "fromUserId": "A", "toUserId": "B", "status": "accepted" },
//   { "_id": "102", "fromUserId": "C", "toUserId": "A", "status": "accepted" },
//   { "_id": "103", "fromUserId": "A", "toUserId": "D", "status": "accepted" }
// ]
// Because A appears either in fromUserId OR toUserId.


      const connectionRequests = await connectionRequest.find({
         $or:[
            {toUserId:loggedInUser._id,status:"accepted"},
            {fromUserId:loggedInUser._id,status:"accepted"},

         ],
      })   
      //populate fromuserid and touserid inorder to show the connection details accordingly if fromuser - link  fromuser to User Model iftouser - Link touserid to user model   
      .populate("fromUserId",USER_SAFE_DATA)
      .populate("toUserId",USER_SAFE_DATA)



      // The map() function ensures that we return only the list of connected users (other than the logged-in user) instead of full connection request objects.

      const data = connectionRequests.map((row)=>{
         if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
            return row.toUserId
         }
         return row.fromUserId
      })

      res.json({data})

    }
    catch(err){
        res.status(400).send({message : err.message})
    }


 
})



//inorder to write this api  

//1)In our feed we never show our information on card as feed (for ourself afterlogged in)
//2)also dont show the user whom we sent the request
//3)dont show the user who has sent request to us


userRouter.get("/feed",userAuth,async(req,res)=>{
   try{
    const loggedInUser = req.user

    const page = (req.query.page) || 1
    const limit = (req.query.limit) ||10

    const skip = (page-1)*10

    //show the requests for a loggedInuser (sent+recieved)
    const connectionRequests = await connectionRequest.find({
        $or:[{fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}]
    }).select("fromUserId toUserId")


    

    //set() removes the duplicates from the list
    const hideUsersFromFeed = new Set();

    connectionRequests.forEach((req)=>{
        hideUsersFromFeed.add(req.fromUserId.toString()) //user who send the request
        hideUsersFromFeed.add(req.toUserId.toString())  //user who recieves the request
    })

    const users = await User.find({
        $and:[{_id:{$nin:Array.from(hideUsersFromFeed)}},{_id:{$ne:loggedInUser._id}}]
    }).select(USER_SAFE_DATA) 
      .skip(skip)
      .limit(limit)

    res.send(users)
   }
   catch(err){
    res.status(400).send({message:err.message})
   }

})

module.exports = userRouter