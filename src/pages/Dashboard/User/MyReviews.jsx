import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);

  // Fetch user's reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/reviews/user/${user.email}`);
        setReviews(response.data);
      } catch (error) {
        toast.error("Failed to load your reviews");
      }
    };
    fetchReviews();
  }, [user.email]);

  // Handle delete review
  const handleDelete = async (reviewId) => {
    const confirm = window.confirm("Are you sure you want to delete this review?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/reviews/${reviewId}`);
      setReviews(reviews.filter((review) => review._id !== reviewId));
      toast.success("Review deleted successfully");
    } catch (error) {
      toast.error("Failed to delete the review");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white shadow-md rounded-lg p-4">
              <h4 className="text-lg font-semibold">{review.propertyTitle}</h4>
              <p className="text-gray-500">Agent: {review.agentName}</p>
              <p className="text-gray-400 text-sm">Reviewed on: {new Date(review.reviewTime).toLocaleString()}</p>
              <p className="mt-2">{review.description}</p>
              <button
                onClick={() => handleDelete(review._id)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">You haven't reviewed any properties yet.</p>
      )}
    </div>
  );
};

export default MyReviews;
