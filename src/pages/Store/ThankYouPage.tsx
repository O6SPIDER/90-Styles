import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { CartItem } from "../../context/CartContext";

interface CustomerInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
}

interface OrderPayload {
  customer: CustomerInfo;
  items: CartItem[];
  total: number;
  transactionRef: string;
}

const ThankYouPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state as OrderPayload | null;

  if (!order) {
    // If no state (user refreshed page), send them home
    navigate("/");
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        🎉 Thank You for Your Order!
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-10">
        A confirmation has been sent to <b>{order.customer.email}</b>.
      </p>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 mb-8 text-left">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {/* Customer Info */}
        <div className="mb-6">
          <p className="font-semibold">Customer:</p>
          <p>{order.customer.name}</p>
          <p>{order.customer.address}, {order.customer.city}, {order.customer.zip}</p>
        </div>

        {/* Items */}
        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex justify-between border-b pb-2"
            >
              <span>
                {item.name} {item.size && <span>({item.size})</span>} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between font-bold text-lg mt-6">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>

        {/* Transaction Ref */}
        <p className="text-sm text-gray-500 mt-4">
          Transaction Reference: {order.transactionRef}
        </p>
      </div>

      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold shadow-md hover:shadow-lg transition"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default ThankYouPage;
