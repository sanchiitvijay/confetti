const {addUpdateDevice, getInstaId } = require("../controllers/Notification");
const {auth} = require("../middlewares/auth")
const { Router } = require("express")

const router = Router();

router.route("/handle-device").post(auth,addUpdateDevice);
router.route("/instagram").post(auth, getInstaId);


module.exports = router;