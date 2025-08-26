// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/globals.css";

// Pages
import LandingPage from "./pages/Landing/LandingPage";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import StorePage from "./pages/Store/StorePage";
import ProductPage from "./pages/Store/ProductPage";
import CartPage from "./pages/Store/CartPage";
import CheckoutPage from "./pages/Store/CheckoutPage";
import ThankYouPage from "./pages/Store/ThankYouPage";

// Context
import { CartProvider } from "./context/CartContext";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <CartProvider>
        <Router>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Auth Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Store & Product */}
            <Route path="/store" element={<StorePage />} />
            <Route path="/product/:id" element={<ProductPage />} />

            {/* Cart & Checkout */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            {/* ThankYou */}
            <Route path="/thank-you" element={<ThankYouPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
};

export default App;
