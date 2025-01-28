const express = require('express')
const connectDB = require("./config/database")
const app = express()
const User = require("./models/user")

const bcrypt = require('bcrypt')

const {validateSignUpData} = require("./utils/Validation")

//this app.use handles all routes get post put delete 
//express.json() middleware converts the json data recieved to javascript object 
app.use(express.json())

//inserting a dummy data into our database 
//app.post is used to add or insert the data into our databse
app.post("/signup",async(req,res)=>{
    try{    

    //validate the data


    validateSignUpData(req);

    //Encrypt the password

    const {password} = req.body;

    const passwordHash = await bcrypt.hash(password,10)
    console.log(passwordHash)
        
    //creating user model dynamically

    //thats it we can insert user data dynamically
    // const user = new User(req.body);
    // console.log(req.body);


    //better way to create an user instance
    const user = new User({
        firstName,lastName,emailId,password:passwordHash,
    })

    
      await user.save();
      res.send("User Added Successfully")
    }catch(err){
        res.status(400).send("Error saving the user:" + err.message)
    }

})

app.post("/login",async(req,res)=>{
  
    try{
        const{emailId,password} = req.body;

        const user = await User.findOne(({emailId:emailId}))

        if(!user){
            throw new Error("Invalid credentials!!")
        }

        const ispasswordValid = await bcrypt.compare(password,user.password)
 
        if(ispasswordValid){
            res.send("Login Successfully!!!")
        }
        else{
            throw new Error("Invalid credentials!!")
        }
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }

})


//Get user by email
app.get("/user",async(req,res)=>{
    const userEmail = req.body.emailId

    try{
        //returns only one document inorder to return only one document for same email having multiple documents
        const user = await User.findOne({emailId:userEmail})
        if(!user){
            res.status(404).send("User not found")
        }
        else{
            res.send(user);
        }

        //find({}) returns all documents in database 
    //     const user = await User.find({emailId: userEmail});
    //    if(user.length === 0){
    //     res.status(404).send("User not found");
    //    }
    //    else{
    //     res.send(user);
    //    }
    }
    catch(err){
        res.status(400).send("Something went wrong")
    }
})

//let us find user by id
app.get("/userId",async(req,res)=>{
     
    const userId = req.body.userId;

    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).send("User not Found")
        }
        else{
            res.send(user)
        }
    }
    catch(err){
        res.status(400).send("Something went wrong")
    }
})

//Feed API - GET /feed - get all the users from the database

app.get("/feed",async(req,res)=>{
    try{
        const user = await User.find({});
        res.send(user)
    }
    catch(err){
        res.status(400).send("Something went wrong")
    }
})

//delete a userby
app.delete("/user",async(req,res)=>{
    const userId = req.body.userId
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully")
    }
    catch(err){
        res.status(400).send("Something went wrong")
    }
})


app.patch("/user/:userId",async(req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;
    console.log(req.params)
    console.log(data);
    try{

       const ALLOWED_UPDATES = [
        "photoUrl",
        "about",
        "age",
        "skills",
       ]

       const isUpdatedAllowed = Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k))

       if(!isUpdatedAllowed){
        throw new Error("Update not allowed")
       } 

       if(data?.skills.length>10){
        throw new Error("Skills cannot be more than 10")
       }

       const user  = await User.findByIdAndUpdate({_id:userId},data,{
            returnDocument:"After",
            runValidators:true,
        })
        //console.log(user)
        res.send("User updated successfully")
    }
    catch(err){
        res.status(400).send("UPDATE FAILED:" + err.message)
    }
})

connectDB().then(()=>{
// always first connect to the database and then start listening to requests
    console.log("Database connection established...")
    app.listen(7777,()=>{
        console.log("Server is successfully listening on port 7777")
    })
    
})
.catch((err)=>{
    console.log("Database cannot be connected!!!")
})




