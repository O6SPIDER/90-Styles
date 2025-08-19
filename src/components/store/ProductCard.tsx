import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-white/10 overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <Link to={`/product/${id}`}>
        <div className="w-full h-36 sm:h-44 md:h-52 overflow-hidden rounded-t-2xl">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-3 sm:p-4 text-center">
        <Link to={`/product/${id}`}>
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white hover:underline">
            {name}
          </h3>
        </Link>
        <p className="text-yellow-500 font-bold mt-1 text-sm sm:text-base">${price}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
