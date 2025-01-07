const mongoose = require('mongoose')

//this is the correct way to handle the connection using async function
const  connectDB = async ()=>{
    
    await mongoose.connect("mongodb+srv://eshwar:VU5CGD7q3AGMBnfH@namastenode.cgsl7.mongodb.net/devTinder")

}

module.exports = connectDB;


 //this mongoose.connect returns a promise and also tells us that connection is established successfully or not
 //this is not correct way to handle 
// mongoose.connect(
//     "mongodb+srv://eshwar:VU5CGD7q3AGMBnfH@namastenode.cgsl7.mongodb.net/devTinder"
// )

