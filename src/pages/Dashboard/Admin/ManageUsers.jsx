import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data);
      } catch (error) {
        toast.error("Failed to load users");
      }
    };
    fetchUsers();
  }, []);

  // Make Admin
  const handleMakeAdmin = async (userId) => {
    try {
      await axios.post(`http://localhost:3000/users/make-admin/${userId}`);
      toast.success("User promoted to Admin");
      updateUserRole(userId, "admin");
    } catch (error) {
      toast.error("Failed to promote user to Admin");
    }
  };

  // Make Agent
  const handleMakeAgent = async (userId) => {
    try {
      await axios.post(`http://localhost:3000/users/make-agent/${userId}`);
      toast.success("User promoted to Agent");
      updateUserRole(userId, "agent");
    } catch (error) {
      toast.error("Failed to promote user to Agent");
    }
  };

  // Mark as Fraud
  const handleMarkAsFraud = async (userId) => {
    try {
      await axios.post(`http://localhost:3000/users/mark-fraud/${userId}`);
      toast.success("Agent marked as Fraud");
      updateUserRole(userId, "fraud");
      // Optionally remove the agent's properties
      await axios.delete(`http://localhost:3000/properties/agent/${userId}`);
    } catch (error) {
      toast.error("Failed to mark agent as Fraud");
    }
  };

  // Delete User
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      toast.success("User deleted successfully");
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  // Update User Role Locally
  const updateUserRole = (userId, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      {users.length > 0 ? (
        <table className="min-w-full bg-white shadow rounded overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4 capitalize">{user.role || "user"}</td>
                <td className="py-2 px-4">
                  {user.role !== "admin" && (
                    <div className="flex gap-2">
                      {user.role !== "admin" && user.role !== "agent" && (
                        <button
                          className="bg-blue-500 text-white py-1 px-3 rounded"
                          onClick={() => handleMakeAdmin(user._id)}
                        >
                          Make Admin
                        </button>
                      )}
                      {user.role !== "agent" && user.role !== "fraud" && (
                        <button
                          className="bg-green-500 text-white py-1 px-3 rounded"
                          onClick={() => handleMakeAgent(user._id)}
                        >
                          Make Agent
                        </button>
                      )}
                      {user.role === "agent" && (
                        <button
                          className="bg-orange-500 text-white py-1 px-3 rounded"
                          onClick={() => handleMarkAsFraud(user._id)}
                        >
                          Mark as Fraud
                        </button>
                      )}
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  {user.role === "fraud" && (
                    <span className="text-red-600 font-bold">Fraud</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 mt-4">No users to manage.</p>
      )}
    </div>
  );
};

export default ManageUsers;
