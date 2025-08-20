import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "../../types/product";
import { productsData } from "../../data/products"; // used to compute similar

type Props = {
  product: Product;
  onAddToCart: (id: number, size?: string) => void;
};

const ProductDetails: React.FC<Props> = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);

  // Similar jerseys from same team, excluding current
  const similar = useMemo(() => {
    const sameTeam = productsData.filter(
      (p) => p.team === product.team && p.id !== product.id
    );
    if (sameTeam.length > 0) return sameTeam;

    // fallback → same brand if no same-team jerseys
    return productsData.filter(
      (p) => p.brand === product.brand && p.id !== product.id
    );
  }, [product.id, product.team, product.brand]);

  // Debugging logs (now inside component)
  console.log("Current product:", product);
  console.log("Similar jerseys:", similar);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left: Large Image (mobile on top) */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          <div className="w-full aspect-square bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Right: Brand, Description, Sizes, Add to Cart */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {product.name}
          </h1>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Brand
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium">
              {product.brand}
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium">
              {product.team}
            </span>
          </div>

          <p className="text-pink-500 text-2xl font-semibold mb-4">
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
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg border transition ${
                    selectedSize === size
                      ? "bg-pink-500 text-white border-pink-500"
                      : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                  }`}
                  aria-pressed={selectedSize === size}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product.id, selectedSize)}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold shadow-md hover:shadow-lg transition"
          >
            Add to Cart
          </button>
        </motion.div>
      </div>

      {/* Similar Jerseys */}
      {similar.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Similar Jerseys
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {similar.map((s) => (
              <a
                key={s.id}
                href={`/product/${s.id}`}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden block"
              >
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-40 sm:h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-3 text-center">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white line-clamp-2">
                    {s.name}
                  </h3>
                  <p className="text-pink-500 font-bold mt-1">
                    ${s.price.toFixed(2)}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
