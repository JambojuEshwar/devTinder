// require("dotenv").config();
const express = require('express')
const connectDB = require("./config/database")
const app = express()

const cookieParser = require('cookie-parser')

app.use(express.json())

app.use(cookieParser())



//this app.use handles all routes get post put delete 
//express.json() middleware converts the json data recieved to javascript object 



const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")
const userRouter = require("./routes/user")


app.use("/",authRouter)

app.use("/",profileRouter)

app.use("/",requestRouter)

app.use("/",userRouter)




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




