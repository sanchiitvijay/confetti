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
        enum:['Male','Female'],
    },
    branch:{
        type:String,
        enum:['CSE','ISE','ECE','EEE','']
    },
    year:{
        type:Number,
        enum:[1,2,3,4],
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