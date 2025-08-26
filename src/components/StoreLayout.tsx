// C:\Users\SPIDER\Desktop\spiderwebs\90+Styles\frontend\src\components\StoreLayout.tsx

import React, { useState, type ReactNode } from "react";
import StoreNavbar from "../components/store/StoreNavbar";
import CartPage from "../pages/Store/CartPage";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

export type StoreLayoutProps = {
  children: ReactNode;
  onSearch: (term: string) => void;
};

const StoreLayout: React.FC<StoreLayoutProps> = ({ children, onSearch }) => {
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => setShowCart((prev) => !prev);

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* ✅ No more cartCount prop here */}
      <StoreNavbar onCartToggle={toggleCart} onSearch={onSearch} />

      <main className="pt-20 md:pt-24 px-4 md:px-8 lg:px-16">{children}</main>

      <AnimatePresence>
        {showCart && (
          <motion.div
            key="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed top-0 right-0 h-full w-full lg:w-[42.857%] bg-white dark:bg-gray-900 shadow-lg z-50 overflow-auto"
          >
            <CartPage />
            <button
              onClick={toggleCart}
              className="absolute top-4 right-4 text-gray-800 dark:text-gray-100 font-bold"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoreLayout;
