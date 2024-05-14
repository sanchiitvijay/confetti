const { Router } = require("express");
const { auth, isStudent, isAdmin} = require("../middlewares/auth")
const { sendotp, login, signup, changePassword } = require("../controllers/Auth")
const { getAllUsers, removeUser, editUser } = require("../controllers/User")

const router = Router();

router.route("/login").post(login);
router.route("/signup").post(sendotp, signup);
router.route("/change-password").post(auth, changePassword)
router.route("/get-all-user").get(auth, isAdmin, getAllUsers);
router.route("/remove-user").delete(auth, isAdmin, removeUser);
router.route("/edit-user").patch(auth, editUser)
