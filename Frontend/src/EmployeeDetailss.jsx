import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeDetails = () => {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  const { personalInfo, employeeInfo, bankInfo } = user;

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate('/');
    }, 1500); // wait for 1.5 seconds so user sees the toast
  };

  return (
    <div className="details-container p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Employee Details</h1>

      <div className="detail-section mb-6">
        <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
        <p><strong>Name:</strong> {personalInfo.name}</p>
        <p><strong>Father Name:</strong> {personalInfo.fatherName}</p>
        <p><strong>DOB:</strong> {new Date(personalInfo.dob).toLocaleDateString()}</p>
        <p><strong>PAN:</strong> {personalInfo.pan}</p>
        <p><strong>Aadhar:</strong> {personalInfo.aadhar}</p>
      </div>

      <div className="detail-section mb-6">
        <h2 className="text-xl font-semibold mb-2">Employment Information</h2>
        <p><strong>Date of Joining:</strong> {new Date(employeeInfo.doj).toLocaleDateString()}</p>
        <p><strong>Designation:</strong> {employeeInfo.designation}</p>
        <p><strong>Employee ID:</strong> {employeeInfo.employeeId}</p>
        <p><strong>UAN:</strong> {employeeInfo.uan}</p>
        <p><strong>Gratuity Name:</strong> {employeeInfo.gratuity}</p>
        <p><strong>PF Nominee:</strong> {employeeInfo.pfNominee}</p>
        <p><strong>Resign Date:</strong> {employeeInfo.resignDate ? new Date(employeeInfo.resignDate).toLocaleDateString() : 'N/A'}</p>
      </div>

      <div className="detail-section mb-6">
        <h2 className="text-xl font-semibold mb-2">Bank Information</h2>
        <p><strong>Account No:</strong> {bankInfo.accountNo}</p>
        <p><strong>IFSC:</strong> {bankInfo.ifsc}</p>
        <p><strong>Bank Name:</strong> {bankInfo.bankName}</p>
        <p><strong>Nominee:</strong> {bankInfo.nomineeName}</p>
      </div>

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
