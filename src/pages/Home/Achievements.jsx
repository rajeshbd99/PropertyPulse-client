import CountUp from "react-countup";
import { motion } from "framer-motion";
import { FaUsers, FaBuilding, FaStar, FaGlobe } from "react-icons/fa";

const achievements = [
  { icon: <FaUsers size={50} className="text-blue-500" />, count: 5000, label: "Happy Clients" },
  { icon: <FaBuilding size={50} className="text-green-500" />, count: 1200, label: "Properties Sold" },
  { icon: <FaStar size={50} className="text-yellow-500" />, count: 350, label: "Top Ratings" },
  { icon: <FaGlobe size={50} className="text-purple-500" />, count: 25, label: "Cities Covered" }
];

const Achievements = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-12 bg-gray-100">
      <div className="container mx-auto">
        
        {/* Section Title */}
        <motion.h2 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12"
        >
          Our <span className="text-blue-600">Achievements</span>
        </motion.h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 text-center">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white shadow-lg p-8 rounded-lg flex flex-col items-center hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-3xl font-bold text-gray-800">
                <CountUp end={item.count} duration={3} separator="," />
                {item.label === "Cities Covered" ? "+" : ""}
              </h3>
              <p className="text-gray-600 text-lg">{item.label}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Achievements;
