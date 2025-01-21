import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [sortOrder, setSortOrder] = useState(''); // State for sorting
  const { user } = useContext(AuthContext);

  // Fetch properties from the server
  useEffect(() => {
    fetch('http://localhost:3000/properties')
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((error) => console.error('Error fetching properties:', error));
  }, []);

  // Filter properties based on the search query
  const filteredProperties = properties.filter((property) =>
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort properties based on price range (extracting the lower bound of the range)
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    const priceA = parseInt(a.priceRange.split('-')[0]); // Extract lower bound as a number
    const priceB = parseInt(b.priceRange.split('-')[0]); // Extract lower bound as a number

    if (sortOrder === 'lowToHigh') {
      return priceA - priceB; // Ascending order
    }
    if (sortOrder === 'highToLow') {
      return priceB - priceA; // Descending order
    }
    return 0; // Default order (no sorting)
  });

  return (
    <div className="container mx-auto p-4">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by location"
          className="w-full p-2 border rounded shadow-sm"
        />
      </div>

      {/* Sort Dropdown */}
      <div className="mb-6">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full p-2 border rounded shadow-sm"
        >
          <option value="">Sort by Price Range</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      {/* Properties List */}
      {sortedProperties.length > 0 ? (
        sortedProperties.map((property) => (
          <div key={property._id} className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden mb-4">
            {/* Property Image */}
            <img src={property.image} className="w-full h-48 object-cover" alt={property.propertyTitle} />

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
                  src={property?.agentPhoto}
                  className="w-8 h-8 object-cover rounded-full"
                  alt={property.agentName}
                />
                <p className="text-gray-600">
                  <strong>Agent:</strong> {property.agentName}
                </p>
              </div>

              {/* Verification Status */}
              <p
                className={`text-sm font-bold mb-2 ${
                  property.verificationStatus === 'verified'
                    ? 'text-green-500'
                    : property.verificationStatus === 'rejected'
                    ? 'text-red-500'
                    : 'text-gray-500'
                }`}
              >
                Status: {property.verificationStatus.charAt(0).toUpperCase() + property.verificationStatus.slice(1)}
              </p>

              {/* Price Range */}
              <p className="text-gray-700 mb-4">
                <strong>Price Range:</strong> {property.priceRange}
              </p>

              {/* Details Button */}
              <Link to={`/property/details/${property._id}`}>
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  Details
                </button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No properties found.</p>
      )}
    </div>
  );
};

export default AllProperties;
