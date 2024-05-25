const Like = require("../models/Like")
const Post = require("../models/Post")

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
    
        let like = await Like.findOne({ author: authorId })
    
        if(like) {
            const updatedPost = await Post.findByIdAndUpdate(
                postId,
                { $pull: { likes: like._id } },
                { new: true }
            )
            
            const deletedLike = await Like.findByIdAndDelete(like._id);
    
            if(!updatedPost || !deletedLike) {
                return res.status(400).json({
                    success: false,
                    message: "Error while removing the like"
                })
            }
        } else {
            const newLike = await Like.create({
                author: authorId,
                post: postId,
            })
            const updatedPost = await Post.findByIdAndUpdate(
                postId,
                {$push: {likes: newLike._id}},
                {new: true}
            )

            console.log(updatedPost)
            console.log(newLike)


    
            if(!newLike || !updatedPost) {
                return res.status(400).json({
                    success: false,
                    message: "Error while adding the like"
                })  
            }
            like = newLike
        }
        return res.status(200).json({
            success: true,
            message: "Like unlike has been added",
            like
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            success:false,
            message:"Error while liking a post"
        })
    }
}

