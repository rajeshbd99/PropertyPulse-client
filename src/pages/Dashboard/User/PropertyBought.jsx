import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const PropertyBought = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | Properties Bought";
    document.title = pageTitle;
  }, [location]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data: properties, isLoading, refetch } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data } = await axios.get(`https://real-estate-flax-psi.vercel.app/offers/user/${user.email} ` , { withCredentials: true });
      return data;
    },
  });
  
  const handlePay = (property) => {
    navigate("/payment", { state: { property } });
  };
  isLoading && <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Properties You Offered</h2>
      {properties?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property._id} className="bg-white shadow-md rounded-lg p-4">
              <img
                src={property.image || "/default-property.jpg"}
                alt="Property"
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h4 className="text-lg font-semibold">{property.propertyTitle}</h4>
              <p className="text-gray-500">{property.location}</p>
              <p className="text-gray-700">Agent: {property.agentName}</p>
              <p className="text-gray-700">Offered Amount: ${property.offerAmount}</p>
              <p className={`text-lg font-bold mt-2 ${property.offerStatus === "Pending" ? "text-yellow-500" : property.offerStatus === "accepted" ? "text-green-500" : "text-blue-500"}`}>
                <span className="text-gray-700">Status:</span> {property.offerStatus}
              </p>
              {property.offerStatus === "accepted" && (
                <button
                  onClick={() => handlePay(property)}
                  className={`mt-4 text-white py-2 px-4 rounded ${property.buyingStatus==='bought'?'bg-gray-600':'bg-blue-600'}`} disabled={property.buyingStatus === "bought" }
                >
                  {property?.buyingStatus === "bought" ? "Bought" : "Pay"}
                </button>
              )}
              {property.transactionId && (
                <p className="text-green-500 font-semibold mt-4">
                  Transaction ID: {property.transactionId}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No properties to display.</p>
      )}
    </div>
  );
};

export default PropertyBought;
