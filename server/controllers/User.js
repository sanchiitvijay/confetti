const User=require("../models/User");
const Notification=require("../models/Notification");

//updateUserDetails->to check what needs to be updated
//also update  req.user object,check for token
//make sure u make password in req.user =null or undefind
//or simply not just touch it 
//for reference->look for auth controllers 


//Note: already have controller for changing passwrod in auth


//create user already done in auth controller 

exports.getAllUsers=async(req,res)=>{
    try{
        const users=await User.find({});

        return res.status(200).json({
            success:true,
            message:"All users fetched successfully",
            users
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Some error occurred while fetching the users"
        })
    }
}


exports.removeUser=async(req,res)=>{
    try{
        const userId=req.body.userId || req.user.id;
        if(!userId){
            return res.status(404).json({
                success:false,
                message:"Need user id"
            })
        }


       
        //fetch the user first
        const user=await User.findById(userId);

        //delete his notfications to clear the db
        while(user?.notfications?.length){
            notificationId=user.notfications.pop();
            await Notification.findByIdAndDelete(notificationId);
        }

        //now remove the user 
        const deletedUser=await User.findByIdAndDelete(userId);

        //return response
        return res.status(200).json({
            success:true,
            message:"Deleted the user successfully",
            deletedUser
        })



    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Couldnt remove the user"
        })
    }
}
