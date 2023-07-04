// NavBar.tsx
import { Link } from "react-router-dom";
import './NavBar.css'
import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

const NavBar: React.FC = () => {
  const { cart } = useContext(CartContext);
  const { isAuthenticated, logout } = useAuth();

  const totalItems = cart.reduce((total, product) => total + product.quantity, 0);

  return (
    <nav className = "navbar">
      <ul className="navbar-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAuthenticated && (
          <>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/cart">Cart ({totalItems}) </Link>
            </li>
            <li className="logout">
              <button onClick={logout}>Logout</button>
            </li>
          </>
        )}
        {!isAuthenticated && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link> 
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
