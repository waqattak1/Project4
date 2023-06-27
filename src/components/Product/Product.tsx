import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Product.css";

interface Product {
  id: number;
  title: string;
  image: string;
  description: string; 
  price: number; 
}

export const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { addToCart } = useContext(CartContext); // Get addToCart function from CartContext

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (product === null) {
    return <p>Product not found</p>;
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      title: product.title,
      image: product.image,
      description: product.description,
      price: product.price,
      quantity: 1,
    });
    toast.success(`${product.title} added to cart!`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  return (
    <div className="product-detail">
      <h1 className="product-header">{product.title}</h1>
      <div className="product-image-container">
        <img className="product-image" src={product.image} alt={product.title} />
      </div>
      <p className="product-description">{product.description}</p>
      <p className="product-price">Price: {product.price}</p>
      <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>Add to Cart</button>
      <ToastContainer />
    </div>
  );
}

export default Product;
