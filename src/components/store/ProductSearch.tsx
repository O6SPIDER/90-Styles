import React from "react";
import { FiSearch } from "react-icons/fi";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-md mb-6">
      <FiSearch className="absolute left-3 top-3 text-gray-400" size={20} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search jerseys..."
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-yellow-400"
      />
    </div>
  );
};

export default ProductSearch;
