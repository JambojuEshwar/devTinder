const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema =  mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        minLength:3,
        maxLength:30,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,
    },
    password: {
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min:18,
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://www.geographyandyou.com/images/user-profile.png"
    },
    about:{
        type:String,
        default:"This is default about a user"
    },
    skills:{
        type:[String],
    }

},{
    timestamps: true,
});


userSchema.index({firstName:1,lastName:1})

userSchema.methods.getJWT = async function(){
    const user = this;

    const token = await jwt.sign({_id:user._id},"DEV@Tinder$790",{
        expiresIn:"7d",
    })
    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;

    const passwordHash = user.password

    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash)

    return isPasswordValid;
}

module.exports = mongoose.model("User",userSchema)
