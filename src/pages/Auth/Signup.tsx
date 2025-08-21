import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthLayout from "../../components/AuthLayout";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Signup() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const username = formData.get("username") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const password2 = formData.get("password2") as string;

      if (password !== password2) {
        throw new Error("Passwords do not match");
      }

      const res = await fetch(`${API_URL}/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Combine Django field-level errors into a single message
        const msg =
          data.detail ||
          Object.values(data)
            .flat()
            .join(" ") ||
          "Signup failed";
        throw new Error(msg);
      }

      console.log("Signup success:", data);

      // Optionally log in user immediately by storing token if backend returns JWT
      // localStorage.setItem("accessToken", data.access);
      // localStorage.setItem("refreshToken", data.refresh);

      // Redirect to login or dashboard
      navigate("/login");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join us today!">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="password"
          name="password2"
          placeholder="Confirm Password"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-semibold shadow-md hover:shadow-lg transition"
        >
          Sign Up
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-2">
        <span className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
        <span className="text-sm text-gray-500 dark:text-gray-400">OR</span>
        <span className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
      </div>

      {/* Google Signup */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="w-full flex items-center justify-center gap-3 py-3 border rounded-lg shadow-sm bg-white dark:bg-gray-900 dark:border-gray-700 text-gray-700 dark:text-gray-200"
      >
        <FcGoogle className="text-xl" />
        Sign Up with Google
      </motion.button>

      {/* Login Link */}
      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="text-pink-500 font-semibold hover:underline">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
