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
import { FaMapMarkerAlt, FaDollarSign, FaCheckCircle, FaTimesCircle, FaCity, FaUmbrellaBeach, FaBuilding, FaWater } from 'react-icons/fa';
import { FiMapPin, FiUserCheck, FiThumbsUp, FiTrendingUp } from 'react-icons/fi';
import { Flip } from 'react-awesome-reveal';
import ReactLoading from "react-loading";
import WhyChooseUs from './WhyChooseUs';
import HowItWorks from './HowItWorks';
import Achievements from './Achievements';

const locations = [
  {
    name: "New York City",
    description: "Discover luxurious apartments and condos in the heart of NYC.",
    image: location1,
    icon: <FaCity className="text-4xl text-blue-600" />,
  },
  {
    name: "Los Angeles",
    description: "Experience modern villas and luxury homes in sunny LA.",
    image: location2,
    icon: <FaUmbrellaBeach className="text-4xl text-yellow-600" />,
  },
  {
    name: "Chicago",
    description: "Find cozy apartments and family homes in the Windy City.",
    image: location3,
    icon: <FaBuilding className="text-4xl text-indigo-600" />,
  },
  {
    name: "Miami",
    description: "Explore beachside properties, waterfront homes in Miami.",
    image: location4,
    icon: <FaWater className="text-4xl text-teal-600" />,
  },
];

const Home = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | Home";
    document.title = pageTitle;
  }, [location]);
  const { data: advertiseProperties, isLoading, refetch } = useQuery({
    queryKey: ["advertiseProperties"],
    queryFn: async () => {
      const { data } = await axios.get(`https://real-estate-flax-psi.vercel.app/advertise-properties`,);
      return data;
    },
  })
  isLoading && <ReactLoading type="cylon" color="#1E40AF" height={100} width={100} />

  return (
    <div>
      {/* Banner Section */}
      <div className="relative bg-gradient-to-r from-blue-400 to-blue-500 text-white h-[800px] flex items-center justify-center">
        <div className="absolute inset-0">
          {/* Background Image */}
          <img
            src={banner}
            alt="Banner Background"
            className="w-full h-full object-cover opacity-75"
          />
        </div>

        <div className="relative z-0 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Welcome to PropertyPulse
          </h1>
          <p className="text-lg sm:text-xl mt-4 max-w-2xl mx-auto text-gray-300">
            Discover, buy, or sell your dream property with confidence and ease.
          </p>
          <Link
            to="/all-properties"
            className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Explore Properties
          </Link>
        </div>
      </div>

      {/* Advertisement Section */}
      <section className="container mx-auto py-12 mt-10 mb-10">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800 drop-shadow-md">
          Featured <span className='text-blue-600'>Properties</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6">
          {advertiseProperties?.map((property) => (
            <div
              key={property._id}
              className="max-w-sm mission-card bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-500 ease-in-out hover:shadow-2xl hover:translate-y-2"
            >
              {/* Property Image */}
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.propertyTitle}
                  className="w-full h-56 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
                {/* Verified Badge */}
                {property.verificationStatus === "verified" && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 text-sm font-semibold rounded-full flex items-center">
                    <FaCheckCircle className="mr-1" /> Verified
                  </div>
                )}
                {/* Overlay with Property Title */}
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent w-full text-white p-4">
                  <h3 className="text-2xl font-semibold">{property.propertyTitle}</h3>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-4">
                {/* Location & Price (Aligned Horizontally) */}
                <div className="flex justify-between items-center text-gray-800">
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-red-500 text-xl" />
                    <p className="text-sm font-semibold">{property.location}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaDollarSign className="text-green-500 text-xl" />
                    <p className="text-sm font-bold">{property.priceRange}</p>
                  </div>
                </div>

                {/* Property Description */}
                <p className="text-gray-700 text-sm leading-relaxed">
                  {property.description.split(" ").slice(0, 17).join(" ")}...
                </p>

                {/* View Details Button */}
                <div className="flex justify-center mt-4">
                  <Link to={`/property/details/${property._id}`}>
                    <button className="bg-blue-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-center mt-12">
          <Link to="/all-properties">
            <button className="bg-blue-600 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
              See More Properties
            </button>
          </Link>
        </div>
      </section>

      {/* Latest User Reviews Section */}
      <section className="py-16">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          What Our <span className='text-blue-600'>Users Say</span>
        </h2>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {[
            {
              name: "John Doe",
              property: "Luxury Apartment in NYC",
              review: "Absolutely amazing property! Exceeded all my expectations.",
              image: women2,
              rating: 5,
            },
            {
              name: "Jane Smith",
              property: "Cozy Cottage in Asheville",
              review:
                "The location was stunning, and the interiors were beyond perfect.",
              image: man2,
              rating: 4,
            },
            {
              name: "Emily Clark",
              property: "Modern Villa in LA",
              review:
                "A fantastic villa with spacious rooms and great amenities.",
              image: women3,
              rating: 5,
            },
          ].map((user, index) => (
            <div
              key={index}
              className="mission-card bg-white rounded-lg shadow-lg p-6 flex flex-col space-y-4 hover:shadow-xl hover:-translate-y-2 transform transition-all duration-300"
            >
              {/* User Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-16 h-16 rounded-full border-4 border-blue-500"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
                  <p className="text-sm text-gray-500 italic">{user.property}</p>
                </div>
              </div>

              {/* Star Ratings */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={`text-yellow-400 text-lg ${i < user.rating ? "" : "text-gray-300"
                      }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                "{user.review}"
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* Why Choose Us Section */}
      <section className="py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Why <span className='text-blue-600'>Choose Us</span>
        </h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {[
            {
              icon: <FiMapPin className="text-6xl text-indigo-500" />,
              title: "Global Reach",
              description: "Access properties worldwide with our extensive network.",
              bgGradient: "bg-gradient-to-r from-indigo-100 to-indigo-200",
            },
            {
              icon: <FiUserCheck className="text-6xl text-teal-500" />,
              title: "Trusted Professionals",
              description: "Work with highly rated and verified real estate agents.",
              bgGradient: "bg-gradient-to-r from-teal-100 to-teal-200",
            },
            {
              icon: <FiThumbsUp className="text-6xl text-orange-500" />,
              title: "Customer Satisfaction",
              description:
                "Our customers rate us highly for excellent service and support.",
              bgGradient: "bg-gradient-to-r from-orange-100 to-orange-200",
            },
            {
              icon: <FiTrendingUp className="text-6xl text-rose-500" />,
              title: "Best Deals",
              description: "Unlock competitive pricing and exclusive property offers.",
              bgGradient: "bg-gradient-to-r from-rose-100 to-rose-200",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`p-8 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300 ${feature.bgGradient}`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
          Popular <span className='text-blue-600'>Locations</span>
        </h2>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {locations.map((location, index) => (
            <Flip key={index} direction="horizontal" triggerOnce>
              <div className="relative group overflow-hidden rounded-xl shadow-lg bg-white">
                {/* Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundImage: `url(${location.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col items-center text-center text-white font-bold">
                  <div className="bg-white p-3 rounded-full shadow-lg mb-4">
                    {location.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">{location.name}</h3>
                  <p className="text-sm mb-4 text-gray-200">{location.description}</p>
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(location.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300"
                  >
                    Explore
                  </a>
                </div>
              </div>
            </Flip>
          ))}
        </div>
      </section>
      <WhyChooseUs />
      <HowItWorks />
      <Achievements />
    </div>
  );
};

export default Home;
