import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import BarcelonaJersey from "../../assets/jerseys/Bacalona.jpg";
import LiverpoolJersey from "../../assets/jerseys/Liverpool.jpg";
import BayernJersey from "../../assets/jerseys/Bayern.jpg";
import PSGJersey from "../../assets/jerseys/PSG.jpg";

// Mock product data
const products = [
  { id: 1, name: "Liverpool FC Jersey", imageUrl: LiverpoolJersey },
  { id: 2, name: "FC Barcelona Jersey", imageUrl: BarcelonaJersey },
  { id: 3, name: "FC Bayern Munich Jersey", imageUrl: BayernJersey },
  { id: 4, name: "Paris Saint-Germain Jersey", imageUrl: PSGJersey },
];

// Motion Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] }, // cubic-bezier for easeOut
  },
};

const ProductSection: React.FC = () => {
  return (
    <section id="products" className="bg-[#f5f5f5] dark:bg-gray-900 py-16 px-6">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto text-center mb-12"
      >
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">
            Premium Football Jerseys
          </span>
        </h2>
        <p className="text-gray-700 dark:text-gray-400 leading-relaxed mt-2">
          Check out our premium collection of jerseys from top football clubs.
        </p>
      </motion.div>

      {/* Products Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={cardVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 border border-gray-200 dark:border-white/10"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-60 object-contain bg-gray-100 dark:bg-gray-700"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {product.name}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ProductSection;
