import { Link } from "react-router-dom";
import './NavBar.css'
import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';

interface NavBarProps {
  handleLogout: () => void;
  isAuthenticated: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ handleLogout, isAuthenticated }) => {
  const { cart } = useContext(CartContext);


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
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
        {!isAuthenticated && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
