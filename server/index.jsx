const express=require("express");
const app=express();





//import routes here later


//connection for databse
const database=require("./configs/database");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const {cloudinaryConnect}=require("./configs/cloudinary");
const fileUpload=require("express-fileupload");
const dotenv=require("dotenv");

dotenv.config();


//port no
const PORT=process.env.PORT || 4000;

//connect
database.connect();


//cloudinary connect
cloudinaryConnect();


//to parse json
app.use(express.json());

//to parse cookie
app.use(cookieParser());

//establishing connection between frontend and backend through cors
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true
    })
);

//mount routes here



//default route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running"
    })
});

//Activate server

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`)
})



