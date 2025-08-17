import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer: React.FC = () => {
  const navLinks = ["Home", "About Us", "Products", "Contact Us"];
  const socialLinks = [
    { icon: <FaFacebookF />, href: "https://facebook.com" },
    { icon: <FaTwitter />, href: "https://twitter.com" },
    { icon: <FaInstagram />, href: "https://instagram.com" },
    { icon: <FaLinkedinIn />, href: "https://linkedin.com" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-200 px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand & Description */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-400">
            90+ Styles
          </h1>
          <p className="text-gray-400">
            Premium sports apparel and custom jerseys. Stay updated with our latest collections and offers.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4">
            {socialLinks.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-gray-400 hover:text-pink-500 transition-colors duration-300 text-xl"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Quick Links</h2>
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
              className="block text-gray-400 hover:text-pink-500 transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Subscribe</h2>
          <p className="text-gray-400">Get updates about new products and offers.</p>
          <form className="flex flex-col sm:flex-row gap-2 mt-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:border-pink-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold hover:shadow-lg transition-shadow duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} 90+ Styles. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;