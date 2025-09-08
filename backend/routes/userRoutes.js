// /routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
} = require("../controllers/userController");
const User = require("../models/User");

// ✅ Register new user
router.post("/register", registerUser);

// ✅ Login user
router.post("/login", loginUser);

// ✅ Get all users
router.get("/all", getAllUsers);

// ✅ Update user by ID
router.put("/update/:id", updateUser);

// ✅ Delete user by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    console.error("❌ Delete Error:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error during deletion" });
  }
});

module.exports = router;
