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
      className="relative min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-900"
      style={{
        backgroundImage: `url(${BgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70 dark:from-black/70 dark:via-black/60 dark:to-black/80"
        aria-hidden="true"
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md rounded-2xl bg-white/90 dark:bg-gray-800/95 shadow-2xl backdrop-blur-md p-8"
      >
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-center text-gray-600 dark:text-gray-400 mt-2 text-sm">
            {subtitle}
          </p>
        )}

        {/* Content */}
        <div className="mt-6">{children}</div>
      </motion.div>
    </section>
  );
}
