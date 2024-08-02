const Post = require("../models/Post")
const User=require("../models/User");
const Notification=require("../models/Notification");

exports.createPost = async(req, res)=>{
    try{
        const {
            description,
            caption,
            year
        } = req.body;

        const userId = req.body.userId || req.user.id
        const name = req.body || req.user
        
        if(!userId || !description || !caption) {
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
        if(name && year) {
            const confessedTo = await User.findOne({name, year})

            if(confessedTo) {
                const notification = await Notification.create({
                    sender: userId,
                    receiver: confessedTo._id,
                    post: post._id,
                    message: "Seems Like you got a confession!!"
                })

                if(!notification) {
                    return res.status(500).json({
                        success: false,
                        message: "Error while creating the notification"
                    })
                }
            }
        } 
        const posts =await Post.find().sort({ createdAt: -1 });
        slicedPost = posts.slice(0, req.body.count)
        
        return res.status(200).json({
            success: true,
            message: "Post has been created successfully",
            slicedPost
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
        const postId  = req.body.postId;
        const userId = req.user.id || req.body;

        if(!postId || !userId) {
            return res.status(500).json({
                success: false,
                message: "Both field are required"
            })
        }
        const post = await Post.findById(postId);
        console.log(userId);
        console.log(post);
        
        if(!post) {
            return res.status(500).json({
                success: false,
                message: "Error while fetching the post"
            })
        }
        
        if(post.author != userId) {
            return res.status(500).json({
                success: false,
                message: "User is not the post owner"
            })
        }
        const result =await Post.deleteOne({ _id: postId })
        console.log(3);
        
        return res.status(200).json({
            success: true,
            message: "Post has been deleted succesfully",
            result
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while deleting the post"
        })
    }
}

exports.getPosts = async(req, res) => {
    try {
        const posts =await Post.find().sort({ createdAt: -1 });

        slicedPost = posts.slice(0, req.body.count)
    
        return res.status(200).json({
            success: true,
            message: "Post has been sent successfully",
            slicedPost
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
        const userId=req.body.userId || req.user.id;
        if(!userId){
            return res.status(404).json({
                success:false,
                message:"Provide the user id"
            })
        }

        const posts=await Post.find({author:userId});

        slicedPost = posts.slice(0, req.body.count)

        const user=await User.findById(userId);
        return res.status(200).json({
            success:true,
            message:`Posts fetched for the user ${user?.name}`,
            slicedPost
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
    const postId = req.body.postId;

    if (!postId) {
        return res.status(404).json({
            success: false,
            message: 'PostId not found'
        });
    }

    const post = await Post.findById(postId)
    if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Post not found'
        });
    }

    post.reports += 1;
    await post.save();
    const userId = post.author;

    if(post.reports >= 3) {

        await Post.findByIdAndDelete(postId);

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        user.reports += 1;
        await user.save()

        if(user.reports >= 5) {
            const deletedUser = await User.findByIdAndDelete(userId)
            if(!deletedUser) {
                return res.status(500).json({
                    success:false,
                    message:`Couldnt delete the reported the user ${user?.name}`
                })
            }
        }
    }
    return res.status(200).json({
        success:true,
        message:"Post has been reported succesfully"
    })
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
