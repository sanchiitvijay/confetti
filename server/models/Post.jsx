const mongoose=require("mongoose");

const PostSchema=new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    description:{
        type:String,
        required:true,
    }
    ,
    caption:{
        type:String,
        requried:true,
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'like',
        required:true,
    }],
    comments:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:'comment',
       required:true, 
    }],
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    reports:{
        type:Number,
    }
});


module.exports=mongoose.model("post",PostSchema);