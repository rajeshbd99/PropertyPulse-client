import { motion } from "framer-motion";
import { FaHandshake, FaRocket, FaHeart, FaUserShield } from "react-icons/fa";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import img from '../assets/img1.jpg';
import img1 from "../assets/team1.jpg"; 
import img2 from "../assets/team2.jpg"; 
import img3 from "../assets/team3.png"; 
import img4 from "../assets/team4.avif"; 
import img5 from "../assets/team5.jpg"; 
import img6 from "../assets/team6.avif"; 
import img7 from "../assets/team7.jpg"; 
import img8 from "../assets/team8.jpg"; 


const teamMembers = [
    { name: "John Doe", role: "CEO & Founder", img: img1 },
    { name: "Jane Smith", role: "Chief Marketing Officer", img: img2 },
    { name: "Alice Brown", role: "Lead Developer", img: img3 },
    { name: "Michael Green", role: "Head of Sales", img: img4 },
    { name: "David Wilson", role: "Senior UI/UX Designer", img: img5 },
    { name: "Sophia Martinez", role: "Software Engineer", img: img6 },
    { name: "James Anderson", role: "Financial Analyst", img: img7 },
    { name: "Emily White", role: "HR Manager", img: img8 },
  ];

const AboutUs = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="relative flex flex-col-reverse lg:flex-row items-center justify-between px-6 py-16 lg:py-24 max-w-7xl mx-auto">
        <div className="lg:w-1/2 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4"
          >
            About <span className="text-blue-600">PropertyPulse</span>
          </motion.h1>
          <p className="text-gray-600 text-lg mb-6">
            We help you find your dream property effortlessly. With verified listings and expert agents, we make buying, selling, and renting homes simple and secure.
          </p>
        </div>
        <motion.img 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6 }} 
          src= {img}
          alt="Real Estate" 
          className="lg:w-1/2 w-full rounded-lg shadow-lg"
        />
      </section>

      {/* Our Mission */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-gray-800"
          >
            Our <span className="text-blue-600">Mission</span>
          </motion.h2>
          <p className="text-gray-600 mt-4 text-lg">
            We are committed to transforming real estate transactions with innovation, trust, and customer satisfaction.
          </p>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
            Our <span className="text-blue-600">Values</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[  
              { icon: <FaHandshake size={50} className="text-blue-500" />, title: "Trust", desc: "We ensure transparent and secure transactions." },
              { icon: <FaRocket size={50} className="text-green-500" />, title: "Innovation", desc: "Cutting-edge technology for a seamless experience." },
              { icon: <FaHeart size={50} className="text-red-500" />, title: "Customer Focus", desc: "Your satisfaction is our priority." },
              { icon: <FaUserShield size={50} className="text-yellow-500" />, title: "Integrity", desc: "Honesty and professionalism at every step." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white shadow-lg p-6 rounded-lg"
              >
                <div className="mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-gray-800"
        >
          Meet Our <span className="text-blue-600">Team</span>
        </motion.h2>
        <p className="text-gray-600 text-lg mt-4">
          A dedicated team of professionals shaping the future of real estate.
        </p>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-40 object-fill"
              />
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

export default AboutUs;
