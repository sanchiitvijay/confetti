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
        // requried:true,
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
    branch:{
        type:String,
    },
    year:{
        type:String,
    },
    name:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    reports:{
        type:Number,
        default: 0,
    },

},
{
    timestamps:true
});


module.exports=mongoose.model("post",PostSchema);