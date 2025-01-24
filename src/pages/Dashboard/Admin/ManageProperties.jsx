import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

const ManageProperties = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | Manage Properties";
    document.title = pageTitle;
  }, [location]);

  // Fetch all properties added by agents
  const { data: properties, isLoading, refetch } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/all-properties`, { withCredentials: true });
      return data;
    },
  })

  // Handle Verify Property
  const handleVerify = async (propertyId) => {
    try {
      const { data } = await axios.patch(`http://localhost:3000/properties/verify/${propertyId}`, { withCredentials: true });
      if (data.modifiedCount == 1) {
        refetch();
        toast.success("Property verified successfully");
      }
    } catch (error) {
      toast.error("Failed to verify the property");
    }
  };

  // Handle Reject Property
  const handleReject = async (propertyId) => {
    try {
      const { data } = await axios.patch(`http://localhost:3000/properties/reject/${propertyId}`, { withCredentials: true });
      if (data.modifiedCount == 1) {
        refetch();
        toast.success("Property rejected successfully");
      }
    } catch (error) {
      toast.error("Failed to reject the property");
    }
  };

  isLoading && <p>Loading...</p>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Properties</h2>
      {properties?.length > 0 ? (
        <table className="min-w-full bg-white shadow rounded overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Property Title</th>
              <th className="py-2 px-4">Location</th>
              <th className="py-2 px-4">Agent Name</th>
              <th className="py-2 px-4">Agent Email</th>
              <th className="py-2 px-4">Price Range</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{property.propertyTitle}</td>
                <td className="py-2 px-4">{property.location}</td>
                <td className="py-2 px-4">{property.agentName}</td>
                <td className="py-2 px-4">{property.agentEmail}</td>
                <td className="py-2 px-4">${property.priceRange}</td>
                <td className="py-2 px-4 capitalize ">
                  {property.verificationStatus == "verified" ? <span className="text-green-600">
                    {property.verificationStatus}
                  </span> : property.verificationStatus == "rejected" ? <span className="text-red-600">
                    {property.verificationStatus}
                  </span> : <span className="text-yellow-600">
                    {property.verificationStatus}
                  </span>}
                </td>
                <td className="py-2 px-4 ">
                  {property.
                    verificationStatus === "pending" && (
                      <div className="flex gap-2">
                        <button
                          className="bg-green-500 text-white py-1 px-3 rounded"
                          onClick={() => handleVerify(property._id)}
                        >
                          Verify
                        </button>
                        <button
                          className="bg-red-500 text-white py-1 px-3 rounded"
                          onClick={() => handleReject(property._id)}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 mt-4">No properties to manage.</p>
      )}
    </div>
  );
};

export default ManageProperties;
