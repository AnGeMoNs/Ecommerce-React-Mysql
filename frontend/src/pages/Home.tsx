// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/css/main.css'; // Asegúrate de ajustar la ruta según sea necesario
import '../assets/css/navbar.css'; // Asegúrate de ajustar la ruta según sea necesario
import '../assets/css/footer.css'; // Asegúrate de ajustar la ruta según sea necesario

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/products/featured', { withCredentials: true });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching featured products:', error);
        }
    };

    fetchProducts();
}, []);


  return (
    <div className="home-container">
      <Navbar />
      <main className="home-main">
        <h1>Bienvenido a la tienda</h1>
        <p>Explora nuestros productos destacados.</p>
        <div className="featured-products">
          <h2>Productos Destacados</h2>
          <ul className="products-list">
            {products.map((product) => (
              <li key={product.id} className="product-item">
                <img src={`http://localhost:5000${product.imageUrl}`} alt={product.name} />
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <Link to={`/products/${product.id}`}>Ver Detalles</Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

