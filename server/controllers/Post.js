const Post = require("../models/Post")
const User = require("../models/User");
const Notification = require("../models/Notification");
const client = require('../configs/client');
const mongoose=require('mongoose')
const Device = require("../models/Device");
var admin = require("firebase-admin");
if (!admin.apps?.length) {
    var serviceAccount = require("../configs/firebase-admin-config")

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const messaging = admin.messaging();
const db = admin.firestore();

exports.createPost = async (req, res) => {
    try {
        const {
            description,
            year,
            color
        } = req.body;
     
        const userId = req?.body?.userId || req?.user?.id
        const name = req?.body?.name

        if (!userId || !description) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            })
        }

        /****************************************************User Post Restriction for a day**************************************************/
        const userPost = await Post.find({ author: userId }).sort({ createdAt: -1 });
        const currentTime = Date.now();

        if (userPost.length > 5 && currentTime - userPost[4].createdAt < 86400000) {
            return res.status(403).json({
                success: false,
                message: "You can only post 5 times a day"
            })
        }

        //Create Post
        let post = await Post.create({
            author: userId,
            description,
            likes: [],
            comments: [],
            color
        });

        if (name && year) {
            const confessedTo = await User.findOne({ name, year })

            if (confessedTo) {
                const notification = await Notification.create({
                    sender: userId,
                    receiver: confessedTo._id,
                    post: post._id,
                    message: "Seems Like you got a confession!!"
                })

                if (!notification) {
                    return res.status(500).json({
                        success: false,
                        message: "Error while creating the notification"
                    })
                }
            }
        }

        //update the user
        const updatedUser = await User.findByIdAndUpdate(userId, {
            $push: {
                posts: post._id
            }
        }, {
            new: true
        });
        
        /*******************************************************Redis****************************************************************/
        const firstName = name.split(" ")[0].toLowerCase();
        const userPosts = Number.parseInt(await client.get(`user:${userId}:totalPosts`)) || 0;
        await client.set(`user:${userId}:totalPosts`, (userPosts + 1));

        if (!updatedUser) {
            return res.status(400).json({
                success: false,
                message: "Couldnt update the user's posts"
            })
        }

        //populating the post 
        post = await Post.findById(post?.id).populate("author").populate({
            path: "likes"
        }).exec();

        
        //storing the post in redis
        const cacheKey = `post:${post._id}`;


        await client.set(cacheKey, JSON.stringify(post));


        //add the post id to the list of posts
        const postListKey = `posts:ids`;
        await client.lPush(postListKey, post._id.toString());

        //Fetch Posts and Slice Them
        let posts = await client.lRange(postListKey, 0, -1);
        if (posts.length != 0) {
            posts = await Promise.all(posts.map(id => client.get(`post:${id}`)));
            posts = posts.map(post => JSON.parse(post));
            let postLength = posts.length;
            posts = posts.slice(0, 4);

            /******************************************************Push notifs by firebase *****************************************************/
            const probableUserList = await User.find({
                name: {
                    $regex: new RegExp('^' + firstName)
                }
            })


            const probableUserIds = probableUserList.map((user) => {
                return user._id
            })

            let probableTokens = await Promise.all(probableUserIds.map(async (userId) => (await Device.findOne({ user: userId }))));
            probableTokens = probableTokens.filter((pT) => pT != null);
            probableTokens = probableTokens.map((user) => {
                if (user) {
                    return user.devices
                }
                else {
                    return []
                }
            })

            const message = {
                notification: {
                    title: "Confession",
                    body: `This confession by ${updatedUser?.username} might be for you `,
                },
                data: {
                    url: `http://localhost:3000/feed/${post._id}`
                }
            }

            probableTokens.forEach((userTokens) => {
                const sendPromises = userTokens?.map((token) => {
                    return messaging.send({
                        ...message,
                        token: token.split("|")[2],
                    })
                });

                Promise.all(sendPromises)
                    .then((response) => {
                        console.log('Successfully sent messages:', response);
                    })
                    .catch((error) => {
                        console.error('Error sending messages:', error);
                    });
            })


            /*****************************************************Firestore code ****************************************************************/
    
          
            const docRef=db.collection("Post").doc(post._id.toString());
            await docRef.set({
                author:post?.author?.username,
                dp:post?.author?.displayPicture,
                likes:0,
            })
           
            Promise.all(probableUserIds?.map(async(userId)=>{
                    const notfRef=db.collection("Notifications").doc(userId.toString()).collection("notifications");
                    console.log("MAI HU USER",notfRef);
                    return notfRef.add({
                        postId:post?._id.toString(),
                        postAuthor:post?.author?.username,
                        description:"This confession might be for you",
                        type:"post",
                        createdAt:admin.firestore.FieldValue.serverTimestamp(),
                    });
        }))
         
            

            const userRef=db.collection("userPosts").doc(updatedUser._id.toString());
            const userDoc=userRef.get();
            const nPosts=updatedUser.posts.length;
            
            if(!userDoc){
                console.log("UserDoc.exists:",userDoc.exists);
                console.log("userDoc Object:",userDoc)
                await userRef.set({
                    author:post?.author?.username,
                    dp:post?.author?.displayPicture,
                    posts:1
                })
            }
            else{
                console.log("jai mata di",nPosts)
                await userRef.set({
                    author:post?.author?.username,
                    dp:post?.author?.displayPicture,
                    posts:nPosts,
                })
                console.log("NO OF POSTS:",nPosts)
            }
         
           /***************************************************Firestore code ends here**********************************************************/
            return res.status(200).json({
                success: true,
                message: "Post has been created successfully",
                posts,
                postLength
            })
        }
        /**********************************************************Fallback code****************************************************************/
        
        
        posts = await Post.find()
        .populate('author')
        .populate({
            path: "likes"
        })
        .sort({ createdAt: -1 })
        .exec();

        let postLength = posts.length;

        return res.status(200).json({
            success: true,
            message: "Post has been created successfully",
            posts,
            postLength
        })

    } catch (error) {
        console.log("Error while creating the post", error);
        return res.status(500).json({
            success: false,
            message: "Error while creating your post",
        })
    }
}


exports.editPost = async (req, res) => {
    try {
        const { postId, description, caption } = req.body;
        const post = await Post.findById(postId)

        if (!post) {
            return res.status(500).json({
                success: false,
                message: "Could not find the post"
            })
        }

        if (description) post.description = description;
        if (caption) post.caption = caption;

        const updatedPost = await post.save();

        if (!updatedPost) {
            return res.status(500).json({
                success: false,
                message: "Error while saving the post"
            })
        }

        //update the post in redis
        const cacheKey = `post:${postId}`;
        const updatedPostString = JSON.stringify(updatedPost);
        const updatedPostCache = await client.set(cacheKey, updatedPostString);

        if (updatedPostCache) {
            // fetch the updated posts
            let posts = await client.lRange(`posts:ids`, 0, -1);
            posts = await Promise.all(posts.map(id => client.get(`post:${id}`)));
            posts = posts.map(post => JSON.parse(post))
            return res.status(200).json({
                success: true,
                message: "Post has been updated succesfully",
                posts
            })
        }
        const posts = Post.find({})
        .populate("author")
        .populate({
            path: "likes"
        })
        .sort({ createdAt: -1 })
        .exec();

        return res.status(200).json({
            success: true,
            message: "Posts has been updated successfully",
            posts
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while updating the post"
        })
    }
}

exports.deletePost = async (req, res) => {
    try {
        const postId = req.body.postId;
        const userId = req?.user?.id || req?.body;
   
        if (!postId || !userId) {
            return res.status(500).json({
                success: false,
                message: "Both field are required"
            })
        }
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(500).json({
                success: false,
                message: "Error while fetching the post"
            })
        }
       
        if (post.author._id != userId) {
            return res.status(500).json({
                success: false,
                message: "User is not the post owner"
            })
        }
       
        const deletedPost = await Post.findByIdAndDelete(postId)
       
        /***************************************************Redis Delete Code******************************************************************/

        const userLikes = Number.parseInt(await client.get(`user:${deletedPost?.author?._id}:totalLikes`));
        const userComments = Number.parseInt(await client.get(`user:${deletedPost?.author?._id}:totalComments`));
        const userPosts = Number.parseInt(await client.get(`user:${deletedPost?.author?._id}:totalPosts`));

        await client.set(`user:${deletedPost?.author?._id}:totalLikes`, userLikes - deletedPost?.likes?.length);
        await client.set(`user:${deletedPost?.author?._id}:totalComments`, userComments - deletedPost?.comments?.length);
        await client.set(`user:${deletedPost?.author?._id}:totalPosts`, userPosts - 1);

        const updatedUser = await User.findByIdAndUpdate(userId, {
            $pull: {
                posts: postId
            }
        }, {
            new: true
        });

        if (!updatedUser) {
            return res.status(400).json({
                success: false,
                message: "Couldnt update the user's posts"
            })
        }

        //remove the post from redis
        const cacheKey = `post:${postId}`;
        await client.del(cacheKey);

        //remove the post id from the list
        const postListKey = `posts:ids`;
        await client.lRem(postListKey, 0, postId.toString());

        //fetch updated list and slice
        let posts = await client.lRange(postListKey, 0, -1);
        posts = await Promise.all(posts.map(id => client.get(`post:${id}`)));
        posts = posts.map(post => JSON.parse(post));
        /********************************************************Redis Code Ends Here************************************************************/
       
        /********************************************************FireStore Delete Code***********************************************************/
        const docRef=db.collection("Post").doc(deletedPost._id.toString());
        if(docRef){
        await docRef?.delete();
        }
        const userRef=db.collection("userPosts").doc(updatedUser._id.toString());
        const nPosts=updatedUser.posts.length;
   
        await userRef.set({
            author:updatedUser?.username,
            dp:updatedUser?.displayPicture,
            posts:nPosts,
        })
        /*******************************************************FireStore code ends here*********************************************************/
        
        // const posts = await Post.find().sort({ createdAt: -1 }).populate('author').exec();
        return res.status(200).json({
            success: true,
            message: "Post has been deleted succesfully",
            posts
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while deleting the post"
        })
    }
}

exports.getPosts = async (req, res) => {
    try {
        let count = req?.headers?.count;


        //fetch post ids from redis
        let postIds = await client.lRange('posts:ids', 0, -1);

        let posts = await Promise.all(postIds.map(id => client.get(`post:${id}`)));

        posts = posts.map(post => JSON.parse(post));
        //slice posts based on count

        let slicedPost = posts.slice(0, count);

        if (slicedPost.length != 0) {

            return res.status(200).json({
                success: true,
                message: "Posts fetched successfully",
                slicedPost,
                totalLength: postIds.length
            })
        }

        posts = await Post.find().populate('author').populate({
            path: "likes"
        }).sort({ createdAt: -1 }).exec();



        const totalLength = posts.length;
        if (count > totalLength) {
            count = totalLength;
        }
        slicedPost = posts.slice(0, count)



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
exports.getUserPosts = async (req, res) => {
    try {

        const userId = req.headers.userid || req.user.id;
        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "Provide the user id"
            })
        }


        //fetch post ids from redis
        let postIds = await client.lRange('posts:ids', 0, -1);
        let posts = await Promise.all(postIds.map(id => client.get(`post:${id}`)));
        posts = posts.map(post => JSON.parse(post));
        posts = posts.filter((post) => String(post.author._id) === String(userId));

        //slice posts based on count
        let slicedPost = posts.slice(0, req.headers.count);
        console.log("TOTAL LENGTH:",slicedPost?.length);
        if (slicedPost?.length != 0) {
            return res.status(200).json({
                success: true,
                message: "Posts fetched successfully",
                slicedPost,
                totalLength: posts.length
            })
        }
        posts = await Post.find({ author:mongoose.Types.ObjectId(userId) })
        .populate("author")
        .exec();
        const totalLength = posts?.length;
        slicedPost = posts.slice(0, req.headers.count)
       

        return res.status(200).json({
            success: true,
            message: `Posts fetched for the user`,
            slicedPost,
            totalLength,
        })
    }
    catch (error) {
        console.log(error);
        console.log(error.message);
        console.error(error);
        return res.status(500).json({
            success: false,
            message: `Couldnt get the posts for the user`
        })
    }
}

exports.getUserPostsStats = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        //get totalPosts,totalLikes,totalComments from the cache if its there , if not check cache for posts 
        const totalPosts = Number.parseInt(await client.get(`user:${userId}:totalPosts`));
        const totalLikes = Number.parseInt(await client.get(`user:${userId}:totalLikes`));
        const totalComments = Number.parseInt(await client.get(`user:${userId}:totalComments`));

        if (totalPosts && totalLikes && totalComments) {
            const data = {
                postLength: totalPosts,
                likesLength: totalLikes,
                commentsLength: totalComments,
            }

            return res.status(200).json({
                success: true,
                message: "User Posts Stats fetched successfully",
                data
            })
        }

        //first fallback:get all posts from cache , implement the same logic as db call

        let postIds = await client.lRange('posts:ids', 0, -1);
        let posts = await Promise.all(postIds.map(id => client.get(`post:${id}`)));
        if (posts?.length != 0) {
            posts = posts.map(post => JSON.parse(post));
            posts = posts.filter((post) => post.author._id == userId);
            let postLength = posts?.length;
            let likesLength = 0;
            let commentsLength = 0;
            posts?.map((post) => {
                likesLength += post?.likes?.length;
                commentsLength += post?.comments?.length;
            })
            const data = {
                postLength,
                likesLength,
                commentsLength
            }

            return res.status(200).json({
                success: true,
                message: "User Posts Stats fetched successfully",
                data
            })

        }

        // last fallback: db call

        posts = await Post.find({ author: userId });
        if (!posts) {
            return response.status(404).json({
                success: false,
                message: "Post cant be found "
            })
        }
        const postLength = posts.length;
        var likesLength = 0;
        var commentsLength = 0;

        posts.map((post) => {
            likesLength += post?.likes?.length
            commentsLength += post?.comments?.length

        })




        const data = {
            postLength: postLength,
            likesLength,
            commentsLength
        }

        console.log(data);
        return res.status(200).json({
            success: true,
            message: "User Posts Stats fetched successfully",
            data
        })
    }
    catch (err) {
        console.log("User Post Stats Error", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


exports.reportPost = async (req, res) => {
    const postId = req.body.postId;

    if (!postId) {
        return res.status(404).json({
            success: false,
            message: 'PostId not found'
        });
    }

    const post = await Post.findById(postId)
    const cachedpost = await client.get(`post:${postId}`);
    const cachedPost = await JSON.parse(cachedpost);
    if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Post not found'
        });
    }

    post.reports += 1;
    await post.save();


    const userId = post.author;

    if (post.reports >= 3) {

        const deletedPost = await Post.findByIdAndDelete(postId);

        if (cachedPost) {
            await client.lRem(`posts:ids`, 0, postId.toString());
            await client.del(`post:${postId}:`);
            const userLikes = Number.parseInt(await client.get(`user:${deletedPost?.author?._id}:totalLikes`));
            const userComments = Number.parseInt(await client.get(`user:${deletedPost?.author?._id}:totalComments`));
            const userPosts = Number.parseInt(await client.get(`user:${deletedPost?.author?._id}:totalPosts`));

            await client.set(`user:${deletedPost?.author?._id}:totalLikes`, userLikes - deletedPost?.likes?.length);
            await client.set(`user:${deletedPost?.author?._id}:totalComments`, userComments - deletedPost?.comments?.length);
            await client.set(`user:${deletedPost?.author?._id}:totalPosts`, userPosts - 1);
        }
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        user.posts=user.posts.filter((post)=>post._id!=deletedPost._id)
        user.reports += 1;
        await user.save()

        /**************************************FireStore Code Delete Post******************************************************************************/
        const docRef=db.collection("Post").doc(deletedPost._id.toString());
        if(docRef){
        await docRef?.delete();
        }
        const userRef=db.collection("userPosts").doc(user._id.toString());
        const nPosts=user.posts.length;
   
        await userRef.set({
            author:user?.username,
            dp:user?.displayPicture,
            posts:nPosts,
        })
        /**************************************FireStore Code Post Code Ends Here****************************************************************/
        if (user.reports >= 5) {
            const deletedUser = await User.findByIdAndDelete(userId)
            await client.rem(`user:${userId}`);
            if (!deletedUser) {
                return res.status(500).json({
                    success: false,
                    message: `Couldnt delete the reported the user ${user?.name}`
                })
            }

            /*********************************FireStore User Code********************************************************************************/
            await userRef.delete();
            const postPromises=deletedUser.posts.map((p)=>{
                const pid=p.toString();
                const postRef=db.collection("Post").doc(pid);
                return postRef.delete();
            })
            Promise.all(postPromises);

        }
    }
    const posts = await Post.find().sort({ createdAt: -1 }).populate('author').exec();
    return res.status(200).json({
        success: true,
        message: "Post has been reported succesfully",
        posts
    })
}



exports.deleteAllPosts = async (req, res) => {
    try {

        const userId = req.user.id;


        if (!userId) {
            return res.status(200).json({
                success: false,
                message: "please provide user id"
            })
        }


        //find all posts for user and delete them
        const deletedPosts = await Post.findByIdAndDelete({ author: userId });

        //remove them all from the cache as well 
        //first individually remove the post by fetching all the ids , then remove the ids as well
        const postIds = await client.lRange('posts:ids', 0, -1);
        await Promise.all(postIds.map(id => client.del(`post:${id}`)))
        await client.del('posts:ids');


        //update user
        await client.set(`user:${userId}:totalPosts`, 0);
        await client.set(`user:${userId}:totalLikes`, 0);
        await client.set(`user:${userId}:totalComments`, 0);

        //return res
        return res.status(200).json({
            success: true,
            message: "Posts deleted successfully for the user",
            deletedPosts
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Some error occured while deleting all the posts for this user"
        })
    }
}


exports.postExist = async (req, res) => {
    try {
        const postId = req.headers.postid || req.body.postId;
        console.log("1----------------",postId);
        if (!postId) {
            return res.status(200).json({
                success: false,
                message: "PostId not found"
            })
        }
        console.log("2---------------",postId);
        const post = await Post.findById(postId)
        .populate("author")
        .exec();
        console.log("3---------------",post);

        if (!post) {
            return res.status(200).json({
                success: false,
                message: "Post not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Post exists",
            post
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while checking the post"
        })
    }
}
