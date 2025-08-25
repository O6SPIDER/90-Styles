import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  jersey: {
    id: number;
    name: string;
    price: number;
    main_image: string;
  };
  quantity: number;
}

const CheckoutPage: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [form, setForm] = useState({
    shipping_address: "",
    card_number: "",
    expiry: "",
    cvc: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login"); // Only redirect if no token
      return;
    }
    fetchCart(token);
  }, [navigate]);

  const fetchCart = async (token: string) => {
    try {
      const { data } = await axios.get("/api/cart/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!data.items || data.items.length === 0) {
        navigate("/cart"); // Redirect if cart is empty
      } else {
        setItems(data.items);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      navigate("/cart");
    }
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.jersey.price * item.quantity,
    0
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Session expired. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "/api/orders/",
        { shipping_address: form.shipping_address },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Order placed successfully!");
      navigate("/store");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12">
      {/* Checkout Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Checkout</h2>

        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
            Shipping Address
          </label>
          <input
            type="text"
            name="shipping_address"
            value={form.shipping_address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
            Card Number
          </label>
          <input
            type="text"
            name="card_number"
            value={form.card_number}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            value={form.expiry}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            name="cvc"
            placeholder="CVC"
            value={form.cvc}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-semibold shadow-md hover:shadow-lg transition"
        >
          Place Order
        </button>
      </form>

      {/* Order Summary */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Order Summary
        </h3>
        <div className="space-y-2 text-gray-700 dark:text-gray-300">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.jersey.name}</span>
              <span>${(item.jersey.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold border-t pt-2">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
