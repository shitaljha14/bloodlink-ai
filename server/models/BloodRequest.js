const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  reason: {
    type: String, // should match your frontend
    default: 'N/A'
  },
  units: {
    type: Number,
    required: true,
  },
  urgency: {
    type: String,
    required: true,
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null, // means not accepted yet
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "fulfilled"],
    default: "pending", // ✅ default
  },
  

});

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);
