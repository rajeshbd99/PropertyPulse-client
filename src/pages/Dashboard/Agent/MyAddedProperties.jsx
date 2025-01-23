import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const MyAddedProperties = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {data:properties,isLoading,refetch}=useQuery({
    queryKey: ["userRole", user.email],
    queryFn: async () => {
      const {data}= await axios.get(`http://localhost:3000/my-properties/${user.email}`);
      return data;
    },
    enabled: !!user,
})

  // Delete property
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this property?");
    if (!confirm) return;

    try {
      const result = await axios.delete(`http://localhost:3000/properties/delete/${id}`);
      if (result.data.deletedCount === 1) {
        refetch();
      }
      toast.success("Property deleted successfully");
    } catch (error) {
      toast.error("Failed to delete property");
    }
  };

  // Redirect to update page
  const handleUpdate = (id) => {
    navigate(`/dashboard/update-property/${id}`);
  };
  isLoading && <p>Loading...</p>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Added Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties?.map((property) => (
          <div key={property._id} className="bg-white shadow rounded p-4">
            <img
              src={property.image}
              alt={property.propertyTitle}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-lg font-bold mt-2">{property.propertyTitle}</h3>
            <p className="text-gray-600">Location: {property.location}</p>
            <p className="text-gray-600">Agent: {property.agentName}</p>
            <p className="text-gray-600">Price Range: {property.priceRange}</p>
            <p className={`font-semibold mt-2 ${property.verificationStatus === "verified" ? "text-green-600" : property.verificationStatus === "rejected" ? "text-red-600" : "text-yellow-600"}`}>
              <span className="text-black font-semibold">Status</span>: {property.verificationStatus}
            </p>

            <div className="flex justify-between mt-4">
              {property.status !== "rejected" && (
                <button
                  onClick={() => handleUpdate(property._id)}
                  className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
                >
                  Update
                </button>
              )}
              <button
                onClick={() => handleDelete(property._id)}
                className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAddedProperties;
