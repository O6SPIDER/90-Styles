import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AuthLayout from "../../components/AuthLayout";
import { FcGoogle } from "react-icons/fc";

export default function Signup() {
  return (
    <AuthLayout title="Create Account" subtitle="Join us today!">
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="email"
          placeholder="Email address"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

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
