import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);

  // Fetch all properties added by agents
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:3000/properties");
        setProperties(response.data);
      } catch (error) {
        toast.error("Failed to load properties");
      }
    };
    fetchProperties();
  }, []);

  // Handle Verify Property
  const handleVerify = async (propertyId) => {
    try {
      await axios.post(`http://localhost:3000/properties/verify/${propertyId}`);
      toast.success("Property verified successfully");
      // Update local state
      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property._id === propertyId
            ? { ...property, status: "verified" }
            : property
        )
      );
    } catch (error) {
      toast.error("Failed to verify the property");
    }
  };

  // Handle Reject Property
  const handleReject = async (propertyId) => {
    try {
      await axios.post(`http://localhost:3000/properties/reject/${propertyId}`);
      toast.success("Property rejected successfully");
      // Update local state
      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property._id === propertyId
            ? { ...property, status: "rejected" }
            : property
        )
      );
    } catch (error) {
      toast.error("Failed to reject the property");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Properties</h2>
      {properties.length > 0 ? (
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
                <td className="py-2 px-4">{property.title}</td>
                <td className="py-2 px-4">{property.location}</td>
                <td className="py-2 px-4">{property.agentName}</td>
                <td className="py-2 px-4">{property.agentEmail}</td>
                <td className="py-2 px-4">${property.priceRange}</td>
                <td className="py-2 px-4 capitalize">
                  {property.status || "pending"}
                </td>
                <td className="py-2 px-4">
                  {property.status === "pending" && (
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
