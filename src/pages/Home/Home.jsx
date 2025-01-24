import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import man2 from '../../assets/man2.jpg';
import women2 from '../../assets/women2.jpg';
import women3 from '../../assets/women3.png';
import location1 from '../../assets/Location1.jpg';
import location2 from '../../assets/Location2.png';
import location3 from '../../assets/Location3.jpg';
import location4 from '../../assets/Location4.jpg';
import banner from '../../assets/banner-01.jpg';

const Home = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | Home";
    document.title = pageTitle;
  }, [location]);
  const { data: advertiseProperties, isLoading, refetch } = useQuery({
    queryKey: ["advertiseProperties"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/advertise-properties`, { withCredentials: true });
      return data;
    },
  })
  isLoading && <p>Loading...</p>

  return (
    <div>
      {/* Banner/Slider Section */}
      <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          {/* Background Image */}
          <img
            src={banner} // Replace with your image path
            alt="Banner Background"
            className="w-full h-full object-cover opacity-70"
          />
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Welcome to <span className="text-yellow-300">PropertyPulse</span>
          </h1>
          <p className="text-lg sm:text-xl mt-4 max-w-2xl mx-auto">
            Discover, buy, or sell your dream property with confidence and ease.
          </p>
          <Link
            to="/all-properties"
            className="mt-6 inline-block px-6 py-3 bg-yellow-300 text-blue-800 font-semibold rounded-lg shadow-md hover:bg-yellow-400 transition"
          >
            Explore Properties
          </Link>
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
      <section className="py-10 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Latest User Reviews
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {/* Review 1 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center p-4">
              <img
                src={women2}
                className="w-20 h-20 rounded-full mr-4 border-2 border-gray-300"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">John Doe</h3>
                <p className="text-sm text-gray-600">Luxury Apartment in NYC</p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <p className="text-gray-700 text-sm">
                An excellent property that truly exceeded my expectations!
              </p>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center p-4">
              <img
                src={man2}
                className="w-20 h-20 rounded-full mr-4 border-2 border-gray-300"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Jane Smith</h3>
                <p className="text-sm text-gray-600">Cozy Cottage in Asheville</p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <p className="text-gray-700 text-sm">
                The location was beautiful, and I loved the interiors.
              </p>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center p-4">
              <img
                src={women3}
                className="w-20 h-20 rounded-full mr-4 border-2 border-gray-300"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Emily Clark</h3>
                <p className="text-sm text-gray-600">Modern Villa in LA</p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <p className="text-gray-700 text-sm">
                Perfect for a relaxing stay! The villa was spacious and luxurious.
              </p>
            </div>
          </div>
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
      <section className="py-10 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Popular Locations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {/* Location 1 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-200">
            <img
              src={location1}
              alt="New York City"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">New York City</h3>
              <p className="mt-2 text-gray-600">
                Discover luxurious apartments and condos in the heart of NYC.
              </p>
              <Link
                to="/"
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Explore
              </Link>
            </div>
          </div>

          {/* Location 2 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-200">
            <img
              src={location2}
              alt="Los Angeles"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Los Angeles</h3>
              <p className="mt-2 text-gray-600">
                Experience modern villas and luxury homes in sunny LA.
              </p>
              <Link
                to="/"
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Explore
              </Link>
            </div>
          </div>

          {/* Location 3 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-200">
            <img
              src={location3}
              alt="Chicago"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Chicago</h3>
              <p className="mt-2 text-gray-600">
                Find cozy apartments and family homes in the Windy City.
              </p>
              <Link
                to="/"
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Explore
              </Link>
            </div>
          </div>

          {/* Location 4 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-200">
            <img
              src={location4}
              alt="Miami"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Miami</h3>
              <p className="mt-2 text-gray-600">
                Explore beachside properties and waterfront homes in Miami.
              </p>
              <Link
                to="/"
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
