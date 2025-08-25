import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthLayout from "../../components/AuthLayout";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

// API base URL from .env
const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const form = e.target as HTMLFormElement;
      const usernameOrEmail = (form[0] as HTMLInputElement).value.trim();
      const password = (form[1] as HTMLInputElement).value;

      if (!usernameOrEmail || !password) {
        throw new Error("Please enter both username/email and password");
      }

      // Corrected URL with /api prefix
      const res = await fetch(`${API_URL}/api/accounts/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usernameOrEmail, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Use backend error message if available
        throw new Error(data.detail || "Invalid credentials");
      }

      console.log("Login success:", data);

      // Store JWT tokens and user info
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to store/dashboard
      navigate("/store");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to continue">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username or Email"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-between text-sm">
          <Link to="/forgot-password" className="text-pink-500 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-yellow-400 to-pink-500 hover:shadow-lg"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-2">
        <span className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
        <span className="text-sm text-gray-500 dark:text-gray-400">OR</span>
        <span className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
      </div>

      {/* Google Login */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="w-full flex items-center justify-center gap-3 py-3 border rounded-lg shadow-sm bg-white dark:bg-gray-900 dark:border-gray-700 text-gray-700 dark:text-gray-200"
      >
        <FcGoogle className="text-xl" />
        Continue with Google
      </motion.button>

      {/* Signup Link */}
      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-pink-500 font-semibold hover:underline">
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
}
