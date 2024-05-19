const { Router } = require("express")
const { auth } = require("../middlewares/auth")
const { createComment, removeComment, getAllComments, getUserComments } = require("../controllers/Reply")


const router = Router();


router.route("/create-comment").post(auth, createComment);
router.route("/remove-comment").delete(auth, removeComment);
router.route("/get-all-comments").get(auth, getAllComments);
router.route("/get-user-comments").get(auth, getUserComments);

export default router;