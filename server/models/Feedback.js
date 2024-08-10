const mongoose=require('mongoose');

const feedbackSchema=new mongoose.Schema({
    message:{
        type:String,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    }
});

module.exports=mongoose.model("Feedback",feedbackSchema);