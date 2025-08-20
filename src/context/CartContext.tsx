import { useState } from "react";
import type { ReactNode } from "react";
import { CartContext } from "../hooks/useCart"; // import the context from useCart.ts

export type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  size?: string;
  quantity: number;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, "quantity">, qty: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id && p.size === item.size);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id && p.size === item.size
            ? { ...p, quantity: p.quantity + qty }
            : p
        );
      }
      return [...prev, { ...item, quantity: qty }];
    });
  };

  const removeFromCart = (id: number, size?: string) => {
    setItems((prev) => prev.filter((p) => !(p.id === id && p.size === size)));
  };

  const updateQuantity = (id: number, size: string | undefined, qty: number) => {
    if (qty < 1) return;
    setItems((prev) =>
      prev.map((p) =>
        p.id === id && p.size === size ? { ...p, quantity: qty } : p
      )
    );
  };

  const clearCart = () => setItems([]);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
