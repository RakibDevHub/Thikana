import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-white py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">🏠 Thikana</h3>
            <p className="text-gray-400 dark:text-gray-500">Your trusted partner in finding the perfect property.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 dark:text-gray-500">
              <li><Link to="/" className="hover:text-white dark:hover:text-gray-300 transition">Home</Link></li>
              <li><Link to="/properties" className="hover:text-white dark:hover:text-gray-300 transition">Properties</Link></li>
              <li><Link to="/about" className="hover:text-white dark:hover:text-gray-300 transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white dark:hover:text-gray-300 transition">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400 dark:text-gray-500">
              <li>📍 123 Real Estate Ave</li>
              <li>📞 (555) 123-4567</li>
              <li>✉️ info@thikana.com</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition text-2xl">📘</a>
              <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition text-2xl">🐦</a>
              <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition text-2xl">📷</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-8 text-center text-gray-400 dark:text-gray-500">
          <p>&copy; 2024 Thikana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;