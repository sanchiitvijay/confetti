const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    usn:{
        type:String,
    },
   
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
        enum:['Male','Female','Other'],
    },
    branch:{
        type:String,
        enum:['CS','IS','AD','AI','AT','BT','CH','CI','CY','EC','EE','EI','IM','BA','MC','MD','ME','CV']
    },
    year:{
        type:String,
        enum:["First","Second","Third","Fourth"],
        },
    email:{
        type:String,
        required:true,
    },
    instagram:{
        type:String,
    },
    displayPicture:{
        type:String,
    },
    accountType:{
        type:String,
        enum:['Admin','Student'],
        default:'Student'
    },
    notifications:[
        {
            type:mongoose.Schema.Types.ObjectId,
            // required:true,
            ref:"notification"
        }
    ],
    lastPostAt:{
        type:Date
    },
    reports:{
        type:Number,
        default:0,
    },
    token:{
        type:String
    },
    },
    {
        timestamps: true
    }
);


module.exports=mongoose.model("user",UserSchema);