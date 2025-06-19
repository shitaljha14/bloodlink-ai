const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  getAdminStats,
  getAllUsers,
  updateUserRole,
  deleteUser,
  fulfillRequest,
  deleteRequest
} = require("../controllers/adminController");

router.put("/requests/:id/fulfill", authMiddleware, fulfillRequest);
router.delete("/requests/:id", authMiddleware, deleteRequest);
router.get("/stats", authMiddleware, getAdminStats);
router.get("/users", authMiddleware, getAllUsers);
router.put("/users/:id/role", authMiddleware, updateUserRole);
router.delete("/users/:id", authMiddleware, deleteUser);

module.exports = router;
