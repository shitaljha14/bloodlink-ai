const BloodRequest = require("../models/BloodRequest");
const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");

// controllers/donorController.js
const getDonors = async (req, res) => {
  try {
    const donors = await User.find({ role: "donor" }); // 👈 make sure role is correct
    res.status(200).json(donors);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching donors" });
  }
};


const getMatchingRequests = async (req, res) => {
  try {
    const donor = await User.findById(req.user.id);

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    if (!donor.isAvailable) {
      return res.status(403).json({ message: "You are not available to accept requests." });
    }

    const matchingRequests = await BloodRequest.find({
      bloodGroup: donor.bloodGroup.toUpperCase(),

      location: donor.location,
      
        })
      .populate("user", "name")
      .sort({ urgency: -1 });

    res.json(matchingRequests);
  } catch (error) {
    console.error("Error fetching matching requests:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const acceptBloodRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const donorId = req.user.id;

    const request = await BloodRequest.findById(requestId).populate("user", "email name");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status.toLowerCase() !== "pending") {
      return res.status(400).json({ message: "This request has already been accepted or fulfilled." });
    }

    request.status = "accepted";
    request.acceptedBy = donorId;
    await request.save();
    await User.findByIdAndUpdate(donorId, { isAvailable: false });
    try {
      await sendEmail(
        request.user.email,
        "Blood Request Accepted - BloodLink AI",
        `Hi ${request.user.name},\n\nYour request for blood has been accepted by a donor. They will contact you shortly.\n\nThanks,\nTeam BloodLink AI`
      );
    } catch (emailErr) {
      console.error("Email failed:", emailErr.message);
    }
    
    res.json({ message: "Request accepted and receiver notified via email." });
  } catch (error) {
    console.error("Error accepting request:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAcceptedRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ acceptedBy: req.user.id }).populate("user", "name");
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching accepted requests:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getDonationHistory = async (req, res) => {
  try {
    const donorId = req.user.id;

    const acceptedRequests = await BloodRequest.find({ acceptedBy: donorId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(acceptedRequests);
  } catch (error) {
    console.error("Error fetching donation history:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAvailableRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ status: "pending" }).populate("user", "name");
    res.status(200).json(requests);
  } catch (err) {
    console.error("Error fetching available requests:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPendingRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ status: "pending" }).populate("user", "name email");
    res.json(requests);
  } catch (err) {
    console.error("Error fetching requests:", err.message);
    res.status(500).json({ message: "Failed to load requests" });
  }
};

const acceptRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request || request.status !== "pending") {
      return res.status(400).json({ message: "Invalid request" });
    }

    request.status = "accepted";
    request.acceptedBy = req.user._id;
    await request.save();

    res.json({ message: "Request accepted" });
  } catch (err) {
    res.status(500).json({ message: "Error accepting request" });
  }
};

const rejectRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request || request.status !== "pending") {
      return res.status(400).json({ message: "Invalid request" });
    }

    request.status = "rejected";
    await request.save();

    res.json({ message: "Request rejected" });
  } catch (err) {
    res.status(500).json({ message: "Error rejecting request" });
  }
};
const updateAvailability = async (req, res) => {
  try {
    const donorId = req.user.id;
    const { isAvailable } = req.body;

    const donor = await User.findById(donorId);

    if (!donor || donor.role !== "donor") {
      return res.status(403).json({ message: "Not authorized" });
    }

    donor.isAvailable = isAvailable;
    await donor.save();

    res.status(200).json({ message: "Availability updated", isAvailable: donor.isAvailable });
  } catch (error) {
    console.error("Error updating availability:", error);
    res.status(500).json({ message: "Server error" });
  }
};

 const toggleAvailability =async (req, res) => {
  try {
    const donor = await User.findById(req.user.id);

    if (!donor || donor.role !== "donor") {
      return res.status(403).json({ message: "Access denied" });
    }

    donor.isAvailable = !donor.isAvailable;
    await donor.save();

    res.json({ message: `Availability set to ${donor.isAvailable}` });
  } catch (err) {
    console.error("Error toggling availability:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getDonors,
  getMatchingRequests,
  acceptBloodRequest,
  getAcceptedRequests,
  getDonationHistory,
  getAvailableRequests,
  getPendingRequests,
  acceptRequest,
  rejectRequest,
  updateAvailability,
toggleAvailability,
};
