// src/components/store/CheckoutForm.tsx
import React, { useState } from "react";

const CheckoutForm: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order placed:", form);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Checkout</h2>

        {/* Contact Info */}
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            value={form.zip}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        {/* Payment */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">Payment</h3>
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={form.cardNumber}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            value={form.expiry}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            type="text"
            name="cvc"
            placeholder="CVC"
            value={form.cvc}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-semibold shadow-md hover:shadow-lg transition"
        >
          Place Order
        </button>
      </form>

      {/* Summary */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h3>
        <div className="space-y-2 text-gray-700 dark:text-gray-300">
          <div className="flex justify-between"><span>Liverpool Home Jersey</span><span>$89.99</span></div>
          <div className="flex justify-between"><span>Arsenal Away Jersey</span><span>$79.99</span></div>
          <div className="flex justify-between font-semibold border-t pt-2">
            <span>Total</span><span>$169.98</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
