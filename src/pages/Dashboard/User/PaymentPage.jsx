import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("your-stripe-public-key-here");

const PaymentPage = () => {
  const location = useLocation();
  const property = location.state.property;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payment for {property.propertyTitle}</h2>
      <p className="text-gray-700 mb-4">Offered Amount: ${property.offeredAmount}</p>
      <div className="bg-white shadow-md rounded-lg p-6">
        <Elements stripe={stripePromise}>
          <CheckoutForm property={property} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;
