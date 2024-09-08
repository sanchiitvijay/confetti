const express=require("express");
const app=express();
require('events').EventEmitter.defaultMaxListeners = 0
const path = require('path');

//importing routes here
const userRoutes=require("./routes/User");
const postRoutes=require("./routes/Post");
const likeRoutes=require("./routes/Like");
const commentRoutes=require("./routes/Comment");
const replyRoutes=require("./routes/Reply");
const feedbackRoutes=require("./routes/Feedback");
const notificationRoutes=require("./routes/Notification");
//connection for databse
const database=require("./configs/database");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const { cloudinaryConnect }=require("./configs/cloudinary");
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
        origin:"https://confetti-five.vercel.app/",
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
app.use('/api/v1/feedback',feedbackRoutes);
app.use('/api/v1/notification',notificationRoutes);


//default route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running"
    })
});

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, '../client/build'))); 

// Default route for serving React's index.html for all non-API requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});


//Activate server

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`)
})



