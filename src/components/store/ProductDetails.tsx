import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { Product } from "../../types/product";
import { productsData } from "../../data/products";
import { useCart } from "../../hooks/useCart"; // <-- Import the useCart hook

// Remove the onAddToCart prop from the Props type
type Props = {
  product: Product;
};

const ProductDetails: React.FC<Props> = ({ product }) => {
  // Use the hook to get the addToCart function directly
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const navigate = useNavigate();

  // Similar jerseys from same team, excluding current
  const similar = useMemo(() => {
    const sameTeam = productsData.filter(
      (p) => p.team === product.team && p.id !== product.id
    );
    if (sameTeam.length > 0) return sameTeam;

    // fallback -> same brand if no same-team jerseys
    return productsData.filter(
      (p) => p.brand === product.brand && p.id !== product.id
    );
  }, [product.id, product.team, product.brand]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
      {/* Back Button */}
      <motion.button
        onClick={() => navigate(-1)}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2 mb-8 text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back</span>
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left: Large Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full"
        >
          <div className="w-full aspect-square bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </motion.div>

        {/* Right: Details and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            {product.name}
          </h1>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">
              Brand:
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium">
              {product.brand}
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium">
              {product.team}
            </span>
          </div>

          <p className="text-pink-500 text-3xl font-bold mb-4">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Sizes */}
          <div className="mb-6">
            <p className="font-medium mb-2 text-gray-900 dark:text-gray-200">
              Choose Size:
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <motion.button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2 rounded-xl font-semibold transition-all duration-200 ${
                    selectedSize === size
                      ? "bg-pink-500 text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                  aria-pressed={selectedSize === size}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            onClick={() => {
              // Call the addToCart function from the hook
              addToCart({
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                size: selectedSize,
              });
              toast.success(`${product.name} added to cart!`);
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Add to Cart
          </motion.button>
        </motion.div>
      </div>

      {/* Similar Jerseys */}
      {similar.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Similar Jerseys
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {similar.map((s) => (
              <motion.a
                key={s.id}
                href={`/product/${s.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition block overflow-hidden"
              >
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-40 sm:h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-4 text-center">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white line-clamp-2">
                    {s.name}
                  </h3>
                  <p className="text-pink-500 font-bold mt-1">
                    ${s.price.toFixed(2)}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;