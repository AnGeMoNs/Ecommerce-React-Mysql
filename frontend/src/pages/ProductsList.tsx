// src/pages/ProductsList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/css/products.css';
import '../assets/css/navbar.css';
import '../assets/css/footer.css';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState<string>('default');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products', { params: { sort }, withCredentials: true });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [sort]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <h1>Productos</h1>
      <form method="GET" action="/products/">
        <label htmlFor="sort">Filtrar por: </label>
        <select name="sort" id="sort" value={sort} onChange={handleSortChange}>
          <option value="default">Precio</option>
          <option value="asc">Menor a Mayor</option>
          <option value="desc">Mayor a Menor</option>
        </select>
      </form>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <h2>{product.name}</h2>
            {product.imageUrl ? (
              <img src={`http://localhost:5000${product.imageUrl}`} alt={product.name} />
            ) : (
              <img src="http://localhost:5000/images/default.png" alt="Imagen no disponible" />
            )}
            <p>{product.description}</p>
            <p>Precio: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <Link to={`/products/${product.id}`}>Ver Detalles</Link>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default ProductsList;





