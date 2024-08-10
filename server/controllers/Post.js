const Post = require("../models/Post")
const User=require("../models/User");
const Notification=require("../models/Notification");

exports.createPost = async(req, res)=>{
    try{
        const {
            description,
            year
        } = req.body;
        // console.log("req body--------------", req.body)
        // console.log("req.user--------------", req.user)
        const userId = req?.body?.userId || req?.user?.id
        const name = req?.body?.name
        
        if(!userId || !description) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            })
        }
        


        const post = await Post.create({
            author: userId,
            description,
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

        const updatedUser=await User.findByIdAndUpdate(userId,{
            $push:{
                posts:post._id
            }
        },{
            new:true
        });

        if(!updatedUser){
            return res.status(400).json({
                success:false,
                message:"Couldnt update the user's posts"
            })
        }
        let posts =await Post.find().sort({ createdAt: -1 }).populate('author').exec();
        let postLength=posts.length;
        posts=posts.slice(0,4);
        
        return res.status(200).json({
            success: true,
            message: "Post has been created successfully",
            posts,
            postLength
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
        // console.log(userId);
        // console.log(post);
        
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
        // console.log(3);
        

        const updatedUser=await User.findByIdAndUpdate(userId,{
            $pull:{
                posts:postId
            }
        },{
            new:true
        });

        if(!updatedUser){
            return res.status(400).json({
                success:false,
                message:"Couldnt update the user's posts"
            })
        }
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
        const posts =await Post.find().sort({ createdAt: -1 }).populate('author').exec();
        // console.log("YE POSTS H HAMARE POPULATED:",posts)
        // console.log("POSTS DB SE LE AAYE")
        let count=req?.headers?.count;
        // console.log("COUNT LELIYE")
        const totalLength=posts.length;
        // console.log("LENGHT LELIYE")
        // console.log("REQUEST COUNT:",req.headers.count)
        if(count>totalLength){
            count=totalLength;
        }
        // console.log("MAX CHECK")
        slicedPost = posts.slice(0,count)
        // console.log("SLICED LIKE A CHOPER")
 
    
        return res.status(200).json({
            success: true,
            message: "Post has been sent successfully",
            slicedPost,
            totalLength
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
       
        const userId=req.headers.userid || req.user.id;
        if(!userId){
            return res.status(404).json({
                success:false,
                message:"Provide the user id"
            })
        }

        const posts=await Post.find({author:userId});
        const totalLength=posts?.length;
        slicedPost = posts.slice(0, req.headers.count)

        const user=await User.findById(userId);
        return res.status(200).json({
            success:true,
            message:`Posts fetched for the user ${user?.name}`,
            slicedPost,
            totalLength,
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

exports.getUserPostsStats=async(req,res)=>{
    try{
        const userId=req.user.id;
        if(!userId){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        const posts=await Post.find({author:userId}).populate("author").populate({
            path:"likes"
        }).exec()
        const postLength=posts.length;
        console.log(posts);
        return res.status(200).json({
            success:true,
            message:"User Posts Stats fetched successfully",
            postLength,
        })
    }
    catch(err){
        console.log("User Post Stats Error",err);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
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
