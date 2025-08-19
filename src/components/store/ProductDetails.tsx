// src/components/store/ProductDetails.tsx
import React, { useState } from "react";

interface ProductDetailsProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  sizes?: string[];
  onAddToCart: (productId: string, size?: string) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  id,
  name,
  price,
  image,
  description,
  sizes = ["S", "M", "L", "XL"],
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">
      {/* Image */}
      <div>
        <img src={image} alt={name} className="rounded-2xl shadow-lg w-full" />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{name}</h1>
        <p className="text-yellow-500 text-2xl font-semibold mb-6">${price.toFixed(2)}</p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{description}</p>

        {/* Sizes */}
        <div className="mb-6">
          <p className="font-medium mb-2 text-gray-900 dark:text-gray-200">Choose Size:</p>
          <div className="flex gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-lg border ${
                  selectedSize === size
                    ? "bg-yellow-500 text-white border-yellow-500"
                    : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => onAddToCart(id, selectedSize)}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-semibold shadow-md hover:shadow-lg transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
