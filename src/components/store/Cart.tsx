import React from "react";
import CartItem from "./CartItem";
import { FiX } from "react-icons/fi";

interface CartProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartProduct[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  onRemove,
  onUpdateQuantity,
}) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div
      className={`fixed top-0 right-0 w-80 h-full bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Shopping Cart
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <FiX size={24} />
        </button>
      </div>

      {/* Items */}
      <div className="p-4 overflow-y-auto max-h-[70%]">
        {items.length > 0 ? (
          items.map((item) => (
            <CartItem
              key={item.id}
              {...item}
              onRemove={onRemove}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            Your cart is empty.
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-gray-900 dark:text-gray-100 font-semibold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="w-full mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-semibold hover:shadow-lg transition duration-300">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
