const express=require("express");
const app=express();

//importing routes here
const userRoutes=require("./routes/User");
const postRoutes=require("./routes/post");
const likeRoutes=require("./routes/Like");
const commentRoutes=require("./routes/Comment");
const replyRoutes=require("./routes/Reply");

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


//for file uploads
app.use(
    fileUpload({
      useTempFiles:true,
      tempFileDir:"/tmp",
    })
  );
  

  
//mount routes here
app.use('/api/v1/auth',userRoutes);
app.use('/api/v1/post',postRoutes);
app.use('/api/v1/like',likeRoutes);
app.use('/api/v1/comment',commentRoutes);
app.use('/api/v1/reply',replyRoutes);



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



