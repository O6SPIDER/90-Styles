// CheckoutPage.tsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import CheckoutForm from "../../components/store/CheckoutForm";

// ✅ Utility to check if token exists
function getAccessToken() {
  return localStorage.getItem("accessToken");
}

const CheckoutPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    setIsAuthenticated(!!token); // true if token exists
  }, []);

  if (isAuthenticated === null) {
    return <p>Loading...</p>; // optional loading state
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CheckoutForm />
    </div>
  );
};

export default CheckoutPage;
