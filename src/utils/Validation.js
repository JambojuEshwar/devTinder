const validator = require('validator')


const validateSignUpData = (req)=>{
   
    const {firstName,lastName,emailId,password} = req.body;

    if(!firstName || !lastName){
        throw new Error("firstName && lastName are mandatory!!")
    }

    else if(!validator.isEmail(emailId)){
        throw new Error("INVALID EMAIL ID : " + emailId);
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please Enter a Strong Password : " + password)
    }

};

const validateEditProfileData = (req)=>{
    const allowedEditFields = [
        "firstName",
        "lastName",
        "photoUrl",
        "age",
        "about",
        "skills"
    ]

    const isEditAllowed = Object.keys(allowedEditFields).every(field => allowedEditFields.includes(field))

    return isEditAllowed
}


module.exports={
    validateSignUpData,
    validateEditProfileData,
}