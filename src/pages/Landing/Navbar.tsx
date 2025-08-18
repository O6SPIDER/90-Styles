import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: "Home", href: "#/" },
    { name: "About Us", href: "#about" },
    { name: "Contact Us", href: "#contact" },
  ];

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[85%] rounded-full
                bg-[#f5f5f5]/20 dark:bg-[#0f172a]/50 border border-white/20 dark:border-gray-700/50
                backdrop-blur-xl shadow-xl px-6 py-3 transition-colors duration-500"
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <motion.a
          href="#"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent"
        >
          90+ Styles
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              whileHover={{ scale: 1.05 }}
              className="relative text-gray-800 dark:text-gray-200 font-medium text-lg group transition-colors duration-300"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-pink-500 to-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <motion.button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            whileTap={{ rotate: 180, scale: 0.9 }}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:scale-110 transition-transform duration-300"
          >
            {theme === "light" ? (
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-500"
                viewBox="0 0 24 24"
                fill="currentColor"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
              >
                <circle cx="12" cy="12" r="5" />
              </motion.svg>
            ) : (
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-100"
                viewBox="0 0 24 24"
                fill="currentColor"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </motion.svg>
            )}
          </motion.button>

          {/* CTA Button */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:inline-flex px-6 py-3 rounded-full text-white font-semibold 
                      bg-gradient-to-r from-pink-500 to-yellow-400 shadow-lg hover:shadow-2xl transition"
          >
            Go to Store
          </motion.a>

          {/* Mobile Menu Toggle */}
          <button
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-800 dark:text-gray-200 focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-4 rounded-2xl bg-[#f5f5f5]/90 dark:bg-[#0f172a]/90 p-6 shadow-xl backdrop-blur-lg transition-colors duration-300"
          >
            <div className="flex flex-col items-center space-y-4">
              {navLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="text-lg text-gray-800 dark:text-gray-200 hover:text-pink-500 dark:hover:text-yellow-400 font-medium transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#"
                className="w-full text-center px-6 py-3 rounded-full text-white font-semibold 
                          bg-gradient-to-r from-pink-500 to-yellow-400 shadow-lg hover:shadow-2xl transition"
              >
                Go to Store
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
