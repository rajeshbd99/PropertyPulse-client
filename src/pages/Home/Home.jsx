import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { data: advertiseProperties, isLoading, refetch } = useQuery({
    queryKey: ["advertiseProperties"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/advertise-properties`);
      console.log(data);
      return data;
    },
  })
  isLoading && <p>Loading...</p>

  return (
    <div>
      {/* Banner/Slider Section */}
      <div className="relative bg-blue-500 text-white h-[400px] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Welcome to PropertyPulse</h1>
          <p className="text-lg mt-4">
            Find, buy, or sell your dream property with ease.
          </p>
        </div>
      </div>

      {/* Advertisement Section */}
      <section className="py-10 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6">Featured Properties</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4'>
          {
            advertiseProperties?.map((property) => (
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

                  {/* Verification Status */}
                  <p
                    className={`text-sm font-bold mb-2 ${property.verificationStatus === "verified"
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
                  <Link to={`/property/details/${property._id}`}>
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
      </section>

      {/* Latest User Reviews */}
      <section className="py-10">
        <h2 className="text-3xl font-bold text-center mb-6">Latest User Reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="flex items-center p-4">
                <img
                  src={`https://via.placeholder.com/50?text=R${idx + 1}`}
                  alt={`Reviewer ${idx + 1}`}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">Reviewer Name</h3>
                  <p className="text-sm text-gray-600">Property Title</p>
                </div>
              </div>
              <div className="p-4 border-t">
                <p className="text-gray-600">
                  This is a brief review description. The property was fantastic
                  and met all my expectations!
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-10 bg-blue-100">
        <h2 className="text-3xl font-bold text-center mb-6">Why Choose Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <i className="fas fa-home text-4xl text-blue-500 mb-4"></i>
            <h3 className="text-xl font-semibold">Wide Property Range</h3>
            <p className="mt-2 text-gray-600">
              Choose from a variety of properties that match your preferences.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <i className="fas fa-shield-alt text-4xl text-green-500 mb-4"></i>
            <h3 className="text-xl font-semibold">Trusted Agents</h3>
            <p className="mt-2 text-gray-600">
              Our agents are verified and experienced professionals.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <i className="fas fa-star text-4xl text-yellow-500 mb-4"></i>
            <h3 className="text-xl font-semibold">Top-rated Reviews</h3>
            <p className="mt-2 text-gray-600">
              We are highly rated by our users for our excellent services.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <i className="fas fa-hand-holding-usd text-4xl text-purple-500 mb-4"></i>
            <h3 className="text-xl font-semibold">Affordable Prices</h3>
            <p className="mt-2 text-gray-600">
              Our platform ensures competitive and fair property prices.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Locations Section */}
      <section className="py-10">
        <h2 className="text-3xl font-bold text-center mb-6">Popular Locations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={`https://via.placeholder.com/300x200?text=Location+${idx + 1}`}
                alt={`Location ${idx + 1}`}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Location Name</h3>
                <p className="mt-2 text-gray-600">
                  Discover the best properties in this popular location.
                </p>
                <Link
                  to={`/location/${idx + 1}`}
                  className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
