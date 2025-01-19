import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";

const RequestedProperties = () => {
  const { user } = useContext(AuthContext);
  const [offers, setOffers] = useState([]);

  // Fetch offers for properties added by the logged-in agent
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/offers/agent/${user.email}`);
        setOffers(response.data);
      } catch (error) {
        toast.error("Failed to load offers");
      }
    };
    fetchOffers();
  }, [user.email]);

  // Handle accept offer
  const handleAccept = async (offerId, propertyId) => {
    try {
      await axios.post(`http://localhost:3000/offers/accept/${offerId}`, { propertyId });
      toast.success("Offer accepted successfully");
      // Update local state
      setOffers((prevOffers) =>
        prevOffers.map((offer) =>
          offer.propertyId === propertyId
            ? {
                ...offer,
                status: offer._id === offerId ? "accepted" : "rejected",
              }
            : offer
        )
      );
    } catch (error) {
      toast.error("Failed to accept the offer");
    }
  };

  // Handle reject offer
  const handleReject = async (offerId) => {
    try {
      await axios.post(`http://localhost:3000/offers/reject/${offerId}`);
      toast.success("Offer rejected successfully");
      // Update local state
      setOffers((prevOffers) =>
        prevOffers.map((offer) =>
          offer._id === offerId ? { ...offer, status: "rejected" } : offer
        )
      );
    } catch (error) {
      toast.error("Failed to reject the offer");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Requested/Offered Properties</h2>
      {offers.length > 0 ? (
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
            {offers.map((offer, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{offer.propertyTitle}</td>
                <td className="py-2 px-4">{offer.location}</td>
                <td className="py-2 px-4">{offer.buyerName}</td>
                <td className="py-2 px-4">{offer.buyerEmail}</td>
                <td className="py-2 px-4">${offer.offeredPrice}</td>
                <td className="py-2 px-4 capitalize">{offer.status || "pending"}</td>
                <td className="py-2 px-4">
                  {offer.status === "pending" && (
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
