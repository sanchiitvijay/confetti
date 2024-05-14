const { Router } = require("express")
const { auth } = require("../middlewares/auth")
const { createReply, deleteReply, getAllReplies } = require("../controllers/Reply")


const router = Router();

router.route("create-reply").post(auth, createReply);
router.route("delete-reply").delete(auth, deleteReply);
router.route("get-all-replies").get(auth, getAllReplies);