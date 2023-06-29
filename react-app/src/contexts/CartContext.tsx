import React, { useState, useEffect } from "react";

export interface CartItem {
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (title: string) => void;
  clearCart: () => void; 
  totalItems: number;
  totalPrice: number;
}

export const CartContext = React.createContext<CartContextProps>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {}, 
  totalItems: 0,
  totalPrice: 0,
});

export const CartProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => JSON.parse(localStorage.getItem('cart') || "[]"));
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item) => {
      items += item.quantity;
      price += item.price * item.quantity;
    });

    setTotalItems(items);
    setTotalPrice(price);
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart(prevCart => [...prevCart, item]);
  };

  const removeFromCart = (title: string) => {
    const newCart = cart.filter((item) => item.title !== title);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice }} // added clearCart to the provided values
    >
      {children}
    </CartContext.Provider>
  );
};
