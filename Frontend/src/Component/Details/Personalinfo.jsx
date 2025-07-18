import React, { useState } from 'react';
import IMG from '../../assets/BatalogoBgremove.png';
import './personalinfo.css';
import { useNavigate } from 'react-router-dom';

const Personalinfo = () => {
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [dob, setDob] = useState('');
  const [pan, setPan] = useState('');
  const [aadhar, setAadhar] = useState('');

  const navigate = useNavigate();

  const handleNext = () => {
    const personalInfo = { name, fatherName, dob, pan, aadhar };
    navigate('/employee', { state: { personalInfo } });
  };

  return (
    <div className='info-container'>
      <div className='info'>
        <img src={IMG} alt="" width="150px" />
        <h1>Personal Details</h1>
        <div className='form'>
          <label>Name</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
          <label>Father Name</label>
          <input type='text' value={fatherName} onChange={(e) => setFatherName(e.target.value)} />
          <label>Your DOB</label>
          <input type='date' value={dob} onChange={(e) => setDob(e.target.value)} />
          <label>PAN No</label>
          <input type='text' value={pan} onChange={(e) => setPan(e.target.value)} />
          <label>Aadhar No</label>
          <input type='text' value={aadhar} onChange={(e) => setAadhar(e.target.value)} />
        </div>
        <button className='btn' onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Personalinfo;


// // function Home() {
// //   const navigate = useNavigate();

// //   const handleClick = () => {
// //     navigate('/next'); // navigate to the next page
// //   };

// //   return (
// //     <div className="p-6 text-center">
// //       <h1 className="text-2xl font-bold mb-4">Welcome to Home Page</h1>
// //       <button
// //         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
// //         onClick={handleClick}
// //       >
// //         Go to Next Page
// //       </button>
// //     </div>
// //   );
// // }

// // export default Home;
// import React from 'react';
// import './personalinfo.css';
// import { useNavigate } from 'react-router-dom';

// const PersonalInfo = () => {
//   const navigate = useNavigate();

//   const handleNext = () => {
//     navigate('/employee');
//   };

//   return (
//     <div className='info'>
//       <h1 className='head'>Personal Details</h1>
//       <div className='form'>
//         <input type='text' placeholder='Enter your name' />
//         <input type='text' placeholder='Enter your Father name' />
//         <label>Your Age</label>
//         <input type='date' />
//         <input type='text' placeholder='Enter your PAN no' />
//         <input type='text' placeholder='Enter your Aadhar no' />
//       </div>
//       <button className='btn' onClick={handleNext}>Next</button>
//     </div>
//   );
// };

// export default PersonalInfo;
