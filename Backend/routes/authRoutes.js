const express = require("express");
const { registerUser, loginUser, googleLogin,} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleLogin)

router.get("/profile", authMiddleware, (req, res) => {
    res.status(200).json({ message: "You are authorized to view this profile.", user: req.user });
});



module.exports = router;