import { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { CartContext, CartItem } from '../../contexts/CartContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductList.css";

interface Product {
  id: number; 
  title: string;
  image: string;
  description: string;
  price: number;
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const { addToCart } = useContext(CartContext); 

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
    <div>
      <p className='loading'>Loading...</p>
      <img src='../../assets/smiley_face.png' className="smileyface"/>
    </div>
    )
  }

  const handleAddToCart = (product: Product) => {
    setAddingToCart(product.id);
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
    setTimeout(() => setAddingToCart(null), 2000); 
  };


  const productElements = products.map((product) => (
    <div key={product.id} className={`product-item ${product.id === addingToCart ? 'spinning' : ''}`}>
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.title} className="product-image" />
        <p>{product.title}</p>
      </Link>
      <p>$ {product.price}</p>
      <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
    </div>
  ));

  return (
    <div className="product-list-container">
      {productElements}
      <ToastContainer />
    </div>
  );
}

export default ProductList;
