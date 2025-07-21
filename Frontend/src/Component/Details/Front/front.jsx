import React from "react";
import IMG from "../../../assets/BatalogoBgremove.png";
import IMG1 from "../../../assets/Frontimg.png";
import { useNavigate } from "react-router-dom";
import "./front.css";
const front = () => {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("/info"); // Navigate to the next page
  };
  return (
    <div className="front-container">
      <div>
        <div className="front">
          <img src={IMG} ></img>
          <div className="front-header">
            <h3>Where style meets every step</h3>
            <a>
              <button className="front-btn" onClick={() => navigate("/login")}>Login</button>
            </a>
            <a onClick={handleNext}>
              <button className="front-btn">Register</button>
            </a>
          </div>
        </div>
        <p>Mehta-08</p>
      </div>
    </div>
  );
};

export default front;
