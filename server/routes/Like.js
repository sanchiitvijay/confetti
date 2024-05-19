const { Router } = require("express")
const { auth } = require("../middlewares/auth")
const { getLikes, liked } = require("../controllers/Like")


const router = Router();


router.route("/liked").post(auth, liked);
router.route("/get-all-likes").get(auth, getLikes);

export default router;