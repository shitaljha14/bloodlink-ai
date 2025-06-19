// server/models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["donor", "receiver", "admin"], default: "receiver" },
  bloodGroup: { type: String },
  location: { type: String },
  lastDonatedAt: {
    type: Date,
    default: null,
  },
  
  isAvailable: {
    type: Boolean,
    default: true,
  },
  photo: { type: String },
  
}, 
{ timestamps: true });

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
