// src/config.js
const API_BASE_URL = process.env.NODE_ENV === "production"
  ? "https://employee-backend-fawn.vercel.app"
  : "http://localhost:5000";

export default API_BASE_URL;
