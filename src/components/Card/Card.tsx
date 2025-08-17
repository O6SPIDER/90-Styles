import React, { useState } from "react";
import { motion } from "framer-motion";

interface JerseyData {
  teamName: string;
  playerName: string;
  number: number;
  price: number;
  imageUrl: string;
  sizes: string[];
}

const mockJersey: JerseyData = {
  teamName: "LA Galaxy",
  playerName: "J. HERNÁNDEZ",
  number: 14,
  price: 99.99,
  imageUrl: "https://placehold.co/400x400/1e1e1e/d4d4d4?text=Jersey+Image",
  sizes: ["S", "M", "L", "XL", "XXL"],
};

const JerseyCard = ({ jersey }: { jersey: JerseyData }) => {
  const [selectedSize, setSelectedSize] = useState<string>(jersey.sizes[2]);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative w-full max-w-xs mx-auto bg-gray-800 rounded-2xl p-6 shadow-2xl overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full opacity-10 blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full opacity-10 blur-3xl animate-pulse-slow-reverse"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Jersey Image */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-full aspect-square mb-4 rounded-xl overflow-hidden shadow-lg"
        >
          <img
            src={jersey.imageUrl}
            alt={`${jersey.teamName} ${jersey.playerName}`}
            className="w-full h-full object-cover rounded-xl"
          />
        </motion.div>

        {/* Details */}
        <div className="text-center text-gray-100 mb-6">
          <h2 className="text-lg font-semibold tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
            {jersey.teamName}
          </h2>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-1">{jersey.playerName}</h1>
          <p className="text-5xl font-extrabold text-gray-400">#{jersey.number}</p>
        </div>

        {/* Price */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className="text-4xl font-bold text-gray-100 mb-4"
        >
          ${jersey.price.toFixed(2)}
        </motion.div>

        {/* Size Selector */}
        <div className="flex space-x-2 mb-6">
          {jersey.sizes.map((size) => (
            <motion.button
              key={size}
              onClick={() => setSelectedSize(size)}
              whileTap={{ scale: 0.9 }}
              className={`w-12 h-12 rounded-full font-bold transition-all duration-200 ${
                selectedSize === size
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                  : "bg-gray-700 text-gray-400 hover:bg-gray-600"
              }`}
            >
              {size}
            </motion.button>
          ))}
        </div>

        {/* Add to Cart */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 rounded-full font-bold text-lg text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg transition-all duration-300"
        >
          Add to Cart
        </motion.button>
      </div>

      {/* Custom Animations */}
      <style>
        {`
          @keyframes pulse-slow {
            0%,100% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.2) rotate(30deg); }
          }
          @keyframes pulse-slow-reverse {
            0%,100% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.2) rotate(-30deg); }
          }
          .animate-pulse-slow { animation: pulse-slow 20s infinite ease-in-out; }
          .animate-pulse-slow-reverse { animation: pulse-slow-reverse 20s infinite ease-in-out; }
        `}
      </style>
    </motion.div>
  );
};

// ✅ Render it somewhere
export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <JerseyCard jersey={mockJersey} />
    </div>
  );
}