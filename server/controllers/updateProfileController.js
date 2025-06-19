const User = require('../models/user');
const updateProfile = async (req, res) => {
    try {
      const userId = req.user.id;
      const { name, bloodGroup, location } = req.body;
      const photo = req.file ? req.file.filename : undefined;
  
      const updatedFields = {
        name,
        bloodGroup,
        location,
      };
  
      if (photo) {
        updatedFields.photo = photo;
      }
  
      const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, { new: true });
  
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating profile' });
    }
  };
  module.exports = { updateProfile };
  