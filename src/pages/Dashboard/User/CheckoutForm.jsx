import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";

const CheckoutForm = ({ property }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    try {
      const { data: clientSecret } = await axios.post("http://localhost:3000/create-payment-intent", {
        amount: property.offeredAmount,
      });

      const paymentMethod = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      const confirmPayment = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.paymentMethod.id,
      });

      if (confirmPayment.paymentIntent.status === "succeeded") {
        toast.success("Payment successful");
        await axios.post("http://localhost:3000/properties/mark-bought", {
          propertyId: property._id,
          transactionId: confirmPayment.paymentIntent.id,
        });
      }
    } catch (error) {
      toast.error("Payment failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="border p-4 rounded mb-4" />
      <button
        type="submit"
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        disabled={!stripe}
      >
        Pay ${property.offeredAmount}
      </button>
    </form>
  );
};

export default CheckoutForm;
