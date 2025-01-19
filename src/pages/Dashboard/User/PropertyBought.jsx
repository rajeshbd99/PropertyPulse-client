import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // if you're using react-router to get the userId from URL

const PropertyBought = () => {
  // If using React Router, you can fetch userId from the URL params like this:
  const { userId } = useParams(); // Assuming userId is passed in the URL

  const [offeredProperties, setOfferedProperties] = useState([]);

  useEffect(() => {
    if (!userId) {
      console.error('User ID is required');
      return;
    }

    // Fetch the user's offered properties
    axios.get(`http://localhost:3000/offers/${userId}`)
      .then(response => {
        setOfferedProperties(response.data);
      })
      .catch(error => {
        console.error('Error fetching offered properties:', error);
      });
  }, [userId]);

  const handlePay = (offerId, propertyId) => {
    // Redirect to the payment page, passing the offerId and propertyId
    window.location.href = `/payment/${offerId}/${propertyId}`;
  };

  return (
    <div>
      <h1>Your Offered Properties</h1>
      {offeredProperties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        offeredProperties.map((offer) => (
          <div key={offer._id} className="card">
            <h3>{offer.propertyTitle}</h3>
            <p>Location: {offer.propertyLocation}</p>
            <img src={offer.propertyImage} alt={offer.propertyTitle} />
            <p>Offered Amount: ${offer.offerAmount}</p>
            <p>Status: {offer.status}</p>
            {offer.status === 'accepted' && (
              <button onClick={() => handlePay(offer._id, offer.propertyId)}>
                Pay ${offer.offerAmount}
              </button>
            )}
            {offer.status === 'bought' && (
              <p>Transaction ID: {offer.transactionId}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PropertyBought;
