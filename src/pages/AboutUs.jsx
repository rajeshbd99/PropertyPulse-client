import { motion } from "framer-motion";
import { FaHandshake, FaRocket, FaHeart, FaUserShield, FaGlobe, FaStar, FaLightbulb, FaUsers, FaShieldAlt } from "react-icons/fa";
import img from '../assets/img1.jpg';
import img1 from "../assets/team1.jpg";
import img2 from "../assets/team2.jpg";
import img3 from "../assets/team3.png";
import img4 from "../assets/team4.avif";
import img5 from "../assets/team5.jpg";
import img6 from "../assets/team6.avif";
import img7 from "../assets/team7.jpg";
import img8 from "../assets/team8.jpg";
import missionImg from "../assets/mission.jpg";
import { useLocation } from "react-router-dom";
import React, { useEffect } from 'react';



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

    const location = useLocation();
    useEffect(() => {
        const pageTitle = "PropertyPulse | About Us";
        document.title = pageTitle;
    }, [location]);


    return (
        <div className="">
            <section className="relative flex flex-col-reverse lg:flex-row items-center justify-between px-6 py-12 mt-16 mb-10 container mx-auto">
                {/* Left Content */}
                <div className="lg:w-1/2 text-center lg:text-left">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="title text-4xl sm:text-5xl font-extrabold text-gray-800 leading-tight"
                    >
                        Welcome to <span className="text-blue-600">PropertyPulse</span>
                    </motion.h1>
                    <p className="text-gray-700 text-lg mt-4 mb-6">
                        Your trusted real estate partner. Discover verified listings, expert agents, and seamless property transactions.
                    </p>

                    {/* Call-to-Action Button */}
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="/all-properties#explore"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        Explore Properties
                    </motion.a>
                </div>

                {/* Right Image with Floating Effect */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="lg:w-1/2 w-full flex justify-center"
                >
                    <img
                        src={img}
                        alt="Real Estate"
                        className="rounded-lg shadow-2xl transform transition duration-300 hover:scale-105"
                    />
                </motion.div>
            </section>

            <section className="relative flex flex-col-reverse lg:flex-row items-center justify-between px-6 py-12 mt-10 mb-10 container mx-auto">
                {/* Main Container */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6">
                    {/* Left Side - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center"
                    >
                        <img
                            src={missionImg}
                            alt="Our Mission"
                            className="rounded-lg shadow-2xl transform transition duration-300"
                        />
                    </motion.div>

                    {/* Right Side - Content */}
                    <div className="text-center lg:text-left">
                        <motion.h2
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl sm:text-4xl font-bold text-gray-800"
                        >
                            Our <span className="text-blue-600">Mission</span>
                        </motion.h2>
                        <p className="text-gray-600 mt-4 text-lg">
                            We aim to redefine real estate by prioritizing trust, innovation, and seamless property experiences.
                        </p>

                        {/* Mission Highlights - Cards */}
                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Card 1 */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="mission-card bg-white p-6 rounded-lg shadow-md flex items-center gap-4"
                            >
                                <FaHandshake className="text-blue-600 text-3xl" />
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900">Trust & Transparency</h3>
                                    <p className="text-sm text-gray-600">Ensuring honesty in every transaction.</p>
                                </div>
                            </motion.div>

                            {/* Card 2 */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="mission-card bg-white p-6 rounded-lg shadow-md flex items-center gap-4"
                            >
                                <FaLightbulb className="text-blue-600 text-3xl" />
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900">Innovation & Technology</h3>
                                    <p className="text-sm text-gray-600">Leveraging AI and modern tools for smarter decisions.</p>
                                </div>
                            </motion.div>

                            {/* Card 3 */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="mission-card bg-white p-6 rounded-lg shadow-md flex items-center gap-4"
                            >
                                <FaUsers className="text-blue-600 text-3xl" />
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900">Customer-Centric Approach</h3>
                                    <p className="text-sm text-gray-600">Focusing on seamless property experiences.</p>
                                </div>
                            </motion.div>

                            {/* Card 4 */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="mission-card bg-white p-6 rounded-lg shadow-md flex items-center gap-4"
                            >
                                <FaShieldAlt className="text-blue-600 text-3xl" />
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900">Secure & Verified Listings</h3>
                                    <p className="text-sm text-gray-600">Ensuring every listing is authentic and safe.</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>



            <section className="container mx-auto py-12 mt-10 mb-10">
                {/* Main Content */}
                <div className="max-w-7xl mx-auto container text-center">
                    {/* Section Title */}
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-5xl font-bold text-gray-800 text-shadow-md"
                    >
                        Our <span className="text-blue-600">Values</span>
                    </motion.h2>
                    <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
                        At PropertyPulse, we uphold principles that drive excellence, trust, and innovation in real estate.
                    </p>

                    {/* Values Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6">
                        {[
                            { icon: <FaHandshake size={50} className="text-blue-500" />, title: "Trust", desc: "We ensure transparent and secure transactions for all parties involved." },
                            { icon: <FaRocket size={50} className="text-green-500" />, title: "Innovation", desc: "We leverage AI and data-driven insights to redefine real estate experiences." },
                            { icon: <FaHeart size={50} className="text-red-500" />, title: "Customer First", desc: "We prioritize your needs, offering personalized solutions and support." },
                            { icon: <FaUserShield size={50} className="text-yellow-500" />, title: "Integrity", desc: "Honesty and professionalism guide all our interactions and business ethics." },
                            { icon: <FaGlobe size={50} className="text-indigo-500" />, title: "Sustainability", desc: "We support eco-friendly initiatives for responsible property development." },
                            { icon: <FaUsers size={50} className="text-purple-500" />, title: "Community", desc: "We strive to build lasting relationships and vibrant communities." },
                            { icon: <FaStar size={50} className="text-orange-500" />, title: "Excellence", desc: "We uphold the highest standards in property services and client satisfaction." },
                            { icon: <FaLightbulb size={50} className="text-teal-500" />, title: "Growth Mindset", desc: "We continuously evolve and innovate to stay ahead in the industry." }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="mission-card bg-white shadow-lg p-6 rounded-xl transform hover:-translate-y-2 transition duration-300 hover:shadow-2xl flex flex-col items-center"
                            >
                                <div className="mb-4">{item.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                                <p className="text-gray-600 text-sm text-center">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            <section className="py-16 px-6">
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
                                className="mission-card bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
                            >
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-full h-40 object-fill"
                                />
                                <div className="p-6 text-center">
                                    <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
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
