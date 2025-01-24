import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';

const PropertyDetails = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | Property Details";
    document.title = pageTitle;
  }, [location]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
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
        const { data } = await axios.get(`https://real-estate-flax-psi.vercel.app/property/${id}` , { withCredentials: true });
        setProperty(data);
      } catch (error) {
        console.error('Error fetching property details:', error.message);
      }
    };
    fetchProperty();
  }, [id]);

  const { data: reviewsCollection, isLoading, refetch } = useQuery({
    queryKey: ["reviewsCollection", id],
    queryFn: async () => {
      const { data } = await axios.get(`https://real-estate-flax-psi.vercel.app/property/reviews/${id}`, { withCredentials: true });
      return data;
    },
  })

  const handleAddToWishlist = async () => {
    try {
      await axios.post('https://real-estate-flax-psi.vercel.app/wishlist', {
        propertyId: property._id,
        userId: user?.uid,
        propertyTitle: property.propertyTitle,
        priceRange: property.priceRange,
        verificationStatus: property.verificationStatus,
        agentName: property.agentName,
        agentEmail: property.agentEmail,
        agentPhoto: property.agentPhoto,
        location: property.location,
        propertyImage: property.image,

      }, { withCredentials: true });
      toast.success('Property added to wishlist!');
    } catch (error) {
      console.error('Error adding to wishlist:', error.message);
      toast.error('Failed to add property to wishlist.');
    }
  };

  const handleAddReview = async () => {
    if (!newReview) return;
    try {
      const { data } = await axios.post(`https://real-estate-flax-psi.vercel.app/property/review`, {
        review: newReview,
        propertyId: property._id,
        email: user.email,
        formattedDate: format(new Date(), 'dd-MM-yyyy'),
        reviewerName: user.displayName,
        reviewerPhoto: user.photoURL,
      }, { withCredentials: true });
      if (data.insertedId) {
        refetch();
        setIsModalOpen(false);
        return toast.success('Review added successfully');
      }
    } catch (error) {
      setIsModalOpen(false);
      console.error('Error adding review:', error.message);
      return toast.error('Failed to add review.');
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
          {reviewsCollection?.length > 0 ? (
            reviewsCollection?.map((review, index) => (
              <li key={index} className="p-4 bg-gray-100 rounded shadow">
                <p className="font-semibold">{review.reviewerName}</p>
                <p className="text-gray-700 mt-1">{review.review}</p>
                <p className="text-gray-500 text-sm">{review.formattedDate}</p>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add a Review</h3>
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write your review here..."
              className="textarea textarea-bordered w-full mb-4"
            ></textarea>
            <div className="flex justify-end gap-4">
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
