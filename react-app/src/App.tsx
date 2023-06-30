import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ProductList from "./components/ProductList/ProductList";
import { Product } from "./components/Product/Product";
import LoginPage from "./components/LoginPage/LoginPage";
import NavBar from "./components/NavBar/NavBar";
import { CartProvider } from "./contexts/CartProvider";
import { Cart } from './components/Cart/Cart';
import { useState, useEffect } from 'react';
import Checkout from "./components/Checkout/Checkout";



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <CartProvider>
      <Router>
        <NavBar handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          {isAuthenticated && (
            <>
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />

            </>
          )}
          {!isAuthenticated && (
            <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
          )}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
