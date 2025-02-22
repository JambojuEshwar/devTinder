const mongoose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema(
    {
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
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