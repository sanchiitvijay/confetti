const { auth, isAdmin } = require("../middlewares/auth")
const { createPost, editPost, deletePost, getPosts, getUserPosts, reportPost, getUserPostsStats } = require("../controllers/Post")
const { Router } = require("express")

const router = Router();

router.route("/create-post").post(auth, createPost);
router.route("/edit-post").post(auth, editPost);
router.route("/delete-post").post(auth, deletePost);
router.route("/get-post").get(auth, getPosts);
router.route("/get-user-posts").get(auth, getUserPosts);
router.route("/report-post").post(auth, reportPost);
router.route("/get-user-stats").get(auth,getUserPostsStats);
module.exports = router;