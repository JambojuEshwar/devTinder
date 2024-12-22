//this is a  middleware function  it checks the token if it is matched then proceed to next handler by next()
//else return a response as unauthorized request which stops to not go further request handlers
const adminAuth = (req,res,next)=>{
    //Logic of checking the request is authorized 
     const token = "xyz"
 
     const isAdminAuthorized = token === "xyz"
     if(!isAdminAuthorized){
         res.status(401).send("Unauthorized request")
     }
     else{
         next()
     }
} 
const userAuth = (req,res,next)=>{
    //Logic of checking the request is authorized 
    
    console.log("User auth is getting checked")
    const token = "xyz"
 
     const isAdminAuthorized = token === "xyz"
     if(!isAdminAuthorized){
         res.status(401).send("Unauthorized request")
     }
     else{
         next()
     }
} 

module.exports={
    adminAuth,
    userAuth
}