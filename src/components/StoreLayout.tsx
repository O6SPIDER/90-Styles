import React from "react";
import type { ReactNode } from "react";
import StoreNavbar from "../components/store/StoreNavbar";

type StoreLayoutProps = {
  children: ReactNode;
  cartCount: number;
  onCartToggle: () => void;
  onSearch: (term: string) => void;
};

const StoreLayout: React.FC<StoreLayoutProps> = ({ children, cartCount, onCartToggle, onSearch }) => {
  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Navbar that scrolls with page */}
      <StoreNavbar cartCount={cartCount} onCartToggle={onCartToggle} onSearch={onSearch} />

      {/* Main content area */}
      <main className="mt-6 px-4 md:px-8 lg:px-16">
        {children}
      </main>
    </div>
  );
};

export default StoreLayout;
