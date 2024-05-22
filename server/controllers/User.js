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

exports.editUser = async(req, res) => {
    try {
        const {
            name,
            usn,
            year,
            instagram
        } = req.body;
        const userId = req.user.id || req.body.userId
        const user = await User.findById(userId)
        
        if (!user) {
            return res.status(500).json({
                success: false,
                message: "Could not find the user"
              })
        }
    
        user.name = name;
        user.usn = usn;
        user.year = year;
        user.instagram = instagram;
    
        const updatedUser = await user.save();

        if(!updatedUser) {
            return res.status(500).json({
                success: false,
                message: "Error while saving the User"
              })
        }

        return res.status(200).json({
          success: true,
          message: "User has been updated succesfully",
          updatedUser
        })
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Error while updating the user"
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

exports.deleteGraduates= async(req, res) => {
    try {
        const graduates = await User.find({year: 4})
    
        for (const grad of graduates){
            await User.findByIdAndDelete(grad._id);
        }

        return res.status(200).json({
            success: true,
            message: "Graduates have been deleted succesfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while deleting the graduates"
        })
    }
}

exports.promoteStudents = async(req, res) => {
    try {
        const { year } = req.body;
        if(!year) {
            return res.status(500).json({
                success: false,
                message: "Error while fetching the year"
            })
        }
        const students = await User.find({year: year})
        
    
        for (const student of students){
            await User.findByIdAndUpdate(
                student._id,
                { $inc: {year: 1}},
                { new: true }
            );
        }
    
        return res.status(200).json({
            success: true,
            message: "Students year has been increased by 1 deleted succesfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while increasing the year of the students"
        })
    }
}