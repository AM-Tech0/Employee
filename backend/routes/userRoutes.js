const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerUser, loginUser,getAllUsers,updateUser } = require('../controllers/userController');
// DELETE /api/user/delete/:id
router.delete('/delete/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete Error:', err);
    res.status(500).json({ success: false, message: 'Server error during deletion' });
  }
});
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
router.put('/update/:id', updateUser); // <- controller needed
module.exports = router;


// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User'); // Adjust path if needed

// // GET all users
// router.get('/all', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json({ success: true, users });
//   } catch (err) {
//     console.error("Fetch error:", err);
//     res.status(500).json({ success: false, message: "Error fetching users" });
//   }
// });

// // UPDATE a user
// router.put('/update/:id', async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     res.json({ success: true, user: updatedUser });
//   } catch (err) {
//     console.error("Update error:", err);
//     res.status(500).json({ success: false, message: "Error updating user" });
//   }
// });

// // DELETE a user
// router.delete('/delete/:id', async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);

//     if (!deletedUser) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     res.json({ success: true, message: "User deleted successfully" });
//   } catch (err) {
//     console.error("Delete error:", err);
//     res.status(500).json({ success: false, message: "Error deleting user" });
//   }
// });

// module.exports = router;
