import { Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";

export default function ForgotPassword() {
  return (
    <AuthLayout title="Forgot Password" subtitle="Reset your account password">
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-semibold shadow-md hover:shadow-lg transition"
        >
          Send Reset Link
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Remember your password?{" "}
        <Link to="/login" className="text-pink-500 font-semibold hover:underline">
          Back to Login
        </Link>
      </p>
    </AuthLayout>
  );
}
