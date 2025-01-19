import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';


const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    fetch('http://localhost:3000/properties')
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((error) => console.error('Error fetching properties:', error));
  }, []);

  return (
   <div>
    {
      properties.map((property) => (
        <div className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden">
        {/* Property Image */}
        <img
          src={property.image}
          className="w-full h-48 object-cover"
        />
  
        {/* Card Content */}
        <div className="p-4">
          {/* Property Title */}
          <h3 className="text-xl font-semibold mb-2">{property.propertyTitle}</h3>
  
          {/* Property Location */}
          <p className="text-gray-600 mb-2">
            <strong>Location:</strong> {property.location}
          </p>
  
          {/* Agent Info */}
          <div className="flex items-center mb-2">
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-8 h-8 rounded-full mr-2"
            />
            <p className="text-gray-600">
              <strong>Agent:</strong> {property.agentName}
            </p>
          </div>
  
          {/* Verification Status */}
          <p
            className={`text-sm font-bold mb-2 ${
              property.verificationStatus === "verified"
                ? "text-green-500"
                : verificationStatus === "rejected"
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            Status: {property.verificationStatus.charAt(0).toUpperCase() + property.verificationStatus.slice(1)}
          </p>
  
          {/* Price Range */}
          <p className="text-gray-700 mb-4">
            <strong>Price Range:</strong> ${property.priceRange}
          </p>
  
          {/* Details Button */}
          <Link to = {`/property/${property._id}`}>
          <button
            
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Details
          </button>
          </Link>
        </div>
      </div>
      ))
    }
   </div>
  );
};

export default AllProperties;
