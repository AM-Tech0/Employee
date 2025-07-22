import React, { useState } from "react";
import IMG from "../../assets/BatalogoBgremove.png";
import IMG1 from "../../assets/info-1.png";
import "./personalinfo.css";
import { useNavigate } from "react-router-dom";

const Personalinfo = () => {
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [dob, setDob] = useState("");
  const [pan, setPan] = useState("");
  const [aadhar, setAadhar] = useState("");

  const navigate = useNavigate();

  const handleNext = () => {
    const personalInfo = { name, fatherName, dob, pan, aadhar };
    navigate("/employee", { state: { personalInfo } });
  };

  return (
    <div className="info-container">
      <div className="info">
        <div className="info-left"> 
          <div></div>
          <div></div>
           <img src={IMG1} alt=""/>
        </div>
        
        <div className="info-box">
          <img src={IMG} alt="" />
          <h1>Personal Details</h1>
          <label>Name</label>
          <input
            type="text"
            value={name} placeholder="Enter your Name"
            onChange={(e) => setName(e.target.value)}
          />
          <label>Father Name</label>
          <input
            type="text"
            value={fatherName} placeholder="Enter Your Father Name"
            onChange={(e) => setFatherName(e.target.value)}
          />
          <label>Your DOB</label>
          <input
            type="date"
            value={dob} placeholder="Enter your date of birth"
            onChange={(e) => setDob(e.target.value)}
          />
          <label>PAN No</label>
          <input
            type="text"
            value={pan} placeholder="Enter your PAN No"
            onChange={(e) => setPan(e.target.value)}
          />
          <label>Aadhar No</label>
          <input
            type="text"
            value={aadhar} placeholder="Enter your Aadhar No"
            onChange={(e) => setAadhar(e.target.value)}
          />
          <button onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Personalinfo;
