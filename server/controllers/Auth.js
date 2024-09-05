const User=require("../models/User");
const OTP=require("../models/OTP");
const otpGenerator=require("otp-generator");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const cloudinary=require('cloudinary').v2;
const mailSender=require('../utils/mailSender');
require("dotenv").config();
const {uploadImageToCloudinary}=require("../utils/imageUploader");
const {passwordUpdated}=require("../mail/templates/passwordUpdate");
const { cloudinaryConnect } = require("../configs/cloudinary");
const welcomeTemplate = require("../mail/templates/newJoining");
// const {getAuth} =require("firebase-admin");

var admin = require("firebase-admin");
const getAuth=admin.auth;

if (!admin.apps?.length) {
    var serviceAccount = require("../configs/firebase-admin-config")
  
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  


async function sendJoiningEmail(email,name){
    try{
        const mailResponse=await mailSender(email,"Verification Email from Confetti",welcomeTemplate(name));
    }
    catch(error){
        console.log("Error occured while sending mails:",error);
        throw error;
    }
}



exports.sendotp=async(req,res)=>{
    try{
        const {email}=req.body;
        const checkUserPresent=await User.findOne({email});

        if(checkUserPresent){
            return res.status(415).json({
                success:false,
                message:"user already registered"
            })
        }

        var otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })

        let result=await OTP.findOne({otp:otp});
        
        while(result){
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            })
            result=await OTP.findOne({otp:otp});
        }

        const otpPayload={email,otp};
        const otpBody=await OTP.create(otpPayload);

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
            usn,
            username,
            password,
            confirmPassword,
            gender,
            branch,
            year,
            email,
            instagram,
            accountType,
            otp,
        }=req.body;

        let name = req.body.name;
        name = name.toLowerCase();
        
        const avatar=req?.files?.avatar;


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
            const result=await uploadImageToCloudinary(avatar,process.env.FOLDER_NAME,1000,1000);
            avatarUrl=result.secure_url;
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

            const userWithoutUnuseData = await User.findById(user._id)

            // const firebaseUser=await getAuth().createUser({
            //     email,
            //     password
            // })

            // if(!firebaseUser){
            //     return res.status(400).json({
            //         success:false,
            //         message:"Firebase signup failed"
            //     }

            //     )
            // }
            
            sendJoiningEmail(email,user.name);


            
        return res.status(200).json({
            success:true,
            message:"Sign up Successfull",
            userWithoutUnuseData
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
        return res.status(415).json({
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
          expiresIn:"3h",
        })
        user.token=token;
        user.password=undefined;
  
         //create cookie and send response
        const options={
          expires:new Date(Date.now()+3*60*60*1000),
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
        return res.status(415).json({
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
        const { oldPassword, newPassword,userId} = req.body;
        const uid=userId || req.user.id;
         
        const userDetails = await User.findById(uid);
   
       

    //Validation
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        );
        if (!isPasswordMatch) {
        
            return res
                .status(415)
                .json({ success: false, message: "The password is incorrect" });
        }


    //Hashing and updating    
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            uid,
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

exports.validateSignup = async (req, res) => {
    try {
        const { email, username, usn } = req.body;
        const checkUserPresent = await User.findOne({ email });
        if (checkUserPresent) {
            return res.status(200).json({
                success: true,
                flag:false,
                message: "User already registered with this email",
            });
        }
        const checkUsername = await User.findOne({ username });
        if (checkUsername) {
            return res.status(200).json({
                success: true,
                flag:false,
                message: "Username already taken",
            });
        }

        const checkUsn = await User.findOne({ usn });
        if (checkUsn) {
            return res.status(200).json({
                success: true,
                flag:false,
                message: "USN already registered",
            });
        }

        return res.status(200).json({
            success: true,
            flag:true,
            message: "User can be registered",
        });
    }
    catch (error) {
        console.log("Error while validating the signup:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
