const express = require("express")//importing express module 

const app = express()//creating a new web server using express 


//this function is request handler


//order of routing matters a lot so parameters after / are matched and other routes are not executed so write the wild card route at last 

// app.use("/",(req,res)=>{
//     res.send("Hello From the dashboard")
// })

//This will only handle GET call to /user

 //using this no other calls are executed only hahahaah is printed  so therefore order matters a lot
// app.use("/user",(req,res)=>{
//     res.send("HAHAHAHAHA")
// })

app.get("/user",(req,res)=>{
    res.send({firstName:"Jamboju",lastName:"Eshwar"})
})


app.post("/user",(req,res)=>{
    // saving data to db or sending the data to database
    res.send("Data successfully saved to the database!")
})
app.patch("/user",(req,res)=>{ 
    res.send("Data updated as per requirement not entire application is updated only required part is updated!")
})
app.put("/user",(req,res)=>{
    
    res.send("Data updated for entire application!")
})

app.delete("/user",(req,res)=>{
    res.send("Deleted Successfully")
})

//this will match all the HTTP method API calls to /test
app.use("/test",(req,res)=>{
    res.send("Namaste From the server")
})
// app.use("/hello",(req,res)=>{
//     res.send("hello hello hello")
// })

// this hello/2 is not executed beacuse above hello/ is matched with hello/2 so if you want to do so then change the order of writing 
// app.use("/hello/2",(req,res)=>{
//     res.send("Chin tapak dum dum")
// })

//now hello/2 is executed
// app.use("/hello",(req,res)=>{
//     res.send("hello hello hello")
// })



// app.use("/",(req,res)=>{
//     res.send("Hello From the dashboard")
// })



app.listen(7777,()=>{
    console.log("Server is Succesfully listening on port 7777...")
})//used to listen to the incoming requests on a particular port

