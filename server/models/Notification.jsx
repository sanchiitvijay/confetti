const mongoose=require("mongoose");

const NotificationSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    isAccepted:{
        type:Boolean
    }
});


module.exports=mongoose.model("notification",NotificationSchema);