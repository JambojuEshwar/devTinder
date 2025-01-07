const express = require('express')
const connectDB = require("./config/database")
const app = express()
const User = require("./models/user")

//this app.use handles all routes get post put delete 
//express.json() middleware converts the json data recieved to javascript object 
app.use(express.json())

//inserting a dummy data into our database 
//app.post is used to add or insert the data into our databse
app.post("/signup",async(req,res)=>{

    //creating user model dynamically

    //thats it we can insert user data dynamically
    const user = new User(req.body);
    console.log(req.body);

    // const user = new User({
    //     firstName : "Jamboju",
    //     lastname: "Eshwar",
    //     emailId:"eshwar25in@gmail.com",
    //     password:"es21012003"
    // })
    
    try{    
       await user.save();
      res.send("User Added Successfully")
    }catch(err){
        res.status(400).send("Error saving the user:" + err.message)
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




