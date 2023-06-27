import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart, totalItems, totalPrice } = useContext(CartContext);

  const handleCheckout = () => {
    clearCart();
  };

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart</h2>
      <p>Total items: {totalItems}</p>
      <p>Total price: {totalPrice.toFixed(2)} $</p>
      {cart.length === 0 && <p>Your cart is empty.</p>}
      {cart.map((product, index) => (
        <div key={index} className="cart-item">
          <img src={product.image} alt={product.title} className="product-image"/>
          <p>{product.title}</p>
          <p>${product.price}</p>
          <button onClick={() => removeFromCart(product.title)}>
            Remove from cart
          </button>
        </div>
      ))}
      {cart.length > 0 && 
        <Link to="/checkout" onClick={handleCheckout}>
          <button className="checkout-button">Checkout</button>
        </Link>
      }
    </div>
  );
}
