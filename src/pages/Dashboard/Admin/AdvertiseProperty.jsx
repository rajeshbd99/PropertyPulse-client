import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdvertiseProperty = () => {
  const [verifiedProperties, setVerifiedProperties] = useState([]);

  // Fetch admin-verified properties
  useEffect(() => {
    const fetchVerifiedProperties = async () => {
      try {
        const response = await axios.get("http://localhost:3000/properties/verified");
        setVerifiedProperties(response.data);
      } catch (error) {
        toast.error("Failed to load properties");
      }
    };
    fetchVerifiedProperties();
  }, []);

  // Handle advertise property
  const handleAdvertise = async (propertyId) => {
    try {
      await axios.post(`http://localhost:3000/properties/advertise/${propertyId}`);
      toast.success("Property advertised successfully!");
      // Optionally refresh data or update UI
    } catch (error) {
      toast.error("Failed to advertise property");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Advertise Properties</h2>
      {verifiedProperties.length > 0 ? (
        <table className="min-w-full bg-white shadow rounded overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Property Image</th>
              <th className="py-2 px-4">Property Title</th>
              <th className="py-2 px-4">Price Range</th>
              <th className="py-2 px-4">Agent Name</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {verifiedProperties.map((property) => (
              <tr key={property._id} className="border-b">
                <td className="py-2 px-4">
                  <img src={property.image} alt={property.title} className="w-20 h-20 object-cover rounded" />
                </td>
                <td className="py-2 px-4">{property.title}</td>
                <td className="py-2 px-4">${property.priceRange}</td>
                <td className="py-2 px-4">{property.agentName}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleAdvertise(property._id)}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Advertise
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 mt-4">No verified properties to advertise.</p>
      )}
    </div>
  );
};

export default AdvertiseProperty;
