const express = require("express")//importing express module 

const app = express()//creating a new web server using express 


//this function is request handler

// app.use("/",(req,res)=>{
//     res.send("Hello From the dashboard")
// })


app.use("/test",(req,res)=>{
    res.send("Namaste From the server")
})
app.use("/hello",(req,res)=>{
    res.send("hello hello hello")
})




app.listen(7777,()=>{
    console.log("Server is Succesfully listening on port 7777...")
})//used to listen to the incoming requests on a particular port

