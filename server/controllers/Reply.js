const Reply=require("../models/Reply");
const Comment=require("../models/Comment");


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


        if(!reply){
            return res.status(417).json({
                success:false,
                message:"Cant reply to the comment"
            })
        }

        //update comment's replies
        comment.replies.push(reply._id);
        await comment.save();

        //send successful response
        return res.status(200).json({
            success:true,
            message:"replied successfully",
            reply
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


        //now delete the reply
        const deletedReply=await Reply.findByIdAndDelete(replyId);

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
            deletedReply,
            comment
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
        }).sort({createdAt:-1});


        if(!replies){
            return res.status(417).json({
                success:false,
                message:"Replies for the comment cant be found"
            })
        }

        //return the replies
        return res.status(200).json({
            success:true,
            message:"Replies fetched successfully for the comment",
            replies,
            commentCheck,
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