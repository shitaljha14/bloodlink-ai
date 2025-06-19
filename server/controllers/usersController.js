// server/controllers/userController.js

const User = require('../models/User');

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, bloodGroup, location } = req.body;
    const photo = req.file ? req.file.filename : undefined;

    const updatedFields = { name, bloodGroup, location };
    if (photo) updatedFields.photo = photo;

    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, { new: true });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Profile update failed:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = {
  updateProfile,
};
