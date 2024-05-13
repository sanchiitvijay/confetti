const Comment=require("../models/Comment");
const Post=require("../models/Post");
exports.createComment=async(req,res)=>{
    try{
        const {
            postId,
            description,
        }=req.body;
    
        const userId=req.user.id;

         //Validation for user
        if(!userId || !description || !postId){
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            })
        }
       
        //find Post exists or not
        const post=await Post.findById({_id:postId});
    
        if(!post){
            return res.status(404).json({
                success:false,
                message:"Post cant be found"
            })
        }


        //now post checked , create comment and push it in to the post 
        const comment=await Comment.create({
            author:userId,
            post:post._id,
            description:description,
            replies:[],
        });

        if(!comment){
            return res.status(400).json({
                success:false,
                message:"Comment cant be created"
            })
        }

        //now comment created now push it into the post 
        post.comments.push(comment._id);
        await post.save();


        //return successful response
        return res.status(200).json({
            success:true,
            message:`Comment created successfully created for the post with the id:${post._id}`,
            comment,
        })


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while trying to comment on the post"
        })
     }   
    
}


exports.removeComment=async(req,res)=>{
    try{
        //get the post and its comment id
        const{
            commentId,
            postId,
        }=req.body;
        
        //validate
        if(!commentId || !postId){
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            })
        }

        //find the comment and post and validate them
        const comment=await Comment.findById({_id:commentId});

        if(!comment){
            return res.status(404).json({
                success:false,
                message:"Comment cant be found"
            })
        }

        const post=await Post.findById({_id:postId});

        if(!post){
            return res.status(404).json({
                success:false,
                message:"Post of the comment cant be found"
            })
        }

        //pull the comment from the post 
       
    }
    catch(error){
        console.log(error);
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"comment cant be removed"
        })
    }
}
    
