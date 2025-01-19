import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";

const MySoldProperties = () => {
  const { user } = useContext(AuthContext);
  const [soldProperties, setSoldProperties] = useState([]);

  // Fetch sold properties for the logged-in agent
  useEffect(() => {
    const fetchSoldProperties = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/sold-properties/agent/${user.email}`);
        setSoldProperties(response.data);
      } catch (error) {
        toast.error("Failed to load sold properties");
      }
    };
    fetchSoldProperties();
  }, [user.email]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Sold Properties</h2>
      {soldProperties.length > 0 ? (
        <table className="min-w-full bg-white shadow rounded overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Property Title</th>
              <th className="py-2 px-4">Location</th>
              <th className="py-2 px-4">Buyer Name</th>
              <th className="py-2 px-4">Buyer Email</th>
              <th className="py-2 px-4">Sold Price</th>
            </tr>
          </thead>
          <tbody>
            {soldProperties.map((property, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{property.propertyTitle}</td>
                <td className="py-2 px-4">{property.location}</td>
                <td className="py-2 px-4">{property.buyerName}</td>
                <td className="py-2 px-4">{property.buyerEmail}</td>
                <td className="py-2 px-4">{property.soldPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 mt-4">No sold properties to display.</p>
      )}
    </div>
  );
};

export default MySoldProperties;
