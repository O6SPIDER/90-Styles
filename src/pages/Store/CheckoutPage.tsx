import React from "react";
import CheckoutForm from "../../components/store/CheckoutForm";
import { useCart } from "../../hooks/useCart";

const CheckoutPage: React.FC = () => {
  const { items } = useCart();
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-10 text-center">
        Secure Checkout
      </h1>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <CheckoutForm />

        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-3xl shadow-xl h-fit">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Order Summary
          </h3>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300">
            {items.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">
                Your cart is empty.
              </p>
            ) : (
              items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700"
                >
                  <div className="flex-1 pr-4">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm block text-gray-500 dark:text-gray-400">
                      x {item.quantity}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))
            )}
          </ul>

          <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-700 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-gray-900 dark:text-white">
              ${subtotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;