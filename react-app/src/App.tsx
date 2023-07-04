// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ProductList from "./components/ProductList/ProductList";
import Product from "./components/Product/Product";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import NavBar from "./components/NavBar/NavBar";
import { CartProvider } from "./contexts/CartProvider";
import { Cart } from './components/Cart/Cart';
import Checkout from "./components/Checkout/Checkout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProtectedRoute element={<ProductList />} />} />
            <Route path="/products/:id" element={<ProtectedRoute element={<Product />} />} />
            <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
            <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
