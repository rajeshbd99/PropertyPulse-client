import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();
  const userId = "12345"; // Replace with actual logged-in user ID

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/wishlist/${userId}`);
        setWishlist(data);
      } catch (error) {
        console.error("Error fetching wishlist:", error.message);
      }
    };

    fetchWishlist();
  }, [userId]);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/wishlist/${id}`);
      setWishlist(wishlist.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error removing property:", error.message);
    }
  };

  const handleMakeOffer = (property) => {
    navigate("/make-offer", { state: { property } });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item._id} className="bg-white shadow p-4 rounded">
              <img
                src={item.propertyImage}
                alt={item.propertyTitle}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="font-bold text-lg mt-4">{item.propertyTitle}</h2>
              <p className="text-sm text-gray-500">{item.propertyLocation}</p>
              <div className="flex items-center mt-2">
                <img
                  src={item.agentImage}
                  alt={item.agentName}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span>{item.agentName}</span>
              </div>
              <p className="text-sm">
                Verification Status:{" "}
                <span className="text-green-500">{item.verificationStatus}</span>
              </p>
              <p className="text-sm">
                Price Range: ${item.priceRange.min} - ${item.priceRange.max}
              </p>
              <div className="mt-4 flex justify-between">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleMakeOffer(item)}
                >
                  Make an Offer
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleRemove(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No items in wishlist.</p>
      )}
    </div>
  );
};

export default Wishlist;
