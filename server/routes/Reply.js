const { Router } = require("express")
const { auth } = require("../middlewares/auth")
const { createReply, deleteReply, getAllReplies } = require("../controllers/Reply")


const router = Router();

router.route("/create-reply").post(auth, createReply);
router.route("/delete-reply").post(auth, deleteReply);
router.route("/get-all-replies").post(auth, getAllReplies);

module.exports = router;