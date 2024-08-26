const Reply=require("../models/Reply");
const Comment=require("../models/Comment");
const User = require("../models/User");
var admin=require("firebase-admin");
const Device = require("../models/Device");
if (!admin.apps?.length) {
    var serviceAccount = require("../configs/firebase-admin-config")
  
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  
const messaging=admin.messaging();
const db=admin.firestore();

exports.createReply=async(req,res)=>{
    try{
        const userId=req.user.id;
        const {
            commentId,
            description,
        }=req.body;

        
        //validate
        if(!userId || !commentId || !description ){
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            })
        }

        //find the comment you want to reply for 
        const comment=await Comment.findById(commentId);

        //now create a reply for that comment
        const reply=await Reply.create({
            author:userId,
            comment:comment._id,
            description:description,
        });

        console.log("REPLY",reply);


        if(!reply){
            return res.status(415).json({
                success:false,
                message:"Cant reply to the comment"
            })
        }

        //push the reply in user
        const updatedUser=await User.findByIdAndUpdate(userId,{
            $push:{replies:reply._id}
        },{new:true})

        if(!updatedUser){
            return res.status(400).json({
                success:false,
                message:"Reply couldnt be pushed to the User"
            })
        }

        //update comment's replies
        comment.replies.push(reply._id);
        await comment.save();

        //notifications firebase code
        const newReply=await Reply.findOne({_id:reply._id}).populate({
            path:"comment",
            populate:{
                path:"post",
                populate:{
                    path:"author"
                }
            }
        }).exec();
        const postId=newReply.comment.post._id;
        const replyUser=newReply.author;
        const commentUser=newReply.comment.author;
   
       
        //messaging flow 
        
        const userDevice = await Device.findOne({ user: commentUser });
        console.log("USER DEVICE", userDevice);
        const userDevices = userDevice?.devices;
        const userTokens = userDevices.map((device) => (
            device = device.split("|")[2]
        ))

        console.log("USERTOKENS", userTokens);
        if(commentUser.toString()!=replyUser.toString()){
            const message = {
                notification: {
                    title: "Reply added",
                    body: `${updatedUser?.username} replied to your comment on the Post of ${newReply.comment.post.author.username}`,
                   
                },
                data:{
                    url:`http://localhost:3000/feed/${postId}`
                }
            }
    
            console.log("MESSAGE", message);
    
            const sendPromises = userTokens?.map((token) => {
                return messaging.send({
                    ...message,
                    token: token,
                })
            });
    
            Promise.all(sendPromises)
                .then((response) => {
                    console.log('Successfully sent messages:', response);
                })
                .catch((error) => {
                    console.error('Error sending messages:', error);
                });
        }
        //firebase notifs coded here
        const replies = await Reply.find({comment:commentId}).sort({createdAt:-1}).populate("author").exec();
        

        /*******************************************Firestore reply notif code*******************************************************/
        const docRef=db.collection("Notifications").doc(commentUser._id.toString()).collection("notifications");
        if(docRef && commentUser._id.toString()!=replyUser.toString()){
            docRef.add({
                createdAt:admin.firestore.FieldValue.serverTimestamp(),
                description:`A reply was made by ${updatedUser?.username} to your comment`,
                type:`reply`,
                postId:postId,
            })
        }
        /******************************************Firestore code ends here ********************************************************/
        //send successful response
        return res.status(200).json({
            success:true,
            message:"replied successfully",
            replies,
        })

    }
    catch(error){
        console.log(error);
        console.log(error.message);
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Couldnt reply,pls try again(later)"
        })
    }
}


exports.deleteReply=async(req,res)=>{
    try{
        const {replyId}=req.body;
        const userId=req.user.id;
       
        //validate
        if(!replyId){
            return res.status(404).json({
                success:false,
                message:"Please provide reply id"
            })
        }
    
        //find the reply from db and check if exists
        const reply=await Reply.findById(replyId);
       
        if(!reply){
            return res.status(404).json({
                success:false,
                message:"Reply does not exist"
            })
        }
      
        //get the comment id from this
        const commentId=reply?.comment;
      
        //now find the comment to which you replied and
        // pull the reply from it
        const comment=await Comment.findByIdAndUpdate(commentId,{
            $pull:{
                replies:replyId
            }
        },{
            new:true
        });
        
        //pull the reply id from user model
        const updatedUser=User.findByIdAndUpdate(userId,{
            $pull:{replies:reply._id}
        },{new:true})

        if(!updatedUser){
            return res.status(400).json({
                success:false,
                message:"Reply couldnt be pulled to the User"
            })
        }
        
        //now delete the reply
        const deletedReply=await Reply.findByIdAndDelete(replyId);
        console.log("deleted it ")
        const replies = await Reply.find({comment:commentId}).sort({createdAt:-1}).populate("author").exec();

        if(!deletedReply){
            return res.status(400).json({
                success:false,
                message:"Couldnt remove the reply"
            })
        }
      
        //return successful respose
        return res.status(200).json({
            success:true,
            message:"reply successfully removed",
            replies
        })

      

    }
    catch(error){
        console.log(error);
        console.log(error.message);
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Couldnt delete reply,pls try again(later)"
        })
    }
}


exports.getAllReplies=async(req,res)=>{
    try{
        //get the comment for which you want all the replies 
        const {commentId}=req.body;

        //validate
        if(!commentId){
            return res.status(404).json({
                success:false,
                message:"Please provide the comment id"
            })
        }

        //check first if the comment exists or not
        const commentCheck=await Comment.findById(commentId);

        if(!commentCheck){
            return res.status(404).json({
                success:false,
                message:"Comment does not exist"
            })
        }

        //now move ahead and fetch the replies
        const replies=await Reply.find({
            comment:commentId,
        }).sort({createdAt:-1}).populate("author").exec();


        if(!replies){
            return res.status(415).json({
                success:false,
                message:"Replies for the comment cant be found"
            })
        }

        //return the replies
        return res.status(200).json({
            success:true,
            message:"Replies fetched successfully for the comment",
            replies
        })
    }
    catch(error){
        console.log(error);
        console.log(error.message);
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Couldnt get replies"
        })
    }
}