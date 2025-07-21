import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./User.css";

const User = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { personalInfo, employeeInfo, bankInfo } = location.state || {};

  const handleSubmitAll = async () => {
    const response = await fetch('http://localhost:5000/api/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        password,
        personalInfo,
        employeeInfo,
        bankInfo
      })
    });

    const data = await response.json();
    if (data.success) {
      toast.success("Details saved successfully!");
      navigate("/"); // front page
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="user-container">
      <div className="user">
        <h1>User</h1>
        <h3>Create your user ID and password.</h3>
        <div className="form">
          <label>User ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your user ID"
          />
          <label>Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <div className="password-toggle">
              <input type="checkbox" onClick={() => setShowPassword(!showPassword)} />
              <label className="pass">Show password</label>
            </div>
          </div>
        </div>
        <button className="btn" onClick={handleSubmitAll}>Save</button>
      </div>
    </div>
  );
};

export default User;
