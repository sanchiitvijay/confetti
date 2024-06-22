const User=require("../models/User");
const OTP=require("../models/OTP");
const otpGenerator=require("otp-generator");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const cloudinary=require('cloudinary').v2;
const mailSender=require('../utils/mailSender');
require("dotenv").config();


const {passwordUpdated}=require("../mail/templates/passwordUpdate");
const { cloudinaryConnect } = require("../configs/cloudinary");


exports.sendotp=async(req,res)=>{
    try{
        const {email}=req.body;
        const checkUserPresent=await User.findOne({email});

        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"user already registered"
            })
        }

        var otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })

        console.log("Otp generated successfully");

        let result=await OTP.findOne({otp:otp});

        console.log("DB INTERACTION HO GYI H");
        
        while(result){
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            })
            result=await OTP.findOne({otp:otp});
            console.log("LOOP KE ANDAR HU MAI:")
        }

        const otpPayload={email,otp};
        const otpBody=await OTP.create(otpPayload);
        console.log("DB Entry for otp Created");
        console.log(otpBody);

        return res.status(200).json({
            success:true,
            message:"otp sent successfully"
        })
    }
    catch(error){
        console.log("Error while sending the otp:",error);
        return res.status(500)({
            success:false,
            message:error.message
        })
    }
}


exports.signup=async(req,res)=>{
    try{
        const {
            name,
            usn,
            username,
            password,
            confirmPassword,
            gender,
            branch,
            year,
            email,
            avatar,
            instagram,
            accountType,
            otp,
        }=req.body;

        console.log(req.body)


        if(!name || !password || !confirmPassword || !email || !gender || !username){
            return res.status(403).json({
                success:false,
                message:"Some fields are required!!"
            })
        }


        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and Confirm Password value do not match, try again please "
            })
        }


        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User is already registered"
            })
        }

        
        const existingUsername=await User.findOne({username});
        if(existingUsername){
            return res.status(400).json({
                success:false,
                message:"Username is already registered"
            })
        }
        const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp[0].otp);
        console.log(otp);

        if(recentOtp.length==0){
            return res.status(400).json({
                success:false,
                message:"OTP NOT FOUND"
            })
        }

        else if(otp!==recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid otp"
            })
        }

        const hashedPassword=await bcrypt.hash(password,10);

        //uploading file to cloudinary and generating url if they have provided
        let avatarUrl=''
        if(avatar){
            try{
            cloudinaryConnect()
            const result=await cloudinary.uploader.upload(avatar.tempFilePath);
            avatarUrl=result.secure_url;
            console.log("Image Url of Cloudinary:",avatarUrl)
            }
            catch(error){
                console.log("FILE COULD NOT BE UPLOADED",error)
            }
        }
        else{
            avatarUrl=`https://api.dicebear.com/7.x/initials/svg?seed=${name?.split(" ")[0]} ${name?.split(" ")[1]}`
        }

        const user=await User.create({
            name,
            usn,
            username,
            email,
            instagram,
            password: hashedPassword,
            accountType,
            displayPicture:avatarUrl,
            branch,
            year,
            gender,
            
            });


        return res.status(200).json({
            success:true,
            message:"Sign up Successfull",
            user
        })
    }
    catch(error){
        console.log("Error in signing up:",error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered,please try again"
        })
    }
}


//login
exports.login=async(req,res)=>{
    try{
      //get data
      const {email,password}=req.body;
      //validate data
      if(!email || !password){
        return res.status(403).json({
          success:false,
          message:"All fields are required,please try again"
        })
      }
  
      //check if user exists or not
      const user=await User.findOne({email}).populate("notifications");
      if(!user){
        return res.status(401).json({
          success:false,
          message:"User does not exist, Sign up first please"
        })
      }
  
      //password Check
      if(await bcrypt.compare(password,user.password)){
        const payload={
          email:user.email,
          id:user._id,
          accountType:user.accountType,
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET,{
          expiresIn:"36h",
        })
        user.token=token;
        user.password=undefined;
  
         //create cookie and send response
        const options={
          expires:new Date(Date.now()+3*24*60*60*1000),
          httpOnly:true,
        }
        res.cookie("token",token,options).status(200).json({
          success:true,
          token,
          user,
          message:"Logged in successfully"
        })
      }
  
      else{
        return res.status(401).json({
          success:false,
          message:"Password is incorrect"
        })
      }
  
  
     
    } 
    catch(err){
      console.log(err);
      return res.status(500).json({
        success:false,
        message:"Login Failure, please try again"
      })
    }
  }
  

exports.changePassword=async(req,res)=>{

  try {
         
        const userDetails = await User.findById(req.user.id);
    //get data from req body
     //get oldPassword,newPassword,confirmNewPassword
        const { oldPassword, newPassword, confirmNewPassword } = req.body;

    //Validation
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        );
        if (!isPasswordMatch) {
        
            return res
                .status(401)
                .json({ success: false, message: "The password is incorrect" });
        }


        if (newPassword !== confirmNewPassword) {
        
            return res.status(400).json({
                success: false,
                message: "The password and confirm password does not match",
            });
        }

    //Hashing and updating    
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: encryptedPassword },
            { new: true }
        );

    
    //Send mail
        try {
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            );
            console.log("Email sent successfully:", emailResponse.response);
        } catch (error) {
            
            console.error("Error occurred while sending email:", error);
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            });
        }

        
        return res
            .status(200)
            .json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        
        console.error("Error occurred while updating password:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error.message,
        });
    }
}