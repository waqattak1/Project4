// import React from 'react';

// export interface CartItem {
//   title: string;
//   description: string;
//   price: number;
//   image: string;
//   quantity: number;
// }

// export interface CartContextProps {
//   cart: CartItem[];
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (title: string) => void;
// }

// export const CartContext = React.createContext<CartContextProps>({
//   cart: [],
//   addToCart: () => {},
//   removeFromCart: () => {}
// });

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
  totalItems: number;
  totalPrice: number;
}

export const CartContext = React.createContext<CartContextProps>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

export const CartProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
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

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (title: string) => {
    const newCart = cart.filter((item) => item.title !== title);
    setCart(newCart);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
