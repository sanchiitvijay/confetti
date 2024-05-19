const mongoose=require("mongoose");
require("dotenv").config();

exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("DB CONNECTION SUCCESSFUL"))
    .catch((err)=>{
        console.log("DB CONNECTION ISSUES")
        console.error(err);
        process.exit(1);
    })
}