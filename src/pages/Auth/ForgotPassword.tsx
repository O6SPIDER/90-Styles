import { Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!email) {
        throw new Error("Please enter your email address");
      }

      const res = await fetch(`${API_URL}/api/accounts/password/reset/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg =
          data.detail ||
          Object.values(data)
            .flat()
            .join(" ") ||
          "Failed to send reset link";
        throw new Error(msg);
      }

      setSuccess(
        "If this email exists in our system, a password reset link has been sent."
      );
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Forgot Password" subtitle="Reset your account password">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Remember your password?{" "}
        <Link
          to="/login"
          className="text-pink-500 font-semibold hover:underline"
        >
          Back to Login
        </Link>
      </p>
    </AuthLayout>
  );
}
