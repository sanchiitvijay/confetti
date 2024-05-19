const { auth, isAdmin } = require("../middlewares/auth")
const { createPost, editPost, deletePost, getPosts, getUserPosts, reportPost } = require("../controllers/Post")
const { Router } = require("express")

const router = Router();

router.route("/create-post").post(auth, createPost);
router.route("/edit-post").post(auth, editPost);
router.route("/delete-post").delete(auth, deletePost);
router.route("/get-post").get(auth, isAdmin, getPosts);
router.route("/get-user-post").get(auth, getUserPosts);
router.route("/report-post").post(auth, reportPost);

module.exports = router;