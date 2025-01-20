import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]); // Initialize as an empty array
  const [newReview, setNewReview] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      toast.warning('Please log in to access this page.');
      navigate('/login');
    }
  }, [user, navigate]);

  // Fetch property details
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/property/${id}`);
        setProperty(data);
      } catch (error) {
        console.error('Error fetching property details:', error.message);
      }
    };
    fetchProperty();
  }, [id]);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/property/${id}/reviews`);
        setReviews(Array.isArray(data) ? data : []); // Ensure it's an array
      } catch (error) {
        console.error('Error fetching reviews:', error.message);
      }
    };
    fetchReviews();
  }, [id]);

  const handleAddToWishlist = async () => {
    try {
      await axios.post('http://localhost:3000/wishlist', {
        propertyId: property._id,
        userId: user?.uid,
        propertyTitle: property.propertyTitle,
        priceRange: property.priceRange,
        verificationStatus: property.verificationStatus,
        agentName: property.agentName,
        agentPhoto: property.agentPhoto,
        location: property.location,
        propertyImage: property.image,

      });
      toast.success('Property added to wishlist!');
    } catch (error) {
      console.error('Error adding to wishlist:', error.message);
      toast.error('Failed to add property to wishlist.');
    }
  };

  const handleAddReview = async () => {
    if (!newReview) return;
    try {
      await axios.post(`http://localhost:3000/property/${id}/review`, {
        review: newReview,
        reviewerName: user.displayName,
      });
      setReviews([...reviews, { review: newReview, reviewerName: user.displayName, createdAt: new Date() }]);
      setNewReview('');
      toast.success('Review added successfully!');
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error('Error adding review:', error.message);
      toast.error('Failed to add review.');
    }
  };

  if (!property) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Property Details */}
      <div className="property-details bg-white p-6 rounded shadow-lg">
        <img src={property.image} alt={property.propertyTitle} className="w-full h-64 object-cover rounded" />
        <h1 className="text-2xl font-bold mt-4">{property.propertyTitle}</h1>
        <p className="text-gray-700 mt-2">{property.description}</p>
        <p className="text-lg font-semibold mt-2">Price Range: {property.priceRange}</p>
        <p className="text-gray-600 mt-2">Agent: {property.agentName}</p>
        <button onClick={handleAddToWishlist} className="btn btn-primary mt-4">
          Add to Wishlist
        </button>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section mt-8">
        <h2 className="text-xl font-bold">Reviews</h2>
        <ul className="mt-4 space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <li key={index} className="p-4 bg-gray-100 rounded shadow">
                <p className="font-semibold">{review.reviewerName}</p>
                <p className="text-gray-700 mt-1">{review.review}</p>
                <p className="text-gray-500 text-sm">{new Date(review.createdAt).toLocaleString()}</p>
              </li>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </ul>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-secondary mt-6"
        >
          Add a Review
        </button>
      </div>

      {/* Add Review Modal */}
      {isModalOpen && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-box bg-white p-6 rounded">
            <h3 className="text-xl font-bold mb-4">Add a Review</h3>
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write your review here..."
              className="textarea textarea-bordered w-full mb-4"
            ></textarea>
            <div className="modal-action">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={handleAddReview}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
