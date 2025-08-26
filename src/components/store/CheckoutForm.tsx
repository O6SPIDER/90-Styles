import React, { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import PaystackPop from "@paystack/inline-js";
import type { PaystackTransaction } from "@paystack/inline-js";
import toast from "react-hot-toast";
import type { CartItem } from "../../context/CartContext";

const CheckoutForm: React.FC = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const subtotal = items.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  const handlePaystackPayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY!,
      amount: subtotal * 100, // Paystack expects kobo/pesewas
      email: form.email,
      name: form.name,
      onSuccess: (transaction: PaystackTransaction) => {
        toast.success("Payment successful! 🎉");

        // ✅ Example payload to send to backend
        const orderPayload = {
          customer: form,
          items,
          total: subtotal,
          transactionRef: transaction.reference,
        };

        console.log("Order payload:", orderPayload);

        clearCart();
        navigate("/thank-you", { state: orderPayload });
      },
      onCancel: () => {
        toast("Payment cancelled", { icon: "⚠️" });
      },
    });
  };

  return (
    <form
      onSubmit={handlePaystackPayment}
      className="p-6 md:p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl space-y-8"
    >
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
        Complete your order
      </h2>

      {/* Contact Info Section */}
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700
            bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white
            focus:ring-pink-500 focus:border-pink-500 transition duration-200"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700
            bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white
            focus:ring-pink-500 focus:border-pink-500 transition duration-200"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Address
          </span>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700
            bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white
            focus:ring-pink-500 focus:border-pink-500 transition duration-200"
          />
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              City
            </span>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700
              bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white
              focus:ring-pink-500 focus:border-pink-500 transition duration-200"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              ZIP Code
            </span>
            <input
              type="text"
              name="zip"
              value={form.zip}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700
              bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white
              focus:ring-pink-500 focus:border-pink-500 transition duration-200"
            />
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold
        shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5
        disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={items.length === 0}
      >
        Pay with Paystack
      </button>
    </form>
  );
};

export default CheckoutForm;