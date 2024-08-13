const {addUpdateDevice } = require("../controllers/Notification");
const {auth} = require("../middlewares/auth")
const { Router } = require("express")

const router = Router();

router.route("/handle-device").post(auth,addUpdateDevice);



module.exports = router;