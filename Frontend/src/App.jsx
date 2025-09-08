import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Front from './Component/Details/Front/front.jsx';
import Info from './Component/Details/Personalinfo.jsx';
import EmpForm from './Component/Details/Employeedetail/Employeedetail.jsx'; // Employee Form Page
import Bank from './Component/Details/BankDetails/BankDetails.jsx';
import User from './Component/Details/User/User.jsx';
import Login from './Component/Details/login/login.jsx';
import EmployeeDetails from './Component/Details/Dashboard/EmployeeDetailss.jsx'; // Final Info Display Page
import AdminDash from './Component/Details/AdminDash/admindash.jsx'; // Admin Dashboard Page

function App() {
  return (
    <>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Front />} />

        {/* Multi-Step Form Routes */}
        <Route path="/info" element={<Info />} />
        <Route path="/employee" element={<EmpForm />} />
        <Route path="/bank" element={<Bank />} />
        <Route path="/user" element={<User />} />

        {/* Auth/Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/employee-details" element={<EmployeeDetails />} />

        <Route path="/admin-dashboard" element={<AdminDash />} />

      </Routes>

      {/* Toasts Global Container */}
      <ToastContainer />
    </>
  );
}

export default App;