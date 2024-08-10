const Feedback = require('../models/Feedback');

exports.writeFeedback = async (req, res) => {
    try {
        console.log("Inside write feedback----------", req.body);
        const message = req.body.message;
        const userId = req.user.id;

        if (!userId || !message) {
            return res.status(404).json({
                success: false,
                message: "All fields are required"
            })
        }

        const newFeedback = await Feedback.create({
            message,
            userId,
        });

        if (!newFeedback) {
            return res.status(400).json({
                success: false,
                message: "Couldnt write the feedback"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Feedback written successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

exports.getFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({}).sort({createdAt: -1}).populate("userId");

        if (!feedbacks) {
            return res.status(400).json({
                success: false,
                message: "Couldnt get the feedbacks"
            })
        }

        return res.status(200).json({
            success: true,
            feedbacks
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}   