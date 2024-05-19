// src/pages/ProductDetails.tsx
// src/pages/ProductDetails.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/css/details.css';
import '../assets/css/navbar.css';
import '../assets/css/footer.css';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate();

  const fetchProductDetails = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`, { withCredentials: true });
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const handleAddToCart = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/cart/add', {
        productId: product?.id,
        quantity,
      }, { withCredentials: true });
      alert('Producto añadido al carrito');
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        console.error('Error añadiendo al carrito:', error);
        alert('Error añadiendo al carrito');
      }
    }
  };

  if (!product) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="product-details-container">
        <div className="product-details">
          <h1>{product.name}</h1>
          <p className="description">{product.description}</p>
          <p className="price">Precio: ${product.price}</p>
          <p className="stock">Stock: {product.stock}</p>
          <form className="add-to-cart-form" onSubmit={handleAddToCart}>
            <label htmlFor="quantity">Cantidad:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              max={product.stock}
            />
            <button type="submit">Añadir al Carrito</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;







