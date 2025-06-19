const express = require("express");
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');

const {
  register,
  login,
  getMe,
  updateProfile,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");


router.post('/register', upload.single('photo'), register);


router.post("/login", login);
router.get("/me", authMiddleware, getMe);
router.put("/update-profile", authMiddleware, updateProfile);

module.exports = router;
