import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { compareAsc, format } from "date-fns";
import axios from "axios";
import { toast } from "react-toastify";

const MakeOffer = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | Make Offer";
    document.title = pageTitle;
  }, [location]);

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
      parseInt(offerAmount) < property.priceRange.split("-")[0] ||
      parseInt(offerAmount) > property.priceRange.split("-")[1]
    ) {
      setError(`Offer must be between $${property.priceRange.split("-")[0]} and $${property.priceRange.split("-")[1]}.`);
      return;
    }

    const offerDetails = {
      userId: property.userId,
      propertyId: property._id,
      propertyTitle: property.propertyTitle,
      location: property.location,
      image: property.propertyImage,
      agentName: property.agentName,
      agentEmail :  property.agentEmail,  
      agentPhoto : property.agentPhoto,
      offerAmount: parseFloat(offerAmount),
      buyerEmail: user.email,
      buyerName: user.displayName,
      buyingDate: format(new Date(), "dd-MM-yyyy"),
      role: user.role,
      priceRange: property.priceRange,
      verificationStatus: property.verificationStatus,
      offerStatus: "Pending",
    };

    try {
    const {data} = await axios.post(`http://localhost:3000/make-offer/${property._id}`, offerDetails, {withCredentials:true});
    if(data.insertedId){
      navigate("/dashboard/property-bought");
      return toast.success("Offer made successfully!");

    }
    } catch (error) {
      console.error("Error making offer:", error.message);
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Make an Offer</h1>
      <p>
        <strong>Property Title:</strong> {property?.propertyTitle}
      </p>
      <p>
        <strong>Property Location:</strong> {property?.location}
      </p>
      <p>
        <strong>Agent Name:</strong> {property?.agentName}
      </p>
      <p>
        <strong>Buyer Name:</strong> {user?.displayName}
      </p>
      <p>
        <strong>Buyer Email:</strong> {user?.email}
      </p>
      <p>
        <strong>Buying Date: </strong> {format(new Date(), "dd-MM-yyyy")}
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
