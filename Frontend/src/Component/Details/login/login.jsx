import React, { useState } from "react";
import "./login.css"; // Assuming you have a CSS file for styling
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import IMG from "../../../assets/Frontimg-remove.png";
import IMG1 from "../../../assets/BatalogoBgremove.png"; // Assuming you have a logo image

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password }),
      });

      const data = await res.json();

      if (data.token) {
        toast.success("Login Successful");
        navigate("/employee-details", { state: { user: data.user } });
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <div className=" login-box">
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"/>
           <input className="login-checkbox"
              type="checkbox"
              onClick={() => setShowPassword(!showPassword)}/>
            <label className="pass">Show password</label>
          <button onClick={handleLogin}>Login</button>
        </div>

        <img className="login-image" src={IMG} alt="" />
      </div>
    </div>
  );
};

export default Login;
