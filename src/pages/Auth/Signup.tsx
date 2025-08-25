import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthLayout from "../../components/AuthLayout";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Signup() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const username = (formData.get("username") as string)?.trim();
      const email = (formData.get("email") as string)?.trim();
      const password = formData.get("password") as string;
      const password2 = formData.get("password2") as string;
      const full_name = (formData.get("full_name") as string)?.trim();
      const phone = (formData.get("phone") as string)?.trim();
      const address = (formData.get("address") as string)?.trim();
    //const profile_picture = formData.get("profile_picture") as File;

      // Basic validation
      if (!username || !email || !password || !password2) {
        throw new Error("Please fill in all required fields");
      }
      if (password !== password2) {
        throw new Error("Passwords do not match");
      }
      interface SignupPayload {
  username: string;
  email: string;
  password: string;
  full_name?: string;
  phone?: string;
  address?: string;
}


      // Prepare payload
      const payload: SignupPayload = { username, email, password };
      if (full_name) payload.full_name = full_name;
      if (phone) payload.phone = phone;
      if (address) payload.address = address;


      const res = await fetch(`${API_URL}/api/accounts/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg =
          data.detail ||
          Object.values(data)
            .flat()
            .join(" ") ||
          "Signup failed";
        throw new Error(msg);
      }

      // Success: show email verification message
      setSuccess("Signup successful! Check your email to verify your account.");

      // Auto-redirect to login after 5 seconds
      setTimeout(() => navigate("/login"), 5000);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    } finally {
      setLoading(false);
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
          type="text"
          name="full_name"
          placeholder="Full Name (optional)"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone (optional)"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="text"
          name="address"
          placeholder="Address (optional)"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="file"
          name="profile_picture"
          accept="image/*"
          className="w-full text-gray-900 dark:text-gray-100"
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
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-yellow-400 to-pink-500 hover:shadow-lg"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Signing Up...
            </span>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>

      <div className="my-6 flex items-center gap-2">
        <span className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
        <span className="text-sm text-gray-500 dark:text-gray-400">OR</span>
        <span className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="w-full flex items-center justify-center gap-3 py-3 border rounded-lg shadow-sm bg-white dark:bg-gray-900 dark:border-gray-700 text-gray-700 dark:text-gray-200"
      >
        <FcGoogle className="text-xl" />
        Sign Up with Google
      </motion.button>

      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="text-pink-500 font-semibold hover:underline">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
