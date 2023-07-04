import React, { useState, useEffect } from "react";
import { CartContext, CartItem, CartContextProps } from "./CartContext";

type CartProverProps = {
  children: React.ReactNode;
};

export const CartProvider = (props: CartProverProps) => {
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
    setCart((currentCart) => {
      const itemInCart = currentCart.find((i) => i.title === item.title);

      if (itemInCart) {
        return currentCart.map((i) =>
          i.title === item.title ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...currentCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (title: string) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.title !== title)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, totalItems, totalPrice, clearCart }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
