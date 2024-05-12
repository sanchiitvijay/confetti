const Post = require("../models/Post")

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

