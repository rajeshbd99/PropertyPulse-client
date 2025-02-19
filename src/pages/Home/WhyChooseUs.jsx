import { motion } from "framer-motion";
import { FaCheckCircle, FaGlobe, FaUsers, FaHome, FaDollarSign, FaClock, FaHandshake, FaChartLine } from "react-icons/fa";

const features = [
  { icon: <FaCheckCircle size={50} className="text-blue-600" />, title: "Verified Properties", desc: "We ensure all listings are verified for security and trust." },
  { icon: <FaGlobe size={50} className="text-green-500" />, title: "Global Coverage", desc: "Find properties in prime locations around the world." },
  { icon: <FaUsers size={50} className="text-orange-500" />, title: "Trusted by Thousands", desc: "Our platform is used by thousands of happy homeowners." },
  { icon: <FaHome size={50} className="text-purple-500" />, title: "Diverse Listings", desc: "From luxury homes to budget-friendly apartments, we have it all." },
  { icon: <FaDollarSign size={50} className="text-yellow-500" />, title: "Best Price Guarantee", desc: "We offer the most competitive pricing on all properties." },
  { icon: <FaClock size={50} className="text-red-500" />, title: "24/7 Support", desc: "Our support team is available round the clock to assist you." },
  { icon: <FaHandshake size={50} className="text-teal-500" />, title: "Easy Transactions", desc: "Hassle-free property buying and selling experience." },
  { icon: <FaChartLine size={50} className="text-indigo-500" />, title: "Market Insights", desc: "Get real-time data & trends to make informed decisions." },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-gray-100 to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold mb-10 text-gray-800"
        >
          Why Choose <span className="text-blue-600">PropertyPulse?</span>
        </motion.h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-6 md:p-8 bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 flex flex-col items-center"
            >
              <motion.div 
                className="mb-4"
                whileHover={{ rotate: 10 }}
              >
                {item.icon}
              </motion.div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
