// src/pages/Store/StorePage.tsx
import React, { useEffect, useState } from "react";
import StoreLayout from "../../components/StoreLayout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Define Product type
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

// Skeleton Loader
const ProductSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-2 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
    <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
    <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
    <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
  </div>
);

const StorePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: "Liverpool FC Jersey",
          price: 79.99,
          image:
            "https://images.unsplash.com/photo-1618354691434-0a1b5b2de83b?auto=format&fit=crop&w=500&q=80",
        },
        {
          id: 2,
          name: "Barcelona Jersey",
          price: 85.0,
          image: "/assets/jerseys/Bacalona.jpg",
        },
        {
          id: 3,
          name: "Bayern Munich Jersey",
          price: 89.99,
          image:
            "https://images.unsplash.com/photo-1627646413442-33a611c4a64e?auto=format&fit=crop&w=500&q=80",
        },
        {
          id: 4,
          name: "PSG Jersey",
          price: 92.0,
          image: "/assets/jerseys/PSG.jpg",
        },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  // Handle search from StoreNavbar
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    console.log("Search term:", term);
  };

  // Filter products by search term
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <StoreLayout onSearch={handleSearch}>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Our Store
        </h1>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, idx) => (
                <ProductSkeleton key={idx} />
              ))
            : filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col"
                >
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-56 sm:h-64 md:h-72 object-cover"
                    />
                  </Link>
                  <div className="p-4 text-center">
                    <Link to={`/product/${product.id}`}>
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-white hover:underline">
                        {product.name}
                      </h2>
                    </Link>
                    <p className="text-pink-500 font-bold mt-1">
                      ${product.price}
                    </p>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </StoreLayout>
  );
};

export default StorePage;
