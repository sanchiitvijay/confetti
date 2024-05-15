const { auth } = require("../middlewares/auth")
const { createPost, editPost, deletePost, getPost, getUserPosts, reportPost, reportPost } = require("../controllers/Post")
const { Router } = require("express")

const router = Router();

router.route("create-post").post(auth, createPost);
router.route("edit-post").post(auth, editPost);
// doubt in deleting
router.route("delete-post").delete(auth, deletePost);
router.route("get-post").get(auth, isAdmin, getPost);
router.route("get-user-post").get(auth, getUserPosts);
router.route("report-post").post(auth, reportPost);
