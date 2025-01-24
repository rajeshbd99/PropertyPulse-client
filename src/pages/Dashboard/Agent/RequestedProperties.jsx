import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

const RequestedProperties = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | Requested Properties";
    document.title = pageTitle;
  }, [location]);
  const { user } = useContext(AuthContext);
  const [offers, setOffers] = useState([]);

  const { data: RequestedProperties, isLoading, refetch } = useQuery({
    queryKey: ["RequestedProperties"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/offers/agent/${user.email}`, { withCredentials: true });
      return data;
    },
  });

  // Handle accept offer
  const handleAccept = async (offerId, propertyId) => {
    try {
    const {data} = await axios.patch(`http://localhost:3000/offers/accept/${offerId}`, { propertyId }, { withCredentials: true });
    if(data.modifiedCount==1){
      refetch();
     return toast.success("Offer accepted successfully");
    }
    } catch (error) {
      toast.error("Failed to accept the offer");
    }
  };

  // Handle reject offer
  const handleReject = async (offerId) => {
    try {
    const {data} =  await axios.patch(`http://localhost:3000/offers/reject/${offerId}`, { withCredentials: true });
    if (data.modifiedCount === 1) {
      refetch();
      return toast.success("Offer rejected successfully");
    }
    } catch (error) {
      toast.error("Failed to reject the offer");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Requested/Offered Properties</h2>
      {RequestedProperties?.length > 0 ? (
        <table className="min-w-full bg-white shadow rounded overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Property Title</th>
              <th className="py-2 px-4">Location</th>
              <th className="py-2 px-4">Buyer Name</th>
              <th className="py-2 px-4">Buyer Email</th>
              <th className="py-2 px-4">Offered Price</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {RequestedProperties?.map((offer, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{offer.propertyTitle}</td>
                <td className="py-2 px-4">{offer.location}</td>
                <td className="py-2 px-4">{offer.buyerName}</td>
                <td className="py-2 px-4">{offer.buyerEmail}</td>
                <td className="py-2 px-4">${offer.offerAmount}</td>
                <td className="py-2 px-4 capitalize">{offer.offerStatus || "Pending"}</td>
                <td className="py-2 px-4">
                  {offer.offerStatus === "Pending" && (
                    <div className="flex gap-2">
                      <button
                        className="bg-green-500 text-white py-1 px-3 rounded"
                        onClick={() => handleAccept(offer._id, offer.propertyId)}
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded"
                        onClick={() => handleReject(offer._id)}
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
        <p className="text-gray-500 mt-4">No offers to display.</p>
      )}
    </div>
  );
};

export default RequestedProperties;
