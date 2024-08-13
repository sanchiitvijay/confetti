const mongoose=require("mongoose");

const DeviceSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    devices:[
        {   
          
            type:String
        }
    ]
    
});


module.exports=mongoose.model("device",DeviceSchema);