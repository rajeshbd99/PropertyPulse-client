import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";

const AddProperty = () => {
    const [loading, setLoading] = useState(false);

    const { user } = useContext(AuthContext);
    const [propertyData, setPropertyData] = useState({
        propertyTitle: "",
        location: "",
        image: null,
        priceRange: "",
        verificationStatus: "pending",
        agentName: user.displayName,
        agentEmail: user.email,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPropertyData({ ...propertyData, [name]: value });
    };

    const handleImageUpload = (e) => {
        setPropertyData({ ...propertyData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("image", propertyData.image);
        setLoading(true);

        try {
            const imageData = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_API_KEY}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            if (imageData.data.success) {
                propertyData.image = imageData.data.data.display_url;

                console.log(propertyData);
                const { data } = await axios.post("http://localhost:3000/properties/add", propertyData);
                if (data.insertedId) {
                    setLoading(false);
                    toast.success("Property added successfully!");
                    setPropertyData({
                        propertyTitle: "",
                        location: "",
                        image: null,
                        priceRange: "",
                    });
                }

            }


        } catch (error) {
            toast.error("Failed to add property. Please try again.", error);
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add Property</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Property Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Property Title</label>
                    <input
                        type="text"
                        name="propertyTitle"
                        value={propertyData.propertyTitle}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Property Location */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Property Location</label>
                    <input
                        type="text"
                        name="location"
                        value={propertyData.location}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Property Image */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Property Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageUpload}
                        required
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
                    />
                </div>

                {/* Agent Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Agent Name</label>
                    <input
                    name="agentName"
                        type="text"
                        value={user.displayName}
                        readOnly
                        className="mt-1 block w-full bg-gray-100 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Agent Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Agent Email</label>
                    <input
                    name="agentEmail"
                        type="email"
                        value={user.email}
                        readOnly
                        className="mt-1 block w-full bg-gray-100 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Price Range */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price Range</label>
                    <input
                        type="text"
                        name="priceRange"
                        value={propertyData.priceRange}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Add Property Button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {
                        loading ? "loading......" : "Add Property"
                    }
                </button>
            </form>
        </div>
    );
};

export default AddProperty;
