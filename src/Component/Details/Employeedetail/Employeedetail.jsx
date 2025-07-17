import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IMG from '../../../assets/BatalogoBgremove.png';


const Employeedetail = () => {
  const [doj, setDoj] = useState('');
  const [designation, setDesignation] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [uan, setUan] = useState('');
  const [gratuity, setGratuity] = useState('');
  const [pfNominee, setPfNominee] = useState('');
  const [resignDate, setResignDate] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const { personalInfo } = location.state || {};

  const handleNext = () => {
    const employeeInfo = {
      doj, designation, employeeId, uan, gratuity, pfNominee, resignDate
    };
    navigate('/bank', { state: { personalInfo, employeeInfo } });
  };

  return (
    <div className='info-container'>
      <div className='info'>
        <img src={IMG} alt="" width='150px' />
        <h1>Employee Details</h1>
        <div className='form'>
          <label>Date of Joining</label>
          <input type='date' value={doj} onChange={(e) => setDoj(e.target.value)} />
          <label>Designation Name</label>
          <input type='text' value={designation} onChange={(e) => setDesignation(e.target.value)} />
          <label>Employee ID</label>
          <input type='text' value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
          <label>UAN No</label>
          <input type='text' value={uan} onChange={(e) => setUan(e.target.value)} />
          <label>Gratuity Name</label>
          <input type='text' value={gratuity} onChange={(e) => setGratuity(e.target.value)} />
          <label>PF Nominee Name</label>
          <input type='text' value={pfNominee} onChange={(e) => setPfNominee(e.target.value)} />
          <label>Date of Resigning</label>
          <input type='date' value={resignDate} onChange={(e) => setResignDate(e.target.value)} />
        </div>
        <button className='btn' onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Employeedetail;
