import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AuthLayout from "../../components/AuthLayout";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  return (
    <AuthLayout title="Welcome Back" subtitle="Login to continue">
      <form className="space-y-4">
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

        <div className="flex justify-between text-sm">
          <Link to="/forgot-password" className="text-pink-500 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-semibold shadow-md hover:shadow-lg transition"
        >
          Login
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
