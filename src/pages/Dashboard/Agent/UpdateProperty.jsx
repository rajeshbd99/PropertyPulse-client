import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateProperty = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | Update Property";
    document.title = pageTitle;
  }, [location]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState({
    propertyTitle: "",
    location: "",
    image: "",
    priceRange: "",
    agentName: "",
    agentEmail: "",
  });

  // Fetch property details
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/properties/${id}`, { withCredentials: true });
        setProperty(response.data);
      } catch (error) {
        toast.error("Failed to load property details");
      }
    };
    fetchProperty();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleImageChange = (e) => {
    setProperty({ ...property, image: e.target.files[0] });
  };

  // Update property
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image", property.image);
    setLoading(true);

    try {
      const imageData = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_API_KEY}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      if (imageData.data.success) {
        property.image = imageData.data.data.display_url;
        console.log(property);
        const { data } = await axios.patch(`http://localhost:3000/properties/update/${id}`, property, { withCredentials: true });
        if (data.modifiedCount == 1) {
          setLoading(false);
          toast.success("Property Updated successfully!");
          setProperty({
            propertyTitle: "",
            location: "",
            image: null,
            priceRange: "",
          });
        }
      }
    } catch (error) {
      toast.error("Failed to update property. Please try again.", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Update Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Property Title</label>
          <input
            type="text"
            name="propertyTitle"
            value={property.propertyTitle}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={property.location}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label>Price Range</label>
          <input
            type="text"
            name="priceRange"
            value={property.priceRange}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label>Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {
            loading ? "loading......" : "Update Property"
          }
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
