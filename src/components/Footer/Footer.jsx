import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-2">PropertyPulse</h3>
            <p className="text-gray-300 text-sm mb-2">
              Your ultimate destination for finding the perfect property. Reliable, trusted, and tailored to your needs.
            </p>
            <p className="text-gray-400 text-xs">
              &copy; {new Date().getFullYear()} PropertyPulse. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="/" className="hover:text-blue-300 transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/aboutUs" className="hover:text-blue-300 transition-colors duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="/all-properties" className="hover:text-blue-300 transition-colors duration-300">
                  Properties
                </a>
              </li>
              <li>
                <a href="/contactUs" className="hover:text-blue-300 transition-colors duration-300">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <div className="flex items-center mb-2 text-sm">
              <FaPhoneAlt className="text-blue-300 mr-2" />
              <p className="text-gray-300">+1 234 567 890</p>
            </div>
            <div className="flex items-center mb-2 text-sm">
              <FaEnvelope className="text-blue-300 mr-2" />
              <p className="text-gray-300">support@propertypulse.com</p>
            </div>
            <div className="flex space-x-3 mt-2">
              <a
                href="https://facebook.com"
                className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="https://twitter.com"
                className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300"
              >
                <FaTwitter size={14} />
              </a>
              <a
                href="https://instagram.com"
                className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="https://youtube.com"
                className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300"
              >
                <FaYoutube size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-xs text-gray-400">
        Designed with ❤️ by PropertyPulse Team
      </div>
    </footer>
  );
};

export default Footer;
