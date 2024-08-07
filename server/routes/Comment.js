const { Router } = require("express");
const { auth } = require("../middlewares/auth");
const { createComment, removeComment, getAllComments, getUserComments } = require("../controllers/Comment");

const router = Router();

router.post("/create-comment", auth, createComment);
router.post("/remove-comment", auth, removeComment);
router.get("/get-all-comments", auth, getAllComments);
router.get("/get-user-comments", auth, getUserComments);

module.exports = router;
