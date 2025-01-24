const mongoose = require('mongoose');

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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email Address"+value)
            }
        },
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

module.exports = mongoose.model("User",userSchema)
