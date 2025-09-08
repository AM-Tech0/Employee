import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import IMG from "../../../assets/Frontimg-remove.png";
import IMG1 from "../../../assets/BatalogoBgremove.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch(`https://backend-iota-ten-32.vercel.app/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        toast.success("Login Successful");
        navigate("/employee-details", { state: { user: data.user } });
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Server error");
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <div className="login-box">
          <img className="login-logo" src={IMG1} alt="Logo" />
          <h2>Welcome Back!</h2>
          <h3>Employee Login</h3>

          <label>User ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your User ID"
          />

          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          <div className="show-password">
            <input
              className="login-checkbox"
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className="pass">Show password</label>
          </div>

          <button onClick={handleLogin}>Login</button>
        </div>

        <img className="login-image" src={IMG} alt="Illustration" />
      </div>
    </div>
  );
};

export default Login;
