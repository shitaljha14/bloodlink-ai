// server/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.register = async (req, res) => {
  const { name, email, password, role, bloodGroup, location } = req.body;
  const photo = req.file ? req.file.filename : null;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      bloodGroup,
      location,
      photo,
    });

    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.login = async (req, res) => {
  console.log("Login payload:", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = generateToken(user._id,user.role);
  
      // Send both token and user (excluding password)
      res.status(200).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          bloodGroup: user.bloodGroup,
          location: user.location,
        },
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

exports.updateProfile = async (req, res) => {
  const { name, bloodGroup, location } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, bloodGroup, location },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getMe = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select("-password");
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  exports.getCurrentUser = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  
  
