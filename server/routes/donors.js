const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authorizeRoles");

const {
  getDonationHistory,
  getAvailableRequests,
  getMatchingRequests,
  acceptBloodRequest,
  getAcceptedRequests,
  getDonors,
  getPendingRequests,
  acceptRequest,
  rejectRequest,
  updateAvailability,
  toggleAvailability,
} = require("../controllers/donorController");
router.get("/", authMiddleware, authorizeRoles("admin"), getDonors);

router.use(authMiddleware, authorizeRoles("donor"));

router.get("/requests/pending", getPendingRequests);
router.get("/requests/available", getAvailableRequests);
router.get("/matching-requests", getMatchingRequests);
router.get("/accepted-requests", getAcceptedRequests);
router.get("/history", getDonationHistory);

router.put("/requests/:id/accept", acceptRequest);
router.put("/requests/:id/reject", rejectRequest);
router.post("/accept-request/:id", acceptBloodRequest); 

router.put("/update-availability", updateAvailability);
router.put("/toggle-availability", toggleAvailability);


module.exports = router;
