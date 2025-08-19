import type { ReactNode } from "react";
import { motion } from "framer-motion";
import BgImage from "../assets/BgImage.jpg";

interface AuthLayoutProps {
  readonly children: ReactNode;
  readonly title: string;
  readonly subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <section
      className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4"
      style={{
        backgroundImage: `url(${BgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50 dark:bg-black/60" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
          {title}
        </h1>
        {subtitle && (
          <p className="text-center text-gray-600 dark:text-gray-400 mt-2">{subtitle}</p>
        )}

        <div className="mt-6">{children}</div>
      </motion.div>
    </section>
  );
}
