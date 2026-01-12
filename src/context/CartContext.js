"use client";
import { createContext, useContext, useState, useCallback, useMemo } from "react";

const CartContext = createContext({
  cart: [],
  cartCount: 0,
  cartTotal: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  emptyCart: () => {},
  getItemQuantity: () => 0,
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to cart (or increment quantity if exists)
  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  // Remove item from cart (or decrement quantity if > 1)
  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => {
      return prevCart.reduce((acc, item) => {
        if (item.id === productId) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
          // If quantity is 1, item is removed (not pushed to acc)
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    });
  }, []);

  // Update item quantity directly
  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  // Clear the entire cart
  const emptyCart = useCallback(() => {
    setCart([]);
  }, []);

  // Get quantity of a specific item
  const getItemQuantity = useCallback(
    (productId) => {
      const item = cart.find((item) => item.id === productId);
      return item?.quantity || 0;
    },
    [cart]
  );

  // Memoized computed values
  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.cost * item.quantity, 0);
  }, [cart]);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      cart,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      emptyCart,
      getItemQuantity,
    }),
    [cart, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity, emptyCart, getItemQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
