import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeDetails = () => {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();

  // ✅ Redirect safely using useEffect
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null; // Prevent render before redirect

  // Destructure all user info
  const {
    name,
    fatherName,
    dob,
    pan,
    aadhar
  } = user.personalInfo || {};

  const {
    doj,
    designation,
    employeeId,
    uan,
    gratuity,
    pfNominee,
    resignDate
  } = user.employeeInfo || {};

  const {
    accountNo,
    ifsc,
    bankName,
    nomineeName
  } = user.bankInfo || {};

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="details-container p-6  mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Employee Details</h1>
<div className="details-content space-y-6 flex flex-wrap justify-center gap-20 ">
  {/* Personal Info */}
      <div className="detail-section mb-6 ">
        <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
        <p className='text-black'><strong>Name:</strong> {name}</p>
        <p><strong>Father Name:</strong> {fatherName}</p>
        <p><strong>DOB:</strong> {dob ? new Date(dob).toLocaleDateString() : 'N/A'}</p>
        <p><strong>PAN:</strong> {pan}</p>
        <p><strong>Aadhar:</strong> {aadhar}</p>
      </div>

      {/* Employment Info */}
      <div className="detail-section mb-6">
        <h2 className="text-xl font-semibold mb-2">Employment Information</h2>
        <p><strong>Date of Joining:</strong> {doj ? new Date(doj).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Designation:</strong> {designation}</p>
        <p><strong>Employee ID:</strong> {employeeId}</p>
        <p><strong>UAN:</strong> {uan}</p>
        <p><strong>Gratuity Name:</strong> {gratuity}</p>
        <p><strong>PF Nominee:</strong> {pfNominee}</p>
        <p><strong>Resign Date:</strong> {resignDate ? new Date(resignDate).toLocaleDateString() : 'N/A'}</p>
      </div>

      {/* Bank Info */}
      <div className="detail-section mb-6">
        <h2 className="text-xl font-semibold mb-2">Bank Information</h2>
        <p><strong>Account No:</strong> {accountNo}</p>
        <p><strong>IFSC:</strong> {ifsc}</p>
        <p><strong>Bank Name:</strong> {bankName}</p>
        <p><strong>Nominee:</strong> {nomineeName}</p>
      </div>

</div>
      
      {/* Logout Button */}
      <div className="text-center">
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetails;

