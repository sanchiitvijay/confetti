const User = require("../models/User");
const Notification = require("../models/Notification");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const welcomeTemplate = require("../mail/templates/newJoining");
const client = require("../configs/client");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});

        return res.status(200).json({
            success: true,
            message: "All users fetched successfully",
            users
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Some error occurred while fetching the users"
        })
    }
}

exports.editUser = async (req, res) => {
    try {
        const {
            name,
            username,
            year,
            instagram
        } = req.body;

        const userId = req.user.id || req.body.userId

        const user = await User.findById(userId)

        if (!user) {
            return res.status(500).json({
                success: false,
                message: "Could not find the user"
            })
        }


        user.name = name;
        user.username = username;
        user.year = year;
        user.instagram = instagram;

        const updatedUser = await user.save();

        const postIds = await client.lRange(`posts:ids`, 0, -1);
        let posts = await Promise.all(postIds.map(id => client.get(`post:${id}`)));
        posts = posts.map(post => JSON.parse(post));

        if (posts?.length !== 0) {
            let userPosts = posts.filter(post => post.author._id === userId);

            if (userPosts.length !== 0) {
                userPosts.forEach(post => {
                    post.author.name = name;
                    post.author.username = username;
                    post.author.year = year;
                    post.author.instagram = instagram;
                });

                await Promise.all(
                    userPosts.map(post => client.set(`post:${post._id}`, JSON.stringify(post)))
                );
            }
        }

        if (!updatedUser) {
            return res.status(500).json({
                success: false,
                message: "Error while saving the User"
            })
        }

        return res.status(200).json({
            success: true,
            message: "User has been updated succesfully",
            updatedUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while updating the user"
        })
    }
}


exports.removeUser = async (req, res) => {
    try {
        const userId = req.body.userId || req.user.id;
        console.log("HEY MAI BACKEND HU");
        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "Need user id"
            })
        }
        console.log("USER ID AAGYI")


        //fetch the user first
        const user = await User.findById(userId);
        console.log("USER DADA FETCH HOGYE")
        //delete his notfications to clear the db
        while (user?.notfications?.length) {
            const notificationId = user.notfications.pop();
            await Notification.findByIdAndDelete(notificationId);
        }
        console.log("NOTIFICATION GYA")
        //now remove the user 
        const deletedUser = await User.findByIdAndDelete(userId);
        console.log("DELETE KRDIYA HAHHAHA")
        //return response   
        await client.del(`user:${userId}`);
        return res.status(200).json({
            success: true,
            message: "Deleted the user successfully",
            deletedUser
        })



    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Couldnt remove the user"
        })
    }
}

exports.deleteGraduates = async (req, res) => {
    try {
        const graduates = await User.find({ year: 4 })

        for (const grad of graduates) {
            await User.findByIdAndDelete(grad._id);
        }

        return res.status(200).json({
            success: true,
            message: "Graduates have been deleted succesfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while deleting the graduates"
        })
    }
}

exports.promoteStudents = async (req, res) => {
    try {
        const { year } = req.body;
        if (!year) {
            return res.status(500).json({
                success: false,
                message: "Error while fetching the year"
            })
        }
        const students = await User.find({ year: year })


        for (const student of students) {
            await User.findByIdAndUpdate(
                student._id,
                { $inc: { year: 1 } },
                { new: true }
            );
        }

        return res.status(200).json({
            success: true,
            message: "Students year has been increased by 1 deleted succesfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while increasing the year of the students"
        })
    }
}


exports.updateDisplayPicture = async (req, res) => {
    try {
        const { displayPicture } = req.files;
        const userId = req.user.id
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(image)
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { displayPicture: image.secure_url },
            { new: true }
        )

        //redis code 
        const postIds = await client.lRange(`posts:ids`, 0, -1);
        let posts = await Promise.all(postIds.map(id => client.get(`post:${id}`)));
        posts = posts.map(post => JSON.parse(post));

        if (posts?.length !== 0) {
            let userPosts = posts.filter(post => post.author._id === userId);

            if (userPosts.length !== 0) {
                userPosts.forEach(post => {
                    post.author.displayPicture=image?.secure_url
                });

                await Promise.all(
                    userPosts.map(post => client.set(`post:${post._id}`, JSON.stringify(post)))
                );
            }
        }

        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Could not update display picture,server error"
        })
    }
}
