// src/components/store/CartItem.tsx
import React from "react";
import { FiTrash2 } from "react-icons/fi";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  image,
  quantity,
  onRemove,
  onUpdateQuantity,
}) => {
  return (
    <div className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-700 py-4">
      <img
        src={image}
        alt={name}
        className="w-20 h-20 object-cover rounded-lg"
      />

      <div className="flex-1">
        <h3 className="text-gray-900 dark:text-gray-100 font-semibold">
          {name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          ${price.toFixed(2)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onUpdateQuantity(id, Math.max(1, quantity - 1))}
            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-md"
          >
            -
          </button>
          <span className="px-2">{quantity}</span>
          <button
            onClick={() => onUpdateQuantity(id, quantity + 1)}
            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-md"
          >
            +
          </button>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(id)}
        className="text-red-500 hover:text-red-600"
      >
        <FiTrash2 size={20} />
      </button>
    </div>
  );
};

export default CartItem;
