const { Router } = require("express");
const { auth, isStudent, isAdmin} = require("../middlewares/auth")
const { sendotp, login, signup, changePassword } = require("../controllers/Auth")
const { getAllUsers, removeUser, editUser, deleteGraduates, promoteStudents } = require("../controllers/User")
const {resetPassword,resetPasswordToken}=require('../controllers/ResetPassword');



const router = Router();

router.route("/login").post(login);
router.route("/send-otp").post(sendotp);
router.route("/signup").post(signup);
router.route("/change-password").post(auth, changePassword);
router.route("/get-all-user").get(auth, isAdmin, getAllUsers);
router.route("/remove-user").delete(auth, isAdmin, removeUser);
router.route("/edit-user").patch(auth, editUser);
router.route("/delete-graduates").delete(auth, isAdmin, deleteGraduates);
router.route("/promote-students").post(auth, isAdmin, promoteStudents);
router.route("/resetPasswordToken").post(resetPasswordToken)
router.route("/resetPassword").post(resetPassword)
module.exports = router;