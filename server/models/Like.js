const mongoose=require("mongoose");


const LikeSchema=new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'post'
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user',
    }
},{
    timestamps:true
})

module.exports=mongoose.model("like",LikeSchema);