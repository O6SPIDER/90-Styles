import { createContext, useContext } from "react";

type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  size?: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeFromCart: (id: number, size?: string) => void;
  updateQuantity: (id: number, size: string | undefined, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
};

// ✅ export context separately
export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
