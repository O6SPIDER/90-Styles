import React from "react";
import { motion } from "framer-motion";
import About from "../../assets/About.jpg";

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full py-20 bg-[#f5f5f5] text-gray-900 dark:bg-gray-900 dark:text-white overflow-hidden"
    >
      {/* Decorative glowing circles */}
      <div className="absolute top-10 left-10 w-64 h-64
                      bg-yellow-300/40 dark:bg-yellow-400/20
                      rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80
                      bg-amber-400/30 dark:bg-amber-500/20
                      rounded-full blur-3xl animate-pulse delay-300" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12">
        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex-1 flex justify-center lg:justify-start"
        >
          <img
            src={About}
            alt="About Us"
            className="rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10
                      max-h-[400px] w-full object-cover"
          />
        </motion.div>

        {/* Text Side */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex-1 text-center lg:text-left"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">
              About Us
            </span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            At <span className="font-semibold text-yellow-500 dark:text-yellow-400">90+ Styles</span>, we’re more than just a jersey store.
            We’re storytellers of the game, curators of iconic moments, and passionate fans who believe that every
            jersey carries the spirit of legends.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            From the world’s biggest stadiums to your own local pitch, our mission is to bring you closer to the sport
            you love with authentic, premium-quality gear.
          </p>

          {/* CTA Button */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block mt-4 px-8 py-4 rounded-full text-lg font-semibold 
                      bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 dark:text-white 
                      hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-2xl"
          >
            Discover Our Story
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
