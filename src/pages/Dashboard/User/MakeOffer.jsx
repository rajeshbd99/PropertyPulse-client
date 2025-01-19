import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import axios from "axios";

const MakeOffer = () => {
  const { state: property } = useLocation();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [offerAmount, setOfferAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleOffer = async () => {
    setError("");
    setSuccess("");

    if (
      offerAmount < property.priceRange?.min ||
      offerAmount > property.priceRange?.max
    ) {
      setError(`Offer must be between $${property.priceRange?.min} and $${property.priceRange?.max}.`);
      return;
    }

    const offerDetails = {
      propertyId: property._id,
      propertyTitle: property.propertyTitle,
      propertyLocation: property.propertyLocation,
      agentName: property.agentName,
      offerAmount: parseFloat(offerAmount),
      buyerEmail: user.email,
      buyerName: user.displayName,
      buyingDate: new Date(),
      role: user.role, // Ensure this comes from your AuthProvider
      priceRange: property.priceRange,
    };

    try {
      await axios.post("http://localhost:3000/make-offer", offerDetails);
      setSuccess("Offer made successfully!");
      setTimeout(() => navigate("/user-dashboard"), 2000);
    } catch (error) {
      console.error("Error making offer:", error.message);
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Make an Offer</h1>

      <p>
        <strong>Property Title:</strong> {property.propertyTitle}
      </p>
      <p>
        <strong>Property Location:</strong> {property.propertyLocation}
      </p>
      <p>
        <strong>Agent Name:</strong> {property.agentName}
      </p>
      <p>
        <strong>Buyer Name:</strong> {user.displayName}
      </p>
      <p>
        <strong>Buyer Email:</strong> {user.email}
      </p>

      <div className="mt-4">
        <label className="block font-medium">Offer Amount:</label>
        <input
          type="number"
          className="border p-2 rounded w-full"
          value={offerAmount}
          onChange={(e) => setOfferAmount(e.target.value)}
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleOffer}
        disabled={!offerAmount}
      >
        Submit Offer
      </button>
    </div>
  );
};

export default MakeOffer;
