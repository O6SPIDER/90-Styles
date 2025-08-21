import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Search, Sun, Moon } from "lucide-react";
import { useLocation } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

export type StoreNavbarProps = {
  cartCount: number;
  onCartToggle: () => void;
  onSearch: (term: string) => void;
};

const useTheme = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    try {
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(newTheme);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme);
        document.documentElement.classList.add(storedTheme);
      } else {
        document.documentElement.classList.add("light");
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return { theme, toggleTheme };
};

// Mock products for search suggestions
const mockProducts = [
  "Liverpool FC Jersey",
  "Barcelona Jersey",
  "Bayern Munich Jersey",
  "PSG Jersey",
  "Real Madrid Jersey",
  "Arsenal Jersey",
  "Manchester City Jersey",
  "AC Milan Jersey",
];

const StoreNavbar: React.FC<StoreNavbarProps> = ({
  cartCount,
  onCartToggle,
  onSearch,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isProductDetailsPage = location.pathname.startsWith("/product");

  // --- USER STATE MANAGEMENT ---
  useEffect(() => {
    // Read user info from localStorage on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // --- NAVBAR HIDE/SHOW ON SCROLL ---
  useEffect(() => {
    if (isProductDetailsPage) {
      setShowNavbar(true);
      return;
    }
    const handleScroll = () => {
      if (window.scrollY < lastScrollY.current) setShowNavbar(true);
      else setShowNavbar(false);
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isProductDetailsPage]);

  // --- CLOSE SEARCH WHEN CLICKING OUTSIDE ---
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(e.target as Node) &&
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(e.target as Node)
      ) {
        setSuggestions([]);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const filterSuggestions = (value: string) => {
    if (!value.trim()) return setSuggestions([]);
    const filtered = mockProducts
      .filter((p) => p.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 8);
    setSuggestions(filtered);
    setActiveIndex(filtered.length ? 0 : -1);
  };

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    filterSuggestions(value);
  };

  const commitSearch = (term: string) => {
    if (!term.trim()) return;
    onSearch(term);
    setSuggestions([]);
    setActiveIndex(-1);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    commitSearch(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown")
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    else if (e.key === "ArrowUp")
      setActiveIndex((i) => Math.max(i - 1, 0));
    else if (e.key === "Enter") {
      const chosen = activeIndex >= 0 ? suggestions[activeIndex] : searchTerm;
      setSearchTerm(chosen);
      commitSearch(chosen);
    } else if (e.key === "Escape") setSuggestions([]);
  };

  const SuggestionList: React.FC = () => (
    <AnimatePresence>
      {suggestions.length > 0 && (
        <motion.ul
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="absolute left-0 w-full mt-2 max-h-64 overflow-y-auto rounded-xl border shadow-lg z-50
            bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        >
          {suggestions.map((s, i) => (
            <li
              key={s + i}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setSearchTerm(s);
                commitSearch(s);
              }}
              className={`px-4 py-2 cursor-pointer text-sm ${
                i === activeIndex
                  ? "bg-pink-500 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100"
              }`}
            >
              {s}
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isProductDetailsPage ? 0 : showNavbar ? 0 : -80 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl"
      >
        <div className="flex items-center w-[92%] md:w-[85%] mx-auto mt-4 rounded-full
          bg-[#f5f5f5]/20 dark:bg-[#0f172a]/50 border border-white/20 dark:border-gray-700/50
          shadow-xl px-6 py-3 transition-colors duration-500 justify-between"
        >
          <motion.div className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent">
            90+ Styles
          </motion.div>

          {/* Desktop search */}
          {!isProductDetailsPage && (
            <div className="hidden md:flex flex-1 justify-center mx-4">
              <div ref={desktopSearchRef} className="relative w-72">
                <form onSubmit={handleSearchSubmit} className="w-full relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search products…"
                    className="w-full rounded-full py-2 pl-4 pr-10 text-sm text-gray-800 dark:text-white
                    bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-400 outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300 hover:text-pink-500"
                  >
                    <Search size={18} />
                  </button>
                </form>
                <SuggestionList />
              </div>
            </div>
          )}

          {/* Desktop icons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              whileTap={{ rotate: 180, scale: 0.9 }}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:scale-110 transition-transform duration-300"
            >
              {theme === "light" ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-100" />}
            </motion.button>

            <motion.button
              onClick={onCartToggle}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:scale-110 transition-transform duration-300"
            >
              <ShoppingCart className="h-5 w-5 text-gray-800 dark:text-gray-100" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </motion.button>

            {user ? <ProfileDropdown onLogout={handleLogout} /> : (
              <div className="flex items-center space-x-2">
                <a href="/login" className="px-4 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition">Login</a>
                <a href="/signup" className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition">Sign Up</a>
              </div>
            )}
          </div>

          {/* Mobile actions */}
          <div className="flex items-center space-x-4 md:hidden">
            <motion.button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              whileTap={{ rotate: 180, scale: 0.9 }}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:scale-110 transition-transform duration-300"
            >
              {theme === "light" ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-100" />}
            </motion.button>

            <button
              aria-label="Cart"
              onClick={onCartToggle}
              className="relative p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:scale-110 transition-transform duration-300"
            >
              <ShoppingCart className="h-5 w-5 text-gray-800 dark:text-gray-100" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 dark:text-gray-200 focus:outline-none"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      <div className="h-24 md:h-28"></div>

      {/* Mobile search */}
      {!isProductDetailsPage && (
        <div className="md:hidden mt-2 w-[85%] mx-auto relative" ref={mobileSearchRef}>
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search products…"
              className="w-full rounded-full py-2 pl-4 pr-10 text-sm text-gray-800 dark:text-white bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-400 outline-none"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300 hover:text-pink-500">
              <Search size={18} />
            </button>
          </form>
          <SuggestionList />
        </div>
      )}

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-4 rounded-2xl bg-[#f5f5f5]/90 dark:bg-[#0f172a]/90 p-6 shadow-xl backdrop-blur-lg transition-colors duration-300 w-[92%] mx-auto fixed top-24 z-50"
          >
            <div className="flex flex-col items-center space-y-4">
              {user ? <ProfileDropdown onLogout={handleLogout} /> : (
                <div className="flex flex-col w-full space-y-2">
                  <a href="/login" className="w-full text-center px-4 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition">Login</a>
                  <a href="/signup" className="w-full text-center px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition">Sign Up</a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StoreNavbar;
