const User = require("../models/user");
const BloodRequest = require("../models/BloodRequest");

const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDonors = await User.countDocuments({ role: "donor" });
    const totalRequests = await BloodRequest.countDocuments();

    res.status(200).json({
      totalUsers,
      totalDonors,
      totalRequests,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Failed to get users:", error.message);
    res.status(500).json({ message: "Error fetching users" });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    console.error("Error updating role:", error.message);
    res.status(500).json({ message: "Error updating role" });
  }
};


const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ message: "Error deleting user" });
  }
};
const fulfillRequest = async (req, res) => {
  try {
    const requestId = req.params.id;

    const request = await BloodRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = "fulfilled";
    await request.save();

    res.status(200).json({ message: "Request marked as fulfilled" });
  } catch (error) {
    console.error("Error fulfilling request:", error.message);
    res.status(500).json({ message: "Error fulfilling request" });
  }
};


const deleteRequest = async (req, res) => {
  try {
    const requestId = req.params.id;

    const request = await BloodRequest.findByIdAndDelete(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    console.error("Error deleting request:", error.message);
    res.status(500).json({ message: "Error deleting request" });
  }
};

module.exports = {
  getAdminStats,
  getAllUsers,
  updateUserRole,
  deleteUser,
  fulfillRequest,
  deleteRequest,
};
