import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);

  const { data: reviewManage, isLoading, refetch } = useQuery({
    queryKey: ["reviewManage"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/reviews`);
      return data;
    },
  })

  // Handle delete review
  const handleDeleteReview = async (reviewId, email) => {
    console.log(email);
    try {
     const {data}= await axios.delete(`http://localhost:3000/admin/reviews/${reviewId}`,{data:{email:email}});
      if(data?.deletedCount==1){
        toast.success("Review deleted successfully");
        refetch();
      }
      
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };
  isLoading && <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Reviews</h2>
      {reviewManage?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewManage?.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.reviewerPhoto}
                  alt={review.reviewerPhoto}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="text-lg font-semibold">
                    {review.reviewerName}
                  </h4>
                  <p className="text-gray-500 text-sm">{review.email}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{review.review}</p>
              <button
                onClick={() =>
                  handleDeleteReview(review._id, review.email)
                }
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                Delete Review
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No reviews to display.</p>
      )}
    </div>
  );
};

export default ManageReviews;
