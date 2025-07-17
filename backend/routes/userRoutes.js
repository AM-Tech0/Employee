const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerUser, loginUser,getAllUsers } = require('../controllers/userController');

// Save Full Form
router.post('/register', async (req, res) => {
  const { userId, password, personalInfo, employeeInfo, bankInfo } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      userId,
      password: hashedPassword,
      personalInfo,
      employeeInfo,
      bankInfo
    });
    await user.save();
    res.json({ success: true, message: 'User registered' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Registration error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await User.findOne({ userId });
    if (!user) return res.status(400).json({ message: 'User not found' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Login error' });
  }
});
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/all', getAllUsers);




module.exports = router;