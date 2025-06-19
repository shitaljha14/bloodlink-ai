const BloodRequest = require("../models/BloodRequest");


exports.createRequest = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Debug line

    const { bloodGroup, location, reason, units, urgency } = req.body;

    const newRequest = new BloodRequest({
      user: req.user.id,
      bloodGroup,
      location,
      reason,
      units,
      urgency,
    });

    await newRequest.save();

    res.status(201).json({ message: "Blood request submitted successfully!" });
  } catch (error) {
    console.error("Error creating blood request:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find()
  .populate("user", "name")
  .select("status bloodGroup location units urgency createdAt");

    res.json(requests);
  } catch (error) {
    console.error("Failed to fetch blood requests:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// ✅ Get requests of the logged-in user (optional)
exports.getMyRequests = async (req, res) => {
  try {
    const myRequests = await BloodRequest.find({ user: req.user.id });
    res.json(myRequests);
  } catch (error) {
    console.error("Error fetching user requests:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
