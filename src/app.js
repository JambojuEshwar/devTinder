const express = require('express')

const app = express()

const {adminAuth, userAuth} = require("./middlewares/auth")

//Handle Auth Middleware for all GET POST,....requests
app.use("/admin",adminAuth)


app.get("/user",userAuth,(req,res)=>{
    
    res.send("User Data is sent")
})

app.get("/admin/getAllData",(req,res)=>{
    res.send("All Data Sent")
})

app.get("/admin/deleteUser",(req,res)=>{
    res.send("Deleted a User")
})




app.listen(7777,()=>{
    console.log("Server is successfully listening on port 7777")
})


