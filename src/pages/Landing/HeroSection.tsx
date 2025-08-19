import React from "react";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  return (
    <section id="home"className="relative w-full h-screen overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1950&q=80')",
        }}
        aria-hidden="true"
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/60 z-0"></div>

      {/* Hero content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
          Elevate Your Game
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-white mb-8 max-w-2xl drop-shadow-md">
          Authentic Sports Jerseys for Every Champion
        </p>
        <motion.a
          href="#products"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 rounded-full font-semibold 
                    bg-yellow-500 text-black dark:text-white dark:bg-yellow-600 
                    hover:bg-yellow-400 dark:hover:bg-yellow-500 
                    transition-colors duration-300 shadow-lg"
        >
          Explore
        </motion.a>
      </motion.div>
    </section>
  );
};

export default HeroSection;