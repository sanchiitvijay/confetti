const jwt=require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/User");


exports.auth=async(req,res,next)=>{

    //Flow: extract the token->verify it->append it req.user object
    try{

        const token=req.cookies.token || 
                        req.body.token ||
         req.header("Authorization").replace("Bearer ","");

        if(!token){
            return res.status(404).json({
                success:false,
                message:"Token is missing"
            })
        }
        console.log("JWT SECRET:",process.env.JWT_SECRET);
        console.log("TOKEN:",token);
        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decode;
        }
        catch(err){
            console.log(err);
            console.log(err.message);
            return res.status(401).json({
                success:false,
                message:"Token is invalid checked by jwt.verify"
            })
        }

        next();
    }

    catch(err){
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token"
        })
    }
    
}


exports.isStudent=async(req,res,next)=>{
    try{
        if(req.user.accountType!=="Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for students only"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified,please try again"
        })
    }
}



//isAdmin
exports.isAdmin=async(req,res,next)=>{
    try{
      if(req.user.accountType!=="Admin"){
        return res.status(401).json({
          success:false,
          message:"This is a protected route for Admin only"
        });
      }
      next();
    }catch(err){
      return res.status(500).json({
        success:false,
        message:"User role cannot be verified,please try again"
      })
    }
  }
  


