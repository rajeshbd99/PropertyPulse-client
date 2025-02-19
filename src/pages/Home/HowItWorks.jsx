import { motion } from "framer-motion";
import { FaSearch, FaHome, FaCalendarAlt, FaHandshake, FaFileContract, FaMoneyCheckAlt, FaKey, FaSmile } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const steps = [
  { step: "01", icon: <FaSearch size={40} className="text-blue-600" />, title: "Search for a Property", desc: "Explore a wide range of verified listings tailored to your needs." },
  { step: "02", icon: <FaHome size={40} className="text-green-500" />, title: "Select Your Dream Home", desc: "Filter properties based on location, price, and amenities." },
  { step: "03", icon: <FaCalendarAlt size={40} className="text-purple-500" />, title: "Schedule a Visit", desc: "Book an appointment to visit and inspect the property." },
  { step: "04", icon: <FaHandshake size={40} className="text-orange-500" />, title: "Meet the Agent", desc: "Connect with trusted real estate agents for guidance." },
  { step: "05", icon: <FaFileContract size={40} className="text-red-500" />, title: "Negotiate & Finalize", desc: "Discuss the price and finalize the deal securely." },
  { step: "06", icon: <FaMoneyCheckAlt size={40} className="text-yellow-500" />, title: "Secure Financing", desc: "Get loan assistance or make payment arrangements." },
  { step: "07", icon: <FaKey size={40} className="text-teal-500" />, title: "Get the Keys", desc: "Complete the paperwork and receive ownership documents." },
  { step: "08", icon: <FaSmile size={40} className="text-pink-500" />, title: "Move In & Enjoy", desc: "Settle into your new home and start creating memories." }
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-100 flex justify-center">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        
        {/* Title */}
        <motion.h2 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-16"
        >
          How It <span className="text-blue-600">Works?</span>
        </motion.h2>

        {/* Steps Section - Vertical Timeline */}
        <div className="relative flex flex-col items-center">

          {steps.map((item, index) => (
            <div key={index} className="relative flex flex-col items-center w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 text-center">

              {/* Step Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative w-full p-6 sm:p-8 bg-white rounded-lg shadow-lg flex flex-col items-center"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 text-white font-bold text-lg sm:text-xl flex items-center justify-center rounded-full shadow-lg">
                  {item.step}
                </div>

                {/* Icon */}
                <div className="mb-4">{item.icon}</div>

                {/* Title & Description */}
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">{item.desc}</p>
              </motion.div>

              {/* Arrow Indicator (Except Last Step) */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <IoIosArrowDown className="text-blue-600 text-2xl sm:text-3xl mt-4 mb-8 sm:mb-8 animate-bounce" />
                </motion.div>
              )}
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
