import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import React, { useEffect } from 'react';


const ContactUs = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const location = useLocation();
    useEffect(() => {
        const pageTitle = "PropertyPulse | Contact Us";
        document.title = pageTitle;
    }, [location]);


    const onSubmit = (data) => {
        console.log("Form Data:", data);
        reset();

        // ✅ Show success alert
        Swal.fire({
            title: "Message Sent!",
            text: "Thank you for reaching out. We'll get back to you soon.",
            icon: "success",
            confirmButtonColor: "#3b82f6", // Blue color
            confirmButtonText: "OK",
        });
    };

    return (
        <section className="container mx-auto py-16 px-6 mt-12">
            {/* Page Title */}
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl font-bold text-center text-gray-800"
            >
                Contact <span className="text-blue-600">Us</span>
            </motion.h2>
            <p className="text-gray-600 text-lg text-center mt-4 max-w-2xl mx-auto">
                Have questions or need assistance? Get in touch with us!
            </p>

            {/* Contact Info & Form */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Information */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    <div className="flex items-center space-x-4">
                        <FaMapMarkerAlt size={24} className="text-blue-500" />
                        <p className="text-gray-700 text-lg">123 Property Lane, Cityville, USA</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaPhone size={24} className="text-green-500" />
                        <p className="text-gray-700 text-lg">+123 456 7890</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaEnvelope size={24} className="text-red-500" />
                        <p className="text-gray-700 text-lg">support@propertypulse.com</p>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.form
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="contact-form bg-white shadow-lg p-8 rounded-xl"
                >
                    <div className="mb-6">
                        <label className="block text-indigo-700 font-semibold">Name</label>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your Name"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-indigo-700 font-semibold">Email</label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" }
                            })}
                            className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your Email"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-indigo-700 font-semibold">Message</label>
                        <textarea
                            {...register("message", { required: "Message is required" })}
                            className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your Message"
                            rows="4"
                        ></textarea>
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Send Message
                    </button>
                </motion.form>
            </div>
        </section>
    );
};

export default ContactUs;
