const mongoose=require("mongoose");


const ReplySchema=new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user',
    },
    comment:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'comment'
    },
    description:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        deafult:Date.now
    }

},{
    timestamps:true
});


module.exports=mongoose.model("reply",ReplySchema);