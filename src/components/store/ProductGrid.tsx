import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "../../types/product";

type Props = {
  products: Product[];
  loading?: boolean;
};

const ProductSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-2 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
    <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-lg" />
    <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
    <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
  </div>
);

const ProductGrid: React.FC<Props> = ({ products, loading }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {loading
        ? Array.from({ length: 8 }).map((_, idx) => <ProductSkeleton key={idx} />)
        : products.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col"
            >
              <Link to={`/product/${p.id}`}>
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-56 sm:h-64 md:h-72 object-cover"
                  loading="lazy"
                />
              </Link>
              <div className="p-4 text-center">
                <Link to={`/product/${p.id}`}>
                  <h2 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white hover:underline line-clamp-2">
                    {p.name}
                  </h2>
                </Link>
                <p className="text-pink-500 font-bold mt-1">${p.price}</p>
              </div>
            </motion.div>
          ))}
    </div>
  );
};

export default ProductGrid;
