const mongoose=require("mongoose");

const CommentSchema=new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user",
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"post"
    },
    description:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    replies:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"reply"
    }]
    
}, {
    timestamps:true
});

module.exports=mongoose.model("comment",CommentSchema);