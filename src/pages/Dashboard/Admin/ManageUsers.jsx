import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../providers/AuthProvider";


const ManageUsers = () => {
  const { user } = useContext(AuthContext);
  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/users`, { withCredentials: true });
      return data;
    },
  })

  // Make Admin
  const handleMakeAdmin = async (userId) => {
    try {
     const {data}= await axios.put(`http://localhost:3000/users/make-admin/${userId}`, { withCredentials: true });
     if(data.modifiedCount==1 || data.upsertedCount==1){
      refetch();
     return toast.success("User promoted to Admin");
     }
    } catch (error) {
      toast.error("Failed to promote user to Admin");
    }
  };

  // Make Agent
  const handleMakeAgent = async (userId) => {
    try {
    const {data} =  await axios.put(`http://localhost:3000/users/make-agent/${userId}`, { withCredentials: true });
    if(data.modifiedCount==1 || data.upsertedCount==1){
      refetch();
     return toast.success("User promoted to Agent");
    }
 
    } catch (error) {
      toast.error("Failed to promote user to Agent");
    }
  };

  // Mark as Fraud
  const handleMarkAsFraud = async (userId, email) => {
    try {
      const { data } = await axios.put(`http://localhost:3000/users/mark-fraud/${userId}`, { withCredentials: true });
      if (data.modifiedCount == 1) {
        const { data: deleteProperties } = await axios.delete(`http://localhost:3000/properties/agent/${email}`);
        if (deleteProperties.deletedCount > 0) {
          toast.success("Agent marked as Fraud");
          refetch();
        }
      }
    } catch (error) {
      toast.error("Failed to mark agent as Fraud");
    }
  };

  // Delete User
  const handleDeleteUser = async (uid) => {
    try {
    const {data} =  await axios.delete(`http://localhost:3000/users/${uid}`, { withCredentials: true });
    if(data.deletedCount==1){
      refetch();
      return toast.success("User deleted successfully");
    }
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
  isLoading && <p>Loading...</p>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      {users?.length > 0 ? (
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
            {users?.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="py-2 px-4">{user.username}</td>
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
                        user.fraud ? <span>
                          <button className="btn bg-neutral-600 text-black" disabled> Fraud</button>
                        </span> :  <div className="flex gap-2">
                        <button
                          className="bg-blue-500 text-white py-1 px-3 rounded"
                          onClick={() => handleMakeAdmin(user._id)}
                        >
                          Make Admin
                        </button><button
                          className="bg-orange-500 text-white py-1 px-3 rounded"
                          onClick={() => handleMarkAsFraud(user._id,user.email)}
                        >
                          Mark as Fraud
                        </button>
                        </div>
                      )}
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded"
                        onClick={() => handleDeleteUser(user.uid)}
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
