import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateProperty = () => {
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
        const response = await axios.get(`http://localhost:3000/properties/${id}`);
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
    formData.append("propertyTitle", property.propertyTitle);
    formData.append("location", property.location);
    formData.append("priceRange", property.priceRange);
    if (typeof property.image !== "string") formData.append("image", property.image);

    try {
      await axios.put(`http://localhost:3000/properties/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Property updated successfully!");
      navigate("/my-added-properties");
    } catch (error) {
      toast.error("Failed to update property");
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

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Update Property
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
