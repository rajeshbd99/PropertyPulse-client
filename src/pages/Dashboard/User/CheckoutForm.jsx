import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthProvider';
import axios from 'axios';
import { format } from 'date-fns';

const CheckoutForm = ({ property }) => {
  console.log(property);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage("Stripe is not properly initialized.");
      return;
    }

    setLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: user?.displayName,
              email: user?.email,
            },
          },
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (paymentIntent?.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const contactRequest = {
          propertyId: property._id,
          propertyTitle: property.propertyTitle,
          location: property.location,
          buyerName : property.buyerName,
          buyerEmail : property.buyerEmail,
          agentEmail: property.agentEmail,
          transactionId: paymentIntent.id,
          amount: paymentIntent.amount/100,
          date: format(new Date(), "dd-MM-yyyy"),
        };
        const {data} = await axios.post("http://localhost:3000/payments", contactRequest);

        if (data.acknowledged) {
          console.log("Payment completed successfully");

          Swal.fire({
            title: "Payment Successful",
            text: "Your payment has been successfully processed.",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: "Ok",
          });
          navigate("/dashboard/property-bought");
          return toast.success("Payment completed successfully.");
        } else {
          setErrorMessage("Payment not completed. Please try again.");
        }
      } else {
        setErrorMessage("Payment not completed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while processing your payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <button
        type="submit"
        className="btn btn-primary w-full mt-4"
        disabled={!stripe || !elements || loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
      {transactionId && <div className="text-green-500 mt-2">Transaction ID: {transactionId}</div>}
    </form>
  );
};

export default CheckoutForm;