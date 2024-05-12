const mongoose=require("mongoose");


const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    usn:{
        type:String,
        required:true,
    },
   
    password:{
        type:String,
        required:true,
    },
    confirmPassword:{
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
        required:true,
        enum:['CSE','ISE','ECE','EEE','']
    },
    year:{
        type:Number,
        required:true,
        enum:[1,2,3,4],
        },
    email:{
        type:String,
        required:true,
    },
    instagram:{
        type:String,
        required:true,
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
            required:true,
            ref:"notification"
        }
    ],
    lastPostAt:{
        type:Date
    }
    }
);


module.exports=mongoose.model("user",UserSchema);