import React from "react";
import { motion } from "framer-motion";
import { useCart } from "../../hooks/useCart";
import type { CartItem } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity } = useCart();
  const subtotal = items.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    navigate("/checkout"); // Always redirect
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold transition"
      >
        ← Back
      </button>

      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Shopping Cart
      </h1>

      {items.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-center mt-20 text-lg">
          Your cart is empty.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            {items.map((item: CartItem) => (
              <motion.div
                key={`${item.id}-${item.size}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-32 h-40 sm:h-32 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.name}
                    </h2>
                    {item.size && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Size: {item.size}
                      </p>
                    )}
                    <p className="text-pink-500 font-semibold mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-3 sm:mt-0">
                    <div className="flex items-center border rounded-lg dark:border-gray-600">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.size,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition rounded-l-lg"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-l border-r dark:border-gray-600">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity + 1)
                        }
                        className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition rounded-r-lg"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-red-500 hover:text-red-700 font-semibold transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Order Summary
            </h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-6">
              <span className="text-gray-600 dark:text-gray-400">Shipping</span>
              <span className="font-semibold">Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold shadow-md hover:shadow-lg transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
