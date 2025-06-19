const BloodRequest = require("../models/BloodRequest");

exports.getMyRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ user: req.user.id }).populate("acceptedBy", "name email");
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching receiver's requests:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
