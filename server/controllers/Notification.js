const Device=require('../models/Device');
const Post = require('../models/Post');
const User = require('../models/User');

exports.addUpdateDevice=async(req,res)=>{
    try{
        const identifier=req.body.identifier;
        const userId=req.user.id || req.body.userId;
        if(!identifier){
            return res.status(404).json({
                success:false,
                message:"device token not found"
            })
        }
        if(!userId){
            return res.status(404).json({
                success:false,
                message:"userid  not sent in request"
            })
        }
        const identifierArray=identifier.split("|");
        const userAgent=identifierArray[0];
        const userCores=identifierArray[1];
        const token=identifierArray[2];

        const userPresent=await Device.findOne({user:userId});
        if(!userPresent){
            await Device.create({
                user:userId,
                devices:[identifier]
            })
        }
        else{
            const devices=userPresent.devices;
            let index=-1;
            for(let i=0;i<devices.length;i++){
                const splitDevice=devices[i].split("|");
                const currAgent=splitDevice[0];
                const currCores=splitDevice[1];
                if(currAgent===userAgent && currCores===userCores){
                    index=i;
                }
            }

            if(index===-1){
                //not there make a new entry
                userPresent.devices.push(identifier);
                await userPresent.save();
            }
            else{
               //device token was there,update the token
               userPresent.devices[index]=identifier;
               await userPresent.save();
            }
        }
        return res.status(200).json({
            success:true,
            message:"Device handled properly ",
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Error while handling device"
        })
    }
}


exports.getInstaId = async (req, res) => {
    try {
        const { postId } = req.body;
        if (!postId) {
            return res.status(404).json({
                success: false,
                message: "Postid not found"
            })
        }

        const post = await Post.findById(postId);
        const user = await User.findById(post.author);
        return res.status(200).json({
            success: true,
            message: "Instagram Id fetched",
            instagram: user.instagram
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error while fetching Instagram Id"
        })
    }
}