const Like = require("../models/Like")
const Post = require("../models/Post")
const User= require("../models/User")
var admin=require("firebase-admin");
const client = require('../configs/client');
if (!admin.apps?.length) {
    var serviceAccount = require("../configs/firebase-admin-config")
  
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

const db=admin.firestore();

//It was never called 
exports.getLikes = async(req, res)=> {
    try {
        const postId = req.body.postId;
    
        const likes = await Like.find({post: postId})
    
        return res.status(200).json({
            success: true,
            message: "likes has been fetched",
            likes
        })
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({
            success: false,
            message: "error while fetching likes"
        })
    }
}

exports.liked = async(req, res) => {
    try {
        const authorId = req.user.id;
        const postId = req.body.postId;

        // Fetch cached post
        const cachedpost = await client.get(`post:${postId}`);
        const cachedPost = JSON.parse(cachedpost);

        let like = await Like.findOne({ author: authorId, post: postId });

        if (like) {
            // Unlike the post
            const updatedPost = await Post.findByIdAndUpdate(
                postId,
                { $pull: { likes: like._id } },
                { new: true }
            ).populate("author").exec();

            const updatedUser = await User.findByIdAndUpdate(
                authorId,
                { $pull: { likes: like._id } },
                { new: true }
            );

            const deletedLike = await Like.findByIdAndDelete(like._id);

            if (cachedPost) {
                cachedPost.likes = cachedPost.likes.filter((l) => l._id != like._id);
                await client.set(`post:${postId}`, JSON.stringify(cachedPost));
                
                const userLikes = Number.parseInt(await client.get(`user:${cachedPost.author._id}:totalLikes`)) || 0;
                await client.set(`user:${cachedPost.author._id}:totalLikes`, userLikes - 1);
            }

            const docRef=db.collection("Post").doc(updatedPost._id.toString());
            if(docRef){
                docRef.set({
                    author:updatedPost?.author?.username,
                    dp:updatedPost?.author?.displayPicture,
                    likes:updatedPost?.likes?.length,
                })
            }

            if (!updatedPost || !deletedLike || !updatedUser) {
                return res.status(400).json({
                    success: false,
                    message: "Error while removing the like"
                });
            }
        } else {
            // Like the post
            const newLike = await Like.create({
                author: authorId,
                post: postId,
            });

            const updatedPost = await Post.findByIdAndUpdate(
                postId,
                { $push: { likes: newLike._id } },
                { new: true }
            ).populate("author").exec();

            const updatedUser = await User.findByIdAndUpdate(
                authorId,
                { $push: { likes: newLike._id } },
                { new: true }
            );

            if (cachedPost) {
                cachedPost.likes.push(newLike);
                await client.set(`post:${postId}`, JSON.stringify(cachedPost));

                const userLikes = Number.parseInt(await client.get(`user:${cachedPost.author._id}:totalLikes`)) || 0;
                await client.set(`user:${cachedPost.author._id}:totalLikes`, userLikes + 1);
            }

            if (!newLike || !updatedPost || !updatedUser) {
                return res.status(400).json({
                    success: false,
                    message: "Error while adding the like"
                });
            }

            like = newLike;


            const docRef=db.collection("Post").doc(updatedPost._id.toString());
            if(docRef){
                docRef.set({
                    author:updatedPost?.author?.username,
                    dp:updatedPost?.author?.displayPicture,
                    likes:updatedPost?.likes?.length,
                })
            }
        }

        return res.status(200).json({
            success: true,
            message: "Like/unlike operation was successful",
            like
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            success: false,
            message: "Error while liking a post"
        });
    }
}


