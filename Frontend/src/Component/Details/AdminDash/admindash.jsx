import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";

const AdminDash = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);

  // Fetch users on load
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/all");
        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        toast.error("Failed to load user data");
        console.error("Fetch error:", err);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.personalInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (user) => {
    setEditMode(true);
    setEditData(JSON.parse(JSON.stringify(user))); // deep clone
  };

  const handleEditChange = (section, field, value) => {
    setEditData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/user/update/${editData._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editData),
        }
      );
      const result = await res.json();
      if (result.success) {
        toast.success("User updated successfully");
        setEditMode(false);
        setEditData(null);
        const updatedUsers = users.map((u) =>
          u._id === editData._id ? editData : u
        );
        setUsers(updatedUsers);
      } else {
        toast.error(result.message || "Update failed");
      }
    } catch (err) {
      toast.error("Error updating user");
      console.error("Update error:", err);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/user/delete/${userId}`,
        {
          method: "DELETE",
        }
      );

      const contentType = res.headers.get("content-type");
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Non-JSON response:", text);
        throw new Error("Unexpected response type (not JSON)");
      }

      const result = await res.json();
      if (result.success) {
        toast.success("User deleted successfully");
        setUsers(users.filter((u) => u._id !== userId));
      } else {
        toast.error(result.message || "Delete failed");
      }
    } catch (err) {
      toast.error("Error deleting user");
      console.error("Delete error:", err);
    }
  };

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
              <td className="p-2">{user.employeeInfo?.employeeId || "N/A"}</td>
              <td className="p-2">{user.personalInfo?.name}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => setSelectedUser(user)}
                  className="text-blue-600 hover:text-blue-800"
                  title="View"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => handleEditClick(user)}
                  className="text-green-600 hover:text-green-800"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <div className="mb-2">
              <strong>Name:</strong> {selectedUser.personalInfo?.name}
            </div>
            <div className="mb-2">
              <strong>User ID:</strong> {selectedUser.userId}
            </div>
            <div className="mb-2">
              <strong>PAN No:</strong> {selectedUser.personalInfo?.pan}
            </div>
            <div className="mb-2">
              <strong>Aadhar No:</strong> {selectedUser.personalInfo?.aadhar}
            </div>
            <div className="mb-2">
              <strong>Employee ID:</strong>{" "}
              {selectedUser.employeeInfo?.employeeId}
            </div>
            <div className="mb-2">
              <strong>DOB:</strong>{" "}
              {selectedUser.personalInfo?.dob
                ? new Date(selectedUser.personalInfo.dob).toLocaleDateString()
                : "N/A"}
            </div>
            <div className="mb-2">
              <strong>DOJ:</strong>{" "}
              {selectedUser.employeeInfo?.doj
                ? new Date(selectedUser.employeeInfo.doj).toLocaleDateString()
                : "N/A"}
            </div>
            <div className="mb-2">
              <strong>UAN No:</strong> {selectedUser.employeeInfo?.uan}
            </div>
            <div className="mb-2">
              <strong>Gratuity Name:</strong>{" "}
              {selectedUser.employeeInfo?.gratuity}
            </div>
            <div className="mb-2">
              <strong>Designation:</strong>{" "}
              {selectedUser.employeeInfo?.designation}
            </div>
            <div className="mb-2">
              <strong>PF Nominee Name:</strong>{" "}
              {selectedUser.employeeInfo?.pfNominee}
            </div>
            <div className="mb-2">
              <strong>Bank Name:</strong> {selectedUser.bankInfo?.bankName}
            </div>
            <div className="mb-2">
              <strong>Account No:</strong> {selectedUser.bankInfo?.accountNo}
            </div>
            <div className="mb-2">
              <strong>IFSC:</strong> {selectedUser.bankInfo?.ifsc}
            </div>
            <div className="mb-2">
              <strong>Nominee:</strong> {selectedUser.bankInfo?.nomineeName}
            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editMode && editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>

            <div className="mb-2">
              <label className="block font-semibold">Name</label>
              <input
                type="text"
                value={editData.personalInfo?.name || ""}
                onChange={(e) =>
                  handleEditChange("personalInfo", "name", e.target.value)
                }
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold">PAN No:</label>
              <input
                type="text"
                value={editData.personalInfo?.pan || ""}
                onChange={(e) =>
                  handleEditChange("personalInfo", "pan", e.target.value)
                }
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold">Aadhar No:</label>
              <input
                type="text"
                value={editData.personalInfo?.aadhar || ""}
                onChange={(e) =>
                  handleEditChange("personalInfo", "aadhar", e.target.value)
                }
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold">Employee ID</label>
              <input
                type="text"
                value={editData.employeeInfo?.employeeId || ""}
                onChange={(e) =>
                  handleEditChange("employeeInfo", "employeeId", e.target.value)
                }
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold">Date of Birth:</label>
              <input
                type="date"
                value={
                  editData.personalInfo?.dob
                    ? new Date(editData.personalInfo.dob)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  handleEditChange("personalInfo", "dob", e.target.value)
                }
                className="border rounded px-2 py-1 w-full"
              />
            </div>

            {/* DOJ */}
            <div className="mb-2">
              <label className="block font-semibold">Date of Joining:</label>
              <input
                type="date"
                value={
                  editData.employeeInfo?.doj
                    ? new Date(editData.employeeInfo.doj)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  handleEditChange("employeeInfo", "doj", e.target.value)
                }
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold">Designation</label>
              <input
                type="text"
                value={editData.employeeInfo?.designation || ""}
                onChange={(e) =>
                  handleEditChange(
                    "employeeInfo",
                    "designation",
                    e.target.value
                  )
                }
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold">UAN No:</label>
              <input
                type="text"
                value={editData.employeeInfo?.uan || ""}
                onChange={(e) =>
                  handleEditChange("employeeInfo", "uan", e.target.value)
                }
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold">Gratuity Name:</label>
              <input
                type="text"
                value={editData.employeeInfo?.gratuity || ""}
                onChange={(e) =>
                  handleEditChange("employeeInfo", "gratuity", e.target.value)
                }
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold">PF Nominee Name:</label>
              <input
                type="text"
                value={editData.employeeInfo?.pfNominee || ""}
                onChange={(e) =>
                  handleEditChange("employeeInfo", "pfNominee", e.target.value)
                }
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            {/* Bank */}
            <div className="mb-2">
              <label className="block font-semibold">Bank Name</label>
              <input
                type="text"
                value={editData.bankInfo?.bankName || ""}
                onChange={(e) =>
                  handleEditChange("bankInfo", "bankName", e.target.value)
                }
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold">Account No</label>
              <input
                type="text"
                value={editData.bankInfo?.accountNo || ""}
                onChange={(e) =>
                  handleEditChange("bankInfo", "accountNo", e.target.value)
                }
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold">IFSC</label>
              <input
                type="text"
                value={editData.bankInfo?.ifsc || ""}
                onChange={(e) =>
                  handleEditChange("bankInfo", "ifsc", e.target.value)
                }
                className="border rounded px-2 py-1 w-full"
              />
            </div>

            <div className="mb-2">
              <label className="block font-semibold">Nominee Name</label>
              <input
                type="text"
                value={editData.bankInfo?.nomineeName || ""}
                onChange={(e) =>
                  handleEditChange("bankInfo", "nomineeName", e.target.value)
                }
                className="border rounded px-2 py-1 w-full"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDash;
