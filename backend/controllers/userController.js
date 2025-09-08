// /controllers/userController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register user
const registerUser = async (req, res) => {
  try {
    const { userId, password, personalInfo, employeeInfo, bankInfo } = req.body;

    // Check if userId already exists
    const existing = await User.findOne({ userId });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userId,
      password: hashedPassword,
      personalInfo,
      employeeInfo,
      bankInfo,
    });

    res.status(201).json({ success: true, user: newUser });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error during registration" });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const user = await User.findOne({ userId });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ success: true, token, user });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ success: false, message: "Login error" });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ success: true, users });
  } catch (err) {
    console.error("❌ Fetch users error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    // If password is updated → hash it again
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User updated", user: updatedUser });
  } catch (error) {
    console.error("❌ Update error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while updating" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
};
