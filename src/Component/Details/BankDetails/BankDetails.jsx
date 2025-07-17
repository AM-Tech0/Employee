import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IMG from '../../../assets/BatalogoBgremove.png';
import './Bankdetails.css';

const BankDetails = () => {
  const [accountNo, setAccountNo] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [bankName, setBankName] = useState('');
  const [nomineeName, setNomineeName] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { personalInfo, employeeInfo } = location.state || {};

  const handleNext = () => {
    const bankInfo = { accountNo, ifsc, bankName, nomineeName };
    navigate('/user', { state: { personalInfo, employeeInfo, bankInfo } });
  };

  return (
    <div className='info-container'>
      <div className='info'>
        <img src={IMG} alt="" width='150px' />
        <h1>Bank Details</h1>
        <div className='form'>
          <label>Account No</label>
          <input type='text' value={accountNo} onChange={(e) => setAccountNo(e.target.value)} />
          <label>IFSC ID</label>
          <input type='text' value={ifsc} onChange={(e) => setIfsc(e.target.value)} />
          <label>Bank Name</label>
          <input type='text' value={bankName} onChange={(e) => setBankName(e.target.value)} />
          <label>Nominee Name</label>
          <input type='text' value={nomineeName} onChange={(e) => setNomineeName(e.target.value)} />
        </div>
        <button className='btn' onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default BankDetails;
