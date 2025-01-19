import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/properties')
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((error) => console.error('Error fetching properties:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Verified Properties</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property._id} className="card bg-white shadow-md rounded-lg">
            <img src={property.propertyImage} alt={property.propertyTitle} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h2 className="font-bold text-lg">{property.propertyTitle}</h2>
              <p>{property.propertyLocation}</p>
              <p>Price Range: {property.priceRange}</p>
              <Link to={`/property/${property._id}`} className="btn btn-primary mt-4">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProperties;
