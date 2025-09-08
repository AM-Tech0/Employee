// index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: "https://employee-weld-three.vercel.app", // ✅ your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// API routes
app.use("/api/user", userRoutes);

// ✅ For Vercel deployment: don't use app.listen()
module.exports = app;
