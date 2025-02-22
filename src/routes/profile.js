const express = require('express')

const profileRouter = express.Router()

const {userAuth} = require('../middlewares/auth')

const {validateEditProfileData} = require('../utils/Validation')

const bcrypt = require('bcrypt')

const validator = require('validator')

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
       
       const user = req.user;
        res.send(user)
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
})


profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        if(!validateEditProfileData){
            throw new Error("Invalid Edit Request!!")
        }
    
        const loggedInUser = req.user
        //this returns loggedinuser that comes from userauth after validation
        console.log(loggedInuser)
    
        Object.keys(req.body).every(key => (loggedInuser[key]=req.body[req]))
    
        await loggedInuser.save()
    
       res.json({
        message: `${loggedInUser.firstName} Profile Updated Successfully`,
        data:loggedInUser
       })
    
    }

    catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
})



profileRouter.patch("/profile/forgotpassword",async(req,res)=>{
    
    const {emailId,password} = req.body
    
    try{
        
    if(!emailId || !password){
        throw new Error("Email and password are required!!")
    }

    if(!validator.isEmail(emailId)){
        throw new Error("INVALID EMAILID : " + emailId)
    }

    const user = await User.findOne({emailId})

    if(!user){
        throw new Error("User not found!!")
    }

    if(!validator.isStrongPassword(password)){
        throw new Error("INVALID PASSWORD : ")
    }

    const newPasswordHash = await bcrypt.hash(password,10)

    user.password = newPasswordHash
    
    await user.save()
   
    res.json({message:"Password Updated Successfully!!"})

    }
    catch(err){
        res.status(500).json({error:"An error occured: " + err.message})
    }

})


module.exports = profileRouter