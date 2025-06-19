const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/user');
const upload = require('../middleware/uploadMiddleware');
const { updateProfile } = require('../controllers/updateProfileController');

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error('Error in /me route:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});
router.put('/update', authMiddleware, async (req, res) => {
  try {
    const { name, bloodGroup, location } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, bloodGroup, location },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    console.error('Update failed:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});
router.put('/users/update', authMiddleware, upload.single('photo'), updateProfile);

module.exports = router;
