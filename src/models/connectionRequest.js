const mongoose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema(
    {
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,

        //reference to User collection linked with User collection mogodb does it very well 
        ref:"User",
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignore","interested","accepted","rejected"]
        }
        
    },
    
   },
   { timestamps: true }

)

connectionRequestSchema.index({fromUserId:1,toUserId:1})

connectionRequestSchema.pre("save",function(next){
    const connectionRequest = this
    //check if fromuserid is same as touserid

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send Connection request to yourself!! ")
    }
    next()
})

const ConnectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequestSchema)

module.exports = ConnectionRequestModel