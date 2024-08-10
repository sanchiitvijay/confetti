const { Router } = require("express");
const { auth } = require("../middlewares/auth");
const { writeFeedback, getFeedback } = require("../controllers/Feedback");

const router = Router();

router.post("/write-feedback", auth, writeFeedback);
router.get("/get-feedback", auth, getFeedback);

module.exports = router;