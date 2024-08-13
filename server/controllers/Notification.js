const Device=require('../models/Device');

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
        console.log("IDENTIFIER",identifier);
        console.log("USERID",userId);
        const identifierArray=identifier.split("|");
        const userAgent=identifierArray[0];
        const userCores=identifierArray[1];
        const token=identifierArray[2];

        const userPresent=await Device.findOne({user:userId});
        console.log(userPresent)
        console.log("USER TRIED TO FIND");
        if(!userPresent){
            console.log("CREATING USER")
            await Device.create({
                user:userId,
                devices:[identifier]
            })          
            console.log("CREATED IT")
        }
        else{
            console.log("USER THERE")
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
                console.log("DEVICE not there")
                userPresent.devices.push(identifier);
                await userPresent.save();
            }
            else{
                console.log("Device there")
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
