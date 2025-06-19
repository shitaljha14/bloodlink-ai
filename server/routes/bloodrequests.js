const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createRequest,
  getAllRequests,
  getMyRequests,
} = require("../controllers/bloodRequestController");

// 🔴 POST - Create a new blood request
router.post("/", authMiddleware, createRequest);

// 🟢 GET - Fetch all blood requests (admin or donor view)
router.get("/", authMiddleware, getAllRequests);

// 🔵 GET - Fetch blood requests of the currently logged-in user
router.get("/my", authMiddleware, getMyRequests);

module.exports = router;
