const mongoose = require('mongoose')


const  connectDB = async ()=>{
    
    await mongoose.connect("mongodb+srv://eshwar:VU5CGD7q3AGMBnfH@namastenode.cgsl7.mongodb.net/")

}

module.exports = connectDB;
