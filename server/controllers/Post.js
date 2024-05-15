const Post = require("../models/Post")
const User=require("../models/User");

exports.createPost = async(req, res)=>{
    try{
        const {
            userId,
            description,
            caption,
            
        } = req.body;

        if(!description || !caption) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            })
        }

        const post = await Post.create({
            author: userId,
            description,
            caption,
            likes:[],
            comments:[],
        });

        return res.status(200).json({
            success: true,
            message: "Post has been created successfully",
            post
        })

    } catch (error) {
        console.log("Error while creating the post");
        return res.status(500).json({
            success: false,
            message: "Error while creating your post",
        })
    }
}


exports.editPost = async(req, res) => {
    try {
        const {postId, description, caption} = req.body;
        const post = await Post.findById(postId)
        
        if (!post) {
            return res.status(500).json({
                success: false,
                message: "Could not find the post"
              })
        }
    
        post.description = description;
        post.caption = caption;
    
        const updatedPost = await post.save();

        if(!updatedPost) {
            return res.status(500).json({
                success: false,
                message: "Error while saving the post"
              })
        }

        return res.status(200).json({
          success: true,
          message: "Post has been updated succesfully",
          updatedPost
        })
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Error while updating the post"
          })
    }
}

exports.deletePost = async(req, res) => {
    
    try {
        const result =await Post.deleteOne({ _id: req.body.postId })
        
        return res.status(200).json({
            success: true,
            message: "Post has been deleted succesfully",
            result
        })
        
    } catch (error) {
        return res.success(500).json({
            success: false,
            message: "Error while deleting the post"
        })
    }
}

exports.getPosts = async(req, res) => {
    try {
        const posts =await Post.find().sort({ createdAt: -1 });
    
        return res.status(200).json({
            success: true,
            message: "Post has been sent successfully",
            posts
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while fetching the posts"
          })
    }
}


//Get posts function for the admin to get the posts by a user's id
exports.getUserPosts=async(req,res)=>{
    try{
        const {userId}=req.body;
        if(!userId){
            return res.status(404).json({
                success:false,
                message:"Provide the user id"
            })
        }

        const posts=await Posts.findById({author:userId});

        const user=await User.findById(userId);
        return res.status(200).json({
            success:true,
            message:`Posts fetched for the user ${user?.name}`,
            posts
        })
    }
    catch(error){
        console.log(error);
        console.log(error.message);
        console.error(error);
        return res.status(500).json({
            success:false,
            message:`Couldnt get the posts for the user ${user?.name}`
        })
    }
}

exports.reportPost = async(req, res)=> {
    const postId = req.body;
    const userId = req.user._id;

    const post = await Post.findById(postId)
    post.reports += 1;

    if(post.reports === 3) {
        this.deletePost(postId);
        const user = await User.findById(userId)
        user.reports += 1;

        if(user.reports === 5) {
            const deletedUser = await User.findByIdAndDelete(userId)
            if(!deletedUser) {
                return res.status(500).json({
                    success:false,
                    message:`Couldnt delete the reported the user ${user?.name}`
                })
            }
        }
    }
}



exports.deleteAllPosts=async(req,res)=>{
    try{
     
        const userId=req.user.id;
        

        if(!userId){
            return res.status(200).json({
                success:false,
                message:"please provide user id"
            })
        }


        //find all posts for user and delete them
        const deletedPosts=await Post.findByIdAndDelete({author:userId});

        //return res
        return res.status(200).json({
            success:true,
            message:"Posts deleted successfully for the user",
            deletedPosts
        })


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Some error occured while deleting all the posts for this user"
        })
    }
}
