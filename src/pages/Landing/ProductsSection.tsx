import React from "react";
import { motion } from "framer-motion";

// Mock product data
const products = [
  {
    id: 1,
    name: "LA Galaxy Jersey",
    price: 99.99,
    imageUrl: "https://images.unsplash.com/photo-1618354691434-0a1b5b2de83b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Real Madrid Jersey",
    price: 109.99,
    imageUrl: "https://images.unsplash.com/photo-1608363834345-0f8b4c5f5f47?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "FC Barcelona Jersey",
    price: 119.99,
    imageUrl: "https://images.unsplash.com/photo-1627646413442-33a611c4a64e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Manchester United Jersey",
    price: 129.99,
    imageUrl: "https://images.unsplash.com/photo-1627013938282-1a2dc8c22bfa?auto=format&fit=crop&w=400&q=80",
  },
];

const ProductSection: React.FC = () => {
  return (
    <section className="bg-gray-900 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-400">
          Our Products
        </h2>
        <p className="text-gray-400 mt-2">
          Check out our premium collection of jerseys from top football clubs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-60 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-100">{product.name}</h3>
              <p className="text-pink-400 font-bold mt-2">${product.price.toFixed(2)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;