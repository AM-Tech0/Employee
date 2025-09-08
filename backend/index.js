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

// ✅ Allowed origins (add your frontend + localhost for dev)
const allowedOrigins = [
  "https://employee-weld-three.vercel.app", // deployed frontend
  "http://localhost:3000", // local development
];

// ✅ CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ Handle preflight requests
app.options("*", cors());

// Middleware
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// API routes
app.use("/api/user", userRoutes);

// ✅ For Vercel deployment: don't use app.listen()
module.exports = app;
