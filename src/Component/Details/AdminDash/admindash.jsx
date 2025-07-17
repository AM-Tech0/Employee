import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaSearch, FaEye } from 'react-icons/fa';


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/user/all');
      const data = await res.json();
      console.log("Received data from backend:", data); // Optional: Debug
      setUsers(data.users || []); // ✅ Fix: Use the array inside the object
    } catch (err) {
      toast.error("Failed to load user data");
      console.error("Fetch error:", err);
    }
  };
  fetchUsers();
}, []);


  const filteredUsers = users.filter(user =>
    user.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.personalInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

      <div className="flex mb-4 items-center gap-2">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by name or user ID"
          className="border p-2 rounded w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="w-full border rounded text-left table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">User ID</th>
            <th className="p-2">Employee ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{user.userId}</td>
              <td className="p-2">{user.employeeInfo?.employeeId || 'N/A'}</td>
              <td className="p-2">{user.personalInfo?.name}</td>
              <td className="p-2">
                <button
                  onClick={() => setSelectedUser(user)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Detail Popup */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">User Details</h2>

            <div className="mb-2"><strong>Name:</strong> {selectedUser.personalInfo?.name}</div>
            <div className="mb-2"><strong>User ID:</strong> {selectedUser.userId}</div>
            <div className="mb-2"><strong>Employee ID:</strong> {selectedUser.employeeInfo?.employeeId}</div>
            <div className="mb-2"><strong>DOB:</strong> {new Date(selectedUser.personalInfo?.dob).toLocaleDateString()}</div>
            <div className="mb-2"><strong>Designation:</strong> {selectedUser.employeeInfo?.designation}</div>
            <div className="mb-2"><strong>Bank Name:</strong> {selectedUser.bankInfo?.bankName}</div>
            <div className="mb-2"><strong>IFSC:</strong> {selectedUser.bankInfo?.ifsc}</div>
            <div className="mb-2"><strong>Nominee:</strong> {selectedUser.bankInfo?.nomineeName}</div>

            <button
              onClick={() => setSelectedUser(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;