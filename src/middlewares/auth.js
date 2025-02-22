const jwt = require('jsonwebtoken')
const User = require('../models/user')


//this is a  middleware function  it checks the token if it is matched then proceed to next handler by next()
//else return a response as unauthorized request which stops to not go further request handlers (maintain our apis secure)

const userAuth = async(req,res,next)=>{

try{
    //Read the cookie from req.cookies
  const cookie = req.cookies
  //destructure the token from cookie 
  const {token} = cookie
   

//if token is not existing or tokens are cleared   
if(!token){
    res.send("Token is not valid!!!")
}

const decodeMessage = await jwt.verify("token","DEVTinder$790")

//jwt.verify returns a javascript object in the form of hash S9q7kQJxZ7W2db8H5Z5RL1Lz2ryNTWVmnzjktV5-2uk 
//on decoding this  we get this object 
// {
//     _id: "1234567890",
//     name: "John Doe",
//     role: "admin",
//     iat: 1609459200
//   }


//now we can extract the id from the decodedmessage
const {_id} = decodeMessage;

const user = await User.findById(_id)
if(!user){
    throw new Error("User Not Found")
}

req.user = user;

next()

}
catch(err){
    res.status(400).send("ERROR : " + err.message)
}
 
} 

module.exports={
    userAuth,
}