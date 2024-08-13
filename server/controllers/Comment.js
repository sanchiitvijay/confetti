const Comment = require("../models/Comment");
const Post = require("../models/Post");
const Reply = require("../models/Reply");
const User = require("../models/User");
const client = require('../configs/client');
const Device = require("../models/Device");


var admin = require("firebase-admin");

if (!admin.apps?.length) {
    var serviceAccount = require("../configs/firebase-admin-config")
  
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  

const messaging = admin.messaging();
exports.createComment = async (req, res) => {
    try {
        console.log("Inside create comment----------", req.body);
        const postId = req.body.postId;
        const description = req.body.comment;

        const userId = req.user.id;
        // console.log("USER ID", userId);
        // console.log("POST ID", postId);
        // console.log("DESCRIPTION", description);
        const cachedpost = await client.get(`post:${postId}`);
        const cachedPost = await JSON.parse(cachedpost);
        //Validation for user
        if (!userId || !description || !postId) {
            return res.status(404).json({
                success: false,
                message: "All fields are required"
            })
        }

        //find Post exists or not
        const post = await Post.findOne({ _id: postId });
        console.log(post)
        // console.log("after post--------------");
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post cant be found"
            })
        }


        // console.log("creating comment--------------");
        // console.log(typeof(post._id));
        // console.log(typeof(postId))
        //now post checked , create comment and push it in to the post 
        const comment = await Comment.create({
            author: userId,
            post: post._id,
            description: description,
            replies: [],
        });

        if (!comment) {
            return res.status(400).json({
                success: false,
                message: "Comment cant be created"
            })
        }
        // console.log("comment created--------------",comment);
        //now comment created now push it into the post 
        post.comments.push(comment._id);
        await post.save();

        const updatedUser = await User.findByIdAndUpdate(userId, {
            $push: { comments: comment._id }
        }, { new: true })

        if (!updatedUser) {
            return res.status(400).json({
                success: false,
                message: "Could not update user comment"
            })
        }
        console.log("UPDATED USER",updatedUser);
        //messaging flow 
        const postAuthor = post?.author;
        const userDevice = await Device.findOne({ user: postAuthor });
        console.log("USER DEVICE", userDevice);
        const userDevices = userDevice?.devices;
        const userTokens = userDevices.map((device) => (
            device = device.split("|")[2]
        ))

        console.log("USERTOKENS", userTokens);
        console.log("POST AUTHOR",postAuthor.toString());
        console.log("UPDATED USER ID",updatedUser._id)
        if(postAuthor.toString()!=updatedUser._id.toString()){
            const message = {
                notification: {
                    title: "Comment added",
                    body: `Comment added on your post by ${updatedUser?.username}`,
                   
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
       

        const comments = await Comment.find({ post: postId }).sort({ createdAt: -1 }).populate('author').exec();
        // console.log("post saved--------------", post);

        if (cachedPost) {
            await cachedPost?.comments?.push(comment?._id);
            await client.set(`post:${postId}`, JSON.stringify(cachedPost));
            const userComments = Number.parseInt(await client.get(`user:${cachedPost?.author?._id}:totalComments`)) || 0;
            await client.set(`user:${cachedPost?.author?._id}:totalComments`, userComments + 1);
        }
        //return successful response
        return res.status(200).json({
            success: true,
            message: "Comment created successfully created for the post",
            comments,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while trying to comment on the post"
        })
    }

}


exports.removeComment = async (req, res) => {
    try {
        //get the post and its comment id
        console.log("Inside remove comment----------", req.body);
        const {
            commentId,
            postId,
        } = req.body;

        const userId = req.user.id;


        const cachedpost = await client.get(`post:${postId}`);
        const cachedPost = await JSON.parse(cachedpost);
        //validate
        if (!commentId || !postId) {
            return res.status(404).json({
                success: false,
                message: "All fields are required"
            })
        }

        //find the comment and post and validate them
        const comment = await Comment.findById({ _id: commentId });

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment cant be found"
            })
        }

        const post = await Post.findById({ _id: postId });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post of the comment cant be found"
            })
        }

        //pull the comment from the post 
        const updatedPost = await Post.findByIdAndUpdate({ _id: postId }, {
            $pull: {
                comments: commentId
            }
        }, {
            new: true
        });

        if (!updatedPost) {
            return res.status(400).json({
                success: false,
                message: "Couldnt remove the comment from the post"
            })
        }

        //pull the comment from the user
        const updatedUser = User.findByIdAndUpdate(userId, {
            $pull: { comments: comment._id }
        }, { new: true })

        if (!updatedUser) {
            return res.status(400).json({
                success: false,
                message: "Could not update user comment"
            })
        }
        //remove the replies to the comment


        while (comment.replies.length) {
            replyId = comment.replies.pop();
            await Reply.findByIdAndDelete(replyId);
        }

        await comment.save();

        //now remove the comment

        const deletedComment = await Comment.findByIdAndDelete({ _id: commentId });

        const comments = await Comment.find({ post: postId }).sort({ createdAt: -1 }).populate('author').exec();

        if (cachedPost) {
            await cachedPost?.comments?.filter((comment) => comment != commentId);
            await client.set(`post:${postId}`, JSON.stringify(cachedPost));
            const userComments = Number.parseInt(await client.get(`user:${cachedPost?.author?._id}:totalComments`)) || 0;
            await client.set(`user:${cachedPost?.author?._id}:totalComments`, userComments - 1);
        }
        if (!deletedComment) {
            return res.status(400).json({
                success: false,
                message: "Comment cant be deleted for some reason"
            })
        }
        console.log("comments has been deleted-----------------");
        //return response
        return res.status(200).json({
            success: true,
            message: "Comment successfully removed",
            comments
        })
    }
    catch (error) {
        console.log(error);
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "comment cant be removed"
        })
    }
}


exports.getAllComments = async (req, res) => {


    try {
        //get the post id for which you want to fetch the comments for 

        const postId = req.headers.postid;


        //validate
        if (!postId) {
            return res.status(404).json({
                success: false,
                message: "All fields are required,Please provide the post id"
            })
        }

        //db call to find the comments by post id
        const comments = await Comment.find({ post: postId }).sort({ createdAt: -1 }).populate('author').exec();

        // console.log("comments-----------------",comments);

        //return response
        return res.status(200).json({
            success: true,
            message: "Comments fetched successfully for the post",
            comments
        })
    }
    catch (error) {
        console.log(error);
        console.log(error.message);
        return res.status(500).json({
            sucess: true,
            message: "Some error while fetching comments for the post"
        })
    }
}


//function written for admin only to watch over comments of some user 
//possibly will be removed or commented out 
exports.getUserComments = async (req, res) => {


    try {
        //get the user id for which you want to fetch the comments for 
        const { userId } = req.body;

        //validate
        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "All fields are required,Please provide the user id"
            })
        }

        //db call to find the comments by user id
        const comments = await Comment.find({ author: userId });

        //return response
        return res.status(200).json({
            success: true,
            message: "Comments fetched successfully for the user",
            comments
        })
    }
    catch (error) {
        console.log(error);
        console.log(error.message);
        return res.status(500).json({
            sucess: true,
            message: "Some error while fetching comments for the user"
        })
    }
}